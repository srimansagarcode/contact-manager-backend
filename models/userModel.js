const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add username"]
    },
    email: {
        type: String,
        required: [true, "Please add Email"],
        unique: [true, "Eamil address already taken"]
    },
    password: {
        type: String,
        required: [true, "Pleae add password"]
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('User', userSchema)