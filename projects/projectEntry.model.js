const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ProjId: { type: String, required: true},
    PileNo:{ type: String, default: "ProjectDec", unique:true},
    description:{ type: String, required: true},
    nameOfCompany:{ type: String, required: true},
    pilingRigDetails:{ type: String, required: true},
    casingToplevel:{type: SchemaTypes.Double, default: 0},
    existingToplevel:{type: SchemaTypes.Double, default: 0},
    pillingCutOfflevel:{type: SchemaTypes.Double, default: 0},
    cagelengthrequired:{type: SchemaTypes.Double, default: 0},
    boringStartTime: {  type: Date, default: Date.now },
    cageloweringStartTime: {  type: Date, default: Date.now },
    cageloweringEndTime: {  type: Date, default: Date.now },
    noOfTrimePiecesRequired:{type:Number},
    noOfTrimePiecesUsed:{type:Number},
    nameOfSiteEngg:{ type: String, default: "Details" },
    siteEnggId:{ type: String, default: "Details" },
    createDate:{ type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectEntry', schema);