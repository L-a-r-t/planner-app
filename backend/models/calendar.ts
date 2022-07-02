import mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    dates: Array
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
    }
})

const Calendar = mongoose.model('Calendar', calendarSchema);
export default Calendar;