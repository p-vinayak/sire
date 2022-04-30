import {NextFunction, Request, Response, Router} from 'express';
import validateBody from '../middleware/validateBody';
import CreateUserSchema from '../schema/CreateUserSchema';
import isAuthenticated from '../middleware/isAuthenticated';
import BadRequestError from '../errors/BadRequestError';
import * as UserService from '../services/user.service';
import * as AuthService from '../services/auth.service';

export interface RequestUser {
  id: string;
  username: string;
  email: string;
  storageUsed: number;
  storageAllocated: number;
}

const userRouter = Router();

userRouter.post(
  '/',
  validateBody(CreateUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password, passwordConfirm} = req.body;
    try {
      // Validate password and passwordConfirm
      if (password != passwordConfirm)
        throw new BadRequestError('Passwords did not match');
      // Check if user with email already exists
      if (await UserService.findByEmail(email))
        throw new BadRequestError('Email already registered');
      // Check if user with username already exists
      if (await UserService.findByUsername(username))
        throw new BadRequestError('Username already registered');
      // Create new user
      const user = await UserService.createUser(
        username,
        email,
        await AuthService.hashPassword(password),
      );
      res.send({user});
    } catch (err) {
      // Pass any errors to error hanlder
      if (err) next(err);
    }
  },
);

// Gets information about the current user
userRouter.get('/me', isAuthenticated, async (req: Request, res: Response) => {
  res.send(req.user);
});

export default userRouter;
