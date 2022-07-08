import { RequestHandler, Request, Response, NextFunction } from "express"
import User from '../models/dispoUser'

export const login: RequestHandler = async (req: Request, res: Response) => {
    try {
        const {email,verified} = req.body
        await User.findOneAndUpdate({email}, {
            email: email, 
            verified}, {upsert: true})
        res.send('success')
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
}