import mongoose = require('mongoose')

const calendarID = new mongoose.Schema({
    id: {
        type: mongoose.Types.ObjectId,
        ref: "Calendar"
    }
})

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        index: true,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please fill a valid email address']
    },
    verified: Boolean,
    calendars: [calendarID]
})

const User = mongoose.model('CalendarUser', userSchema)
export default User