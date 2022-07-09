import mongoose = require('mongoose')

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
    calendars: [{type: 'ObjectId'}]
})

const User = mongoose.model('CalendarUser', userSchema)
export default User