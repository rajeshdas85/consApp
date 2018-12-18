const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    projDesc: { type: String, default: "ProjectDec" },
    projManagerId: { type: String, default: "projManagerId" },
    projName: { type: String, required: true },
    projStartDate: { type: Date, default: Date.now },
    pillingInfoByProjectID: mongoose.Schema.Types.Mixed,
    otherInfoByProjectID: mongoose.Schema.Types.Mixed,
    createDate: { type: Date, default: Date.now },
    updateDate: { type: String, default:"Null" }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Project', schema);