const mongoose = require("mongoose");
const userSchema = require("./user-model");
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    members: {
        type: [userSchema],
        default: undefined // This is needed since an empty array will count as an existing group
    }
});

module.exports = groupSchema;