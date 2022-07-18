import { RequestHandler, Request, Response, NextFunction } from "express"
import mongoose, { isValidObjectId } from "mongoose";
import Calendar from '../models/calendar'
import User from "../models/dispoUser";
import checkUserCalendar from "../utils/checkUserCalendar";

export const create: RequestHandler = (async (req: Request, res: Response) => {
    try {
        const {name, description, email, isPublic} = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error()
        }
        const newCalendar = await Calendar.create({
            name,
            description,
            lastViewed: new Date(),
            owner: user?._id,
            access: [{email: user?.email}],
            public: isPublic
        })
        if (user.calendars) {
            user.calendars.push(newCalendar._id)
            await user.save()
        }
        res.json({redirect: './calendar/' + newCalendar._id})    
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
})

export const get: RequestHandler = (async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {email} = req.body;
        if (!isValidObjectId(id)) {
            res.status(404).send('not found')
            return
        }
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            res.status(404).send('not found')
            return
        }
        const match = await checkUserCalendar(calendar, email);
        if (!match[0]) {
            res.status(401).send('unauthorized')
            return
        }
        calendar.lastViewed = new Date();
        await calendar.save();
        res.json({
            name: calendar.name,
            description: calendar.description,
            agendas: calendar.agendas,
            access: calendar.access,
            owner: match[1]
        });
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
})

export const getPublic: RequestHandler = (async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        if (!isValidObjectId(id)) {
            res.status(404).send('not found')
            return
        }
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            res.status(404).send('not found')
            return
        }
        if (!calendar.public) {
            res.status(401).send('unauthorized')
            return
        }
        calendar.lastViewed = new Date()
        await calendar.save()
        res.json({
            name: calendar.name,
            description: calendar.description,
            agendas: calendar.agendas,
            access: calendar.access,
            owner: false
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
})

export const update: RequestHandler = (async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {index, agenda} = req.body;
        const calendar = await Calendar.findById(id);
        if (!calendar) throw new Error('not found')
        if (!calendar.agendas) throw new Error('agendas array is empty')
        calendar.agendas[Number(index)] = agenda;
        await calendar.save();
        res.send('success')
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }    
})

export const add: RequestHandler = (async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {agenda} = req.body;
        const calendar = await Calendar.findById(id);
        if (!calendar) throw new Error('not found');
        if (!calendar.agendas) {
            calendar.agendas = [agenda]
        } else {
            calendar.agendas.push(agenda)
        }
        await calendar.save()
        res.send('success')
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }
})

export const deleteRow: RequestHandler = (async (req: Request, res: Response) => {
    try {
        const {id, index} = req.params;
        const calendar = await Calendar.findById(id);
        if (!calendar) throw new Error('not found')
        if (!calendar.agendas) throw new Error('agendas array is empty')
        calendar.agendas = [...calendar.agendas.slice(0, Number(index)), ...calendar.agendas.slice(Number(index + 1))]
        await calendar.save();
        res.send('success')
    }
    catch (err) {
        console.error(err)
        res.status(500).json({error: err})
    }    
})