const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    isAdmin: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
schema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model('User', schema);