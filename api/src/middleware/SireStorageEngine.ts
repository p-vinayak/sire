import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import mime from 'mime';
import {StorageEngine} from 'multer';
import {ParsedQs} from 'qs';
import {v4} from 'uuid';
import {join} from 'path';
import {createWriteStream, existsSync, mkdirSync, unlink} from 'fs';
import BadRequestError from '../errors/BadRequestError';
import {canUpload} from '../services/upload.service';
import {RequestUser} from '../routers/user.router';

// Generates a random filename using UUID and file mimetype or extension if mimetype can't be parsed
export const generateFileName = (req: Request, file: Express.Multer.File) => {
  // Calculate file extension. Get original extension if extension can't be calculated.
  const ext =
    mime.extension(file.mimetype) || file.originalname.split('.').pop();
  // Generate random file name
  const id = v4();
  // Create file name and return
  const filename = `${id}.${ext}`;
  return {id, filename};
};

export interface FileInfo extends Partial<Express.Multer.File> {
  relativePath: string;
  id: string;
}

export interface SireStorageEngineOptions {
  baseUploadPath: string;
}

class SireStorageEngine implements StorageEngine {
  private baseUploadPath: string;

  constructor(options: SireStorageEngineOptions) {
    this.baseUploadPath = options.baseUploadPath;
  }

  async _handleFile(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    file: Express.Multer.File,
    callback: (error?: any, info?: FileInfo) => void,
  ) {
    // Get user from request
    const user = req.user as RequestUser;
    // Get size of uploaded file
    const uploadSize = req.headers['content-length'];
    // If size header is not included then return an error
    if (uploadSize === undefined)
      return callback(
        new BadRequestError('Content-Length header must be included'),
      );
    // If upload size exceeds allocated storage limit for user, then return an error
    if (!(await canUpload(user.id, BigInt(uploadSize))))
      return callback(new BadRequestError('Upload size exceeds storage limit'));
    // Generate file name and upload destination for file
    const {id, filename} = generateFileName(req, file);
    const destination = join(this.baseUploadPath, user.username);
    // If upload destination doesn't exist, create it
    if (!existsSync(destination)) mkdirSync(destination);
    const relativePath = join(user.username, filename);
    const path = join(this.baseUploadPath, relativePath);
    // Write file to destination
    const outStream = createWriteStream(path);
    file.stream.pipe(outStream);
    // Handle any errors
    outStream.on('error', callback);
    // Return file info on successful save
    outStream.on('finish', () => {
      return callback(null, {
        id,
        destination,
        filename,
        path,
        size: outStream.bytesWritten,
        relativePath,
      });
    });
  }

  // Deletes files if there are any errors
  _removeFile(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    file: Express.Multer.File,
    callback: (error: Error | null) => void,
  ): void {
    const path = file.path;
    unlink(path, callback); // Deletes file
    // TODO: remove from db here
  }
}

export default (opts: SireStorageEngineOptions) => {
  return new SireStorageEngine(opts);
};
