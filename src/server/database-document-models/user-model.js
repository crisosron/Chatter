const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Schemas allows us to define what a correct document should adhere to
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        unique: true,
        required: true,
        type: String,
        trim: true,
        minlength: 2,
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

    groups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Group'}],

    friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],

    pendingFriendRequests: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    
}, {timestamps: true});

userSchema.methods.generateHash = function(password){
    // Has to be synchronous since the password hash has to be generated before the user is saved to the database
    // see user-model.js ~lines 70-80
    // TODO: Investigate how to make this async - developer says async is recommended since hashAsync uses multithreading
    // whch is better for performance for the large scale (currently, using hashAsync results in UnhandledPromiseRejectionWarning)
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = {User, userSchema};