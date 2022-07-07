import mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please fill a valid email address']
    },
    verified: Boolean,
    calendars: [{
        type: mongoose.Types.ObjectId,
        ref: "Calendar"
    }]
})

const User = mongoose.model('CalendarUser', userSchema)
export default User