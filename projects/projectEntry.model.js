const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const schema = new Schema({
    projId: { type: String, required: true},
    pileNo:{ type: String, default: "ProjectDec", unique:true},
    description:{ type: String, required: true},
    nameOfCompany:{ type: String, required: true},
    pilingRigDetails:{ type: String, required: true},
    casingToplevel:{type: SchemaTypes.Double, default: 0},
    existingToplevel:{type: SchemaTypes.Double, default: 0},
    pillingCutOfflevel:{type: SchemaTypes.Double, default: 0},
    cagelengthrequired:{type: SchemaTypes.Double, default: 0},
    boringStartTime: {  type: String},
    cageloweringStartTime: {  type: String},
    cageloweringEndTime: {  type: String},
    noOfTrimePiecesRequired:{type:Number},
    noOfTrimePiecesUsed:{type:Number},
    nameOfSiteEngg:{ type: String, default: "Details" },
    siteEnggId:{ type: String, default: "Details" },
    createDate:{ type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectEntry', schema);