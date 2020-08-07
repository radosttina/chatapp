const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
        default: 'Anonymous',
        maxlength: 64
    },
    msg: {
        type: String,
        required: true,
        maxlength: 140
    },
    room: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('Message', MessageSchema);