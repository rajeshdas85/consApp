const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    firstNmae: { type: String, default: "ProjectDec" },
    LastName: { type: String, default: "projManagerId" },
    contactNo: { type: String, required: true },
    emailID: {type: SchemaTypes.Double, default: 0},
    photo:{ type: Date, default: Date.now },
    idProof:{ type: String, default:"Adarcard" } , 
    createDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectManager', schema);