const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const schema = new Schema({
    pileNo: { type: String, unique: true, required: true },
    projId: { type: String, required: true },
    uniqueId: { type: String, required: true },
    dateOfStarting: { type: String, default: null },
    dateOfEnding: { type: String, default: null },
    pillingRigDetails: { type: String, default: "Details" },//D
    diaOfPile: { type: Number, default: 1  },
    casingToplevel: { type: SchemaTypes.Double, default: 0 },//D
    existingToplevel: { type: SchemaTypes.Double, default: 0 },//D
    pillingCutOfflevel: { type: SchemaTypes.Double, default: 0 },
    foundinglevel: { type: SchemaTypes.Double, default: 0 },
    emptyBoreDepth: { type: SchemaTypes.Double, default: 0 },
    beforeDepthFromCTL: { type: SchemaTypes.Double, default: 0 },
    beforeDepthFromEGL: { type: SchemaTypes.Double, default: 0 },
    beforeDepthFromCOL: { type: SchemaTypes.Double, default: 0 },
    concreteQtyTheorotical: { type: SchemaTypes.Double, default: 0 },
    concreteQtyActual: { type: SchemaTypes.Double, default: 0 },
    cageLengthRequired: { type: SchemaTypes.Double, default: 0 },
    boringStartTime: { type: String , default: "00:00" },//D
    boringEndTime: { type: String, default: "00:00"  },//D
    depthOfBore: { type: SchemaTypes.Double, default: 0 },//D
    totalBoringTime: { type: String , default: "00:00" },//boringEndTime -boringStartTime
//Step1
    cageLoweringStartTime: { type: String , default: "00:00" },//D
    cageLoweringEndTime: { type: String, default: "00:00"  },//D
    totalTimeForCageLowering: { type: String, default: "00:00"  },//D cal diffe
//Step3
    concretePourStartTime:{ type: String , default: "00:00" },//D
    concretePourEndTime:{ type: String , default: "00:00" },//D
    totalConcretePourTime:{ type: String , default: "00:00" },//D concretePourEndTime -concretePourStartTime
//Step4

    noOfTrimePiecesUsed: { type: SchemaTypes.Double, default: 0 },//D
    totalNoOfShiftsWorked:{ type: SchemaTypes.Double, default: 0 },//D
    noOfManpowerPRC :{ type: SchemaTypes.Double, default: 0 },//D
    noOfManpowerContractor:{ type: SchemaTypes.Double, default: 0 },//D

   
   //Step5
    noOfTrimePiecesRequired: { type: SchemaTypes.Double, default: 0 },//D Later

    nameOfSiteEngg: { type: String, default: "RKEC" },

    siteEnggId: { type: String, default: "Details" },
    createDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
schema.statics.findOrCreate = require("find-or-create");
module.exports = mongoose.model('ProjectHistory', schema);