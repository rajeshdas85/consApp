const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const schema = new Schema({
    firstName: { type: String, default: "ProjectDec" },
    lastName: { type: String, default: "projManagerId" },
    //contactNo: { type: String, required: true },
    email: {type:String, required: true },
    password:{type:String, required: true },
    photo:{type:String, required: true },
    idProof:{ type: String, default:"Adarcard" } , 
    createDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectManager', schema);