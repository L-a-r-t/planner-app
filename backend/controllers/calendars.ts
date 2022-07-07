import { RequestHandler, Request, Response, NextFunction } from "express"
import { isValidObjectId } from "mongoose";
import Calendar from '../models/calendar'
import User from "../models/dispoUser";

export const create: RequestHandler = (async (req: Request, res: Response) => {
    try {
        const {name, description, userid} = req.body;
        const user = await User.findOne({ userid })
        const newCalendar = await Calendar.create({
            name,
            description,
            lastViewed: new Date(),
            owner: user?._id,
            allowed: [user?.email]
        })
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
        if (!isValidObjectId(id)) {
            res.status(404).send('not found')
            return
        }
        const calendar = await Calendar.findById(id);
        if (!calendar) {
            res.status(404).send('not found')
            return
        }
        calendar.lastViewed = new Date();
        await calendar.save();
        res.json(calendar);
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