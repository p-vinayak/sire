import {NextFunction, Request, Response, Router} from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import * as FilesService from '../services/files.service';
import UnauthorizedError from '../errors/UnauthorizedError';
import {join} from 'path';
import {existsSync, unlinkSync} from 'fs';
import {RequestUser} from './user.router';

const filesRouter = Router();

filesRouter.delete(
  '/:fileId',
  [isAuthenticated], // User must be authenticated to delete files
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as RequestUser;
    const fileId = req.params.fileId;
    try {
      // Get file
      const file = await FilesService.findFileByID(fileId);
      // Return OK if file doesn't exist
      if (!file) {
        res.send({message: 'OK'});
        return;
      }
      // User cannot delete someone else's file
      if (file.owner != user.id)
        throw new UnauthorizedError('You cannot perform this action');
      // Find file on disk
      const filePath = join(process.env.UPLOAD_PATH as string, file.path);
      // Delete file from db if it doesn't exist on disk
      if (!existsSync(filePath)) {
        await FilesService.removeFileByID(file.id);
        res.send({message: 'OK'});
        return;
      }
      // Delete file from disk and DB, return OK
      unlinkSync(filePath);
      await FilesService.removeFileByID(file.id);
      res.send({message: 'OK'});
      return;
    } catch (err) {
      // Pass any errors to error handler
      if (err) next(err);
    }
  },
);

filesRouter.get(
  '/',
  [isAuthenticated], // User must be authenticated to fetch their files
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as RequestUser;
    try {
      // Find all files owned by this user
      res.send(await FilesService.findAllFiles(user.id));
    } catch (err) {
      if (err) next(err);
    }
  },
);

export default filesRouter;
