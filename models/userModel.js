const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 30,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        min: 1,
        max: 120,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

let Users = mongoose.model("user", userSchema)

module.exports = Users;