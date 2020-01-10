const mongoose = require("mongoose");

// Schemas allows us to define what a correct document should adhere to
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        unique: true,
        required: true,
        type: String,
        trim: true,
        minlength: 2
    },

    password: {
        required: true,
        maxLength: 20,
        minLength: 5,
        type: String
    },

    email:{
        required: true,
        unique: true,
        type: String
    },

    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;