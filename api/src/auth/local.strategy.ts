import passportLocal from 'passport-local';
import UnauthorizedError from '../errors/UnauthorizedError';
import prisma from '../database/client';
import {comparePasswords} from '../services/auth.service';

const LocalStrategy = passportLocal.Strategy;

// Handles user login authentication
const localAuthStrategy = new LocalStrategy(
  {usernameField: 'email', passwordField: 'password'},
  async (email, password, done) => {
    // Find user by email
    const user = await prisma.user.findFirst({
      where: {email},
    });
    // If user with email doesn't exist or password is incorrect, return error
    if (!user || !(await comparePasswords(password, user.password)))
      return done(new UnauthorizedError('Incorrect email or password'), false);
    // Return user on valid credentials
    return done(null, user);
  },
);

export default localAuthStrategy;
