const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const schema = new Schema({
    projId: { type: String, required: true },
    pileNo: { type: String, default: "ProjectDec", unique: true },
    description: { type: String, default: "Details" },
    nameOfCompany: { type: String, default: "RKEC" },
    pilingRigDetails: { type: String, default: "RKEC Details" },
    casingToplevel: { type: SchemaTypes.Double, default: 0 },
    existingToplevel: { type: SchemaTypes.Double, default: 0 },
    //pillingCutOfflevel: { type: SchemaTypes.Double, default: 0 },
    //cageLengthRequired: { type: SchemaTypes.Double, default: 0 },
    // boringStartTime: {  type: String, default: "00:00"},
    //  boringStopTime: {  type: String, default: "00:00"},
    cageloweringStartTime: { type: String, default: "00:00" },
    cageloweringEndTime: { type: String, default: "00:00" },
    cageloweringQty: { type: Number, default: 0 },

    concretePouringStartTime: { type: String, default: "00:00" },
    concretePouringEndTime: { type: String, default: "00:00" },
    concretePouringQty: { type: Number, default: 0 },

    noOfTrimePiecesRequired: { type: Number, default: 0 },
    noOfTrimePiecesUsed: { type: Number, default: 0 },

    noOfManPower: { type: Number, default: 0 },
    noOfManPowerContractor: { type: Number, default: 0 },
    noOfShifts: { type: Number, default: 0 },

    nameOfSiteEngg: { type: String, default: "Rajesh Das" },
    siteEnggId: { type: String, default: "5555" },
    statusOfPilling: { type: Number, default: 1 },
    // 1- inProgress Boaring,2-Completed Boaring
    //3-Cage InProgress,4-Cage Completed
    //5-ConcretePouring In Progress
    //6-ConcretePouring 7-Completed
    createDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectEntry', schema);