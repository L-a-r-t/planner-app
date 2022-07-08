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

const checkUserCalendar = async (calendar: Calendar, email: string) => {
    if (!calendar.public) {
        if (!calendar.access?.some(elem => {
                const parsed = elem as any
                return parsed.email === email
            })) {
            return false
        }
        const user = await User.findOne({ email })
        if (!user?.calendars?.some(elem => {
            const parsed = elem as any
            return parsed._id.toString() === calendar._id.toString()
        })) {
            if (user && user.calendars) {
                user.calendars.push(calendar._id);
                await user?.save()
            }
        }
    }
    return true
}

export default checkUserCalendar