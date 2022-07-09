import User from "../models/dispoUser";
import mongoose = require('mongoose');

type Calendar = mongoose.Document<unknown, any, {
    public: boolean;
    name: string;
    owner: unknown;
    lastViewed: Date;
    access?: unknown[] | undefined;
    description?: string | undefined;
    agendas?: unknown[] | undefined;
}> & {
    public: boolean;
    name: string;
    owner: unknown;
    lastViewed: Date;
    access?: unknown[] | undefined;
    description?: string | undefined;
    agendas?: unknown[] | undefined;
    _id: any
}

type match = [boolean, boolean]

const checkUserCalendar = async (calendar: Calendar, email: string): Promise<match> => {
    if (!calendar.public) {
        if (!calendar.access?.some(elem => {
                const parsed = elem as any
                return parsed.email === email
            })) {
            return [false, false]
        }
    } 
    const user = await User.findOne({ email })
    if (!user?.calendars?.some((elem: unknown) => {
        const parsed = elem as any
        return parsed._id.toString() === calendar._id.toString()
    })) {
        if (user && user.calendars) {
            user.calendars.push(calendar._id);
            await user?.save()
        }
    }
    const owner = calendar.owner as any
    const isOwner = owner.toString() === user?._id.toString();
    return [true, isOwner]
}

export default checkUserCalendar