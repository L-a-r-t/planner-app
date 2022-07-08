import { Request, Response, NextFunction } from 'express';

export const enableCORS = (req: Request, res:Response, next:NextFunction) => {
    if (!process.env.DISABLE_XORIGIN) {
        const allowedOrigins = ["http://localhost:3000", "https://dispo-planner.herokuapp.com/"];
        const origin = req.headers.origin ?? '';
        if (!process.env.XORIGIN_RESTRICT || allowedOrigins.indexOf(origin) > -1) {
            res.set({
                "Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept, Authorization",
            });
        }
    }
    next();
};