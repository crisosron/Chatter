const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const individualMessageSchema = new Schema({
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },

    sender: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },

    receiver: {
        type: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }

}, {timestamps: true}); // Need timestamps for sorting purposes

const IndividualMessage = mongoose.model("IndividualMessage", individualMessageSchema);
module.exports = {IndividualMessage, individualMessageSchema};

