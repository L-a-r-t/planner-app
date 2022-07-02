import express = require('express');
import { Request, Response, NextFunction } from 'express';
const app = express();
import bodyParser = require('body-parser');
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/.env' });

// mongoose
import mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI
if (!mongoURI) throw new Error("can't find MONGO_URI .env variable")
mongoose.connect(mongoURI,
() => console.log("connected to MongoDB"))
 
// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// cors, this is from a freecodecamp boilerplate
const enableCORS = (req: Request, res:Response, next:NextFunction) => {
    if (!process.env.DISABLE_XORIGIN) {
        const allowedOrigins = ["http://localhost:3000"];
        const origin = req.headers.origin ?? '';
        if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            res.set({
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
            });
        }
    }
    next();
};
app.use(enableCORS);

// routing
import routes from './routes';
app.use('/api/calendar', routes.calendars)

export default app; 