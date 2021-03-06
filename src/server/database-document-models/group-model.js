const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupName: {
        unique: true,
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },

    members: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        default: undefined // This is needed since an empty array will count as an existing group
    },

    description: {
        type: String,
        required: false,
        maxlength: 200
    },

    joinCode: {
        type: String,
        required: true,
        unique: true
    }

}, {timestamps: true});

const Group = mongoose.model('Group', groupSchema);

module.exports = {Group, groupSchema};