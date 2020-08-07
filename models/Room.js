const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 64
    },
    activeUsers: [{type: String}]
})

module.exports = mongoose.model('Room', RoomSchema);