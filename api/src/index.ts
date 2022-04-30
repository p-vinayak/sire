import {config} from 'dotenv';
import SireService from './common/SireService';

config(); // Load environment variables
const port = Number(process.env.PORT); // Get PORT on which the service is to run
const sire = new SireService(port); // Create service
sire.start(); // Start service
