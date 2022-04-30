import {NextFunction, Request, Response, Router} from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import multer from 'multer';
import SireStorageEngine from '../middleware/SireStorageEngine';
import validateFile from '../middleware/validateFile';
import validateBody from '../middleware/validateBody';
import UploadBodySchema from '../schema/UploadBodySchema';
import * as UploadService from '../services/upload.service';
import BadRequestError from '../errors/BadRequestError';
import {RequestUser} from './user.router';

const sizeLimit = 262144000;
const uploadRouter = Router();
const baseUploadPath = process.env.UPLOAD_PATH as string;
const storage = SireStorageEngine({baseUploadPath});
const upload = multer({
  limits: {fileSize: sizeLimit},
  storage,
});

uploadRouter.post(
  '/',
  [
    isAuthenticated, // User must be authenticated to upload files
    upload.single('file'), // This route only takes 1 file upload, with the fieldname as 'file'
    validateFile('file'), // Check whether the 'file' field does indeed contain a file
    validateBody(UploadBodySchema), // Validate other fields of the request body (such as title)
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    // Get user and file
    const user = req.user as RequestUser;
    const file = req.file;
    try {
      if (file)
        // Save file info to db if file was successfully uploaded to disk
        res.send(
          await UploadService.save(
            file as Express.Multer.File & {relativePath: string; id: string},
            user.id,
            req.body.title,
          ),
        );
      else throw new BadRequestError('File Not Found'); // Return error if no file was uploaded
    } catch (err) {
      if (err) next(err);
    }
  },
);

export default uploadRouter;
