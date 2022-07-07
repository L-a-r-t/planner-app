import express = require('express');
const app = express();
import bodyParser = require('body-parser');
import helmet from 'helmet';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });
import { enableCORS } from './middleware';

// mongoose
import mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI
if (!mongoURI) throw new Error("can't find MONGO_URI .env variable")
mongoose.connect(mongoURI,
() => console.log("connected to MongoDB"))
 
// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(enableCORS);

// routing
import routes from './routes';
app.use('/api/calendar', routes.calendars)
app.use('/api/user', routes.users)

export default app; 