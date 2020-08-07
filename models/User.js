const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 64
    }
})

module.exports = mongoose.model('User', UserSchema);