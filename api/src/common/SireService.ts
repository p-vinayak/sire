import express, {Express} from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import {createClient, RedisClient} from 'redis';
import passport from 'passport';
import localAuthStrategy from '../auth/local.strategy';
import prisma from '../database/client';
import {user} from '@prisma/client';
import userRouter from '../routers/user.router';
import authRouter from '../routers/auth.router';
import errorHandler from '../middleware/errorHandler';
import {Server} from 'http';
import uploadRouter from '../routers/upload.router';
import filesRouter from '../routers/files.router';
import {getStorageUsed} from '../services/upload.service';
import cors from 'cors';

const RedisStore = connectRedis(session); // For session storage

export default class SireService {
  public app: Express;
  private port: number;
  private redisClient: RedisClient | undefined;
  private server: Server | undefined;
  private baseURL: string;

  constructor(port: number) {
    this.port = port;
    this.baseURL = (process.env.BASE_URL as string) || '';
    this.app = express(); // Create express app
    this.app.set('trust proxy', true); // Allows express to run behind reverse proxies like NGINX
    this.addPlugins(); // Plugins needed for REST functionality
    this.addSessions(); // Adds storage for sessions
    this.addPassport(); // Handles user authentication
    this.addRoutes(); // Adds API routes
    this.addErrorHandler(); // Handles API errors
  }

  private addPlugins() {
    this.app.use(express.json()); // Used for parsing JSON body
    this.app.use(express.urlencoded({extended: true}));
    this.app.use(cookieParser()); // Used for parsing cookies
    this.app.use(cors({origin: process.env.CLIENT_URL, credentials: true})); // CORS to ensure security
  }

  private addSessions() {
    this.redisClient = createClient({
      host: process.env.REDIS_HOST as string,
      port: Number(process.env.REDIS_PORT as string),
    }); // Create session storage client
    // Add session storage client to application
    this.app.use(
      session({
        store: new RedisStore({client: this.redisClient}),
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false, maxAge: 86400000},
      }),
    );
  }

  private addPassport() {
    // Dictates how a user is stored inside redis session storage
    passport.serializeUser((user, done) => {
      done(null, (user as user).id);
    });
    // Dictates how a user is retrieved from redis session storage
    passport.deserializeUser(async (id, done) => {
      // Find user by id
      const user = await prisma.user.findFirst({
        where: {id: id as string},
        select: {id: true, email: true, username: true, password: false},
      });
      // If user is not found in DB return error
      if (!user) return done('No user to deserialize');
      const storageUsed = String(await getStorageUsed(user.id)); // Calculate total storage used by user
      const storageAllocated = String(1073741824); // Convert allocated storage to string to prevent errors over HTTP
      // This data is returned on every authenticated request
      const response = {...user, storageUsed, storageAllocated};
      return done(null, response);
    });
    // Use email and password authentication strategy
    passport.use(localAuthStrategy);
    // Add passport to express app
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private addRoutes() {
    this.app.use(this.baseURL + '/users', userRouter); // Users route for user creation
    this.app.use(this.baseURL + '/auth', authRouter); // Handles login and logout
    this.app.use(this.baseURL + '/upload', uploadRouter); // Handles file upload
    this.app.use(this.baseURL + '/files', filesRouter); // Handles file fetching and deletion
  }

  private addErrorHandler() {
    this.app.use(errorHandler); // Handles API errors and displays them nicely to the user
  }

  public async start() {
    this.server = this.app.listen(this.port); // Start application with specified port
  }

  public async stop() {
    if (this.server) this.server.close(); // Stop server
    if (this.redisClient) this.redisClient.quit(); // Close session storage connection
    prisma.$disconnect(); // Close DB connection
  }
}
