const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    // projectId: { type: String },
    // projectName: { type: string },
    // empId: { type: String },
    // empName: { type: String },
    // isPM: { type: Boolean, default: false },
    // isSiteEngg: { type: Boolean, default: false },
    // createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectUserMapping', schema);