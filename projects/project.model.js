const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    projName: { type: String, required: true },
    projDesc:{ type: String, default: "ProjectDec" },
    projManagerId:{ type: String, default: "projManagerId" },
    projStartDate:{ type: Date, default: Date.now },
    pillingInfoByProjectID: mongoose.Schema.Types.Mixed,
    otherInfoByProjectID : mongoose.Schema.Types.Mixed,
    createDate:{ type: Date, default: Date.now },
    updateDate:{ type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Project', schema);