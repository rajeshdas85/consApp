const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const schema = new Schema({
    projId: { type: String, required: true },
    pileNo: { type: String, unique: true },
    dateOfStarting: { type: Date, default: Date.now },
    dateOfEnding: { type: Date, default: Date.now },
    pillingRigDetails: { type: String, default: "Details" },
    diaOfPile: { type: Number, default: 1  },
    casingToplevel: { type: SchemaTypes.Double, default: 0 },
    existingToplevel: { type: SchemaTypes.Double, default: 0 },
    pillingCutOfflevel: { type: SchemaTypes.Double, default: 0 },
    foundinglevel: { type: SchemaTypes.Double, default: 0 },
    emptyBoreDepth: { type: SchemaTypes.Double, default: 0 },
    beforeDepthFromCTL: { type: SchemaTypes.Double, default: 0 },
    beforeDepthFromEGL: { type: SchemaTypes.Double, default: 0 },
    beforeDepthFromCOL: { type: SchemaTypes.Double, default: 0 },
    concreteQtyTheorotical: { type: SchemaTypes.Double, default: 0 },
    concreteQtyActual: { type: SchemaTypes.Double, default: 0 },
    cageLengthRequired: { type: SchemaTypes.Double, default: 0 },
    boringStartTime: { type: String , default: "00:00" },
    boringEndTime: { type: String, default: "00:00"  },
    totalBoringTime: { type: String , default: "00:00" },
    cageLoweringStartTime: { type: String , default: "00:00" },
    cageLoweringEndTime: { type: String, default: "00:00"  },
    totalTimeForCageLowering: { type: String, default: "00:00"  },
    noOfTrimePiecesRequired: { type: SchemaTypes.Double, default: 0 },
    noOfTrimePiecesUsed: { type: SchemaTypes.Double, default: 0 },
    nameOfSiteEngg: { type: String, default: "Details" },
    siteEnggId: { type: String, default: "Details" },
    createDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectHistory', schema);