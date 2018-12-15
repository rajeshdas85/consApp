const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ProjId: { type: String, required: true},
    PileNo:{ type: String, default: "ProjectDec", unique:true},
    projMgrDateOfStartDate:{  type: Date, default: Date.now },
    PillingRigDetails:{ type: String, default: "Details" },
    DiaOfPile:{type:Number},
    casingToplevel:{type: SchemaTypes.Double, default: 0},
    existingToplevel:{type: SchemaTypes.Double, default: 0},
    pillingCutOfflevel:{type: SchemaTypes.Double, default: 0},
    foundinglevel:{type: SchemaTypes.Double, default: 0},
    emptyBoreDepth:{type: SchemaTypes.Double, default: 0},
    beforeDepthFromCTL:{type: SchemaTypes.Double, default: 0},
    beforeDepthFromEGL:{type: SchemaTypes.Double, default: 0},
    BeforeDepthFromCOL:{type: SchemaTypes.Double, default: 0},
    concreteQtyTheorotical:{type: SchemaTypes.Double, default: 0},
    concreteQtyTActual:{type: SchemaTypes.Double, default: 0},
    cagelengthrequired:{type: SchemaTypes.Double, default: 0},
    boringStartTime: {  type: Date, default: Date.now },
    boringEndTime: {  type: Date, default: Date.now },
    totalBoringTime: {  type: Date, default: Date.now },
    nameOfSiteEngg:{ type: String, default: "Details" },
    siteEnggId:{ type: String, default: "Details" },
    createDate:{ type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectHistory', schema);