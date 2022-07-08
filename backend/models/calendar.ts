import mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    dates: Array
})

const lightEmailSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please fill a valid email address']
    }
})

const calendarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    agendas: [agendaSchema],
    lastViewed: {
        type: Date,
        required: true,
    },
    public: {
        type: Boolean,
        required: true,
    },
    access: [lightEmailSchema],
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "CalendarUser"
    }
})

const Calendar = mongoose.model('Calendar', calendarSchema);
export default Calendar;