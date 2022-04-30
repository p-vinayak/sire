import {Request, Response, Router} from 'express';
import passport from 'passport';
import validateBody from '../middleware/validateBody';
import UserLoginSchema from '../schema/UserLoginSchema';
import isAuthenticated from '../middleware/isAuthenticated';

const authRouter = Router();

authRouter.post(
  '/login',
  [validateBody(UserLoginSchema), passport.authenticate('local')], // Middleware to handle credential validation
  async (req: Request, res: Response) => {
    res.send({message: 'Successfully logged in!'});
  },
);
authRouter.post(
  '/logout',
  isAuthenticated, // Middleware to check whether user is logged in
  async (req: Request, res: Response) => {
    req.logOut();
    res.send({message: 'Successfully logged out!'});
  },
);

export default authRouter;
