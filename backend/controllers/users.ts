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

export const getCalendars: RequestHandler = async (req: Request, res: Response) => {
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if (!user) {
            console.log(`user with email '${email}' was not found.`)
            res.status(404).send('not found')
            return
        }
        const populated = await user.populate({
            path: 'calendars',
            model: 'Calendar'
        })
        const calendars = populated.calendars?.map(elem => {
            const calendar = elem as Calendar
            const owner = calendar.owner as any
            const isOwner = owner.toString() === user._id.toString()
            return {
                id: calendar._id,
                name: calendar.name,
                description: calendar.description,
                public: calendar.public,
                owner: isOwner
            }
        })
        res.json(calendars)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
}

interface Calendar {
    _id: string
    name: string
    description: string
    public: boolean
    access: string[]
    owner: unknown
}