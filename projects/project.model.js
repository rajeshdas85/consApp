const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;

const schema = new Schema({
    projDesc: { type: String, default: "ProjectDec" },
    projManagerId: { type: String, default: "projManagerId" },

    projName: { type: String, required: true },
    projval: {type: SchemaTypes.Double, default: 0},
    commenceDate:{ type: Date, default: Date.now },
    completionDate:{ type: Date, default: Date.now },
    client: { type: String, default: "RKEC" },
    location:{ type: String, default: "Vizag" },
    
    projStartDate: { type: Date, default: Date.now },
    pillingInfoByProjectID: mongoose.Schema.Types.Mixed,
    otherInfoByProjectID: mongoose.Schema.Types.Mixed,
    
    createDate: { type: Date, default: Date.now },
    updateDate: { type: String, default:"Null" }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Project', schema);