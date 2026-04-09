const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username is alreadu taken"],
        required: true,
    },
    email: {
        type: String,
        unique: [true, " another account is already exists with this email address"],
    },
    password: {
        type: String,
        required: true,
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel