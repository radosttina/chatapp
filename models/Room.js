const mongoose = require('mongoose');
const User = require('./User');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 64
    },
    activeUsers: [User.schema]
})

module.exports = mongoose.model('Room', RoomSchema);