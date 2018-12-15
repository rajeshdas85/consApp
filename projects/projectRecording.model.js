const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ProjId: { type: String, required: true},
    PileNo:{ type: String, default: "ProjectDec", unique:true},
    startDate:{ type: Date, default: Date.now},
    fromTimeOfBoring:{ type: Date, required: true},
    ToTimeOfBoring:{ type: Date, required: true},
    depthOfBoreFrom:{type: SchemaTypes.Double, default: 0},
    depthOfBoreTo:{type: SchemaTypes.Double, default: 0},
    finalDepthOfBore:{type: SchemaTypes.Double, default: 0},
    descriptionOfSoil:{ type: String, default: "ProjectDec"},
    RLOfPileFrom:{type: SchemaTypes.Double, default: 0},
    RLOfPileTo:{type: SchemaTypes.Double, default: 0},
    remarks:{ type: String, default: "any"},
    siteEnggId:{ type: String, default: "Details" },
    createDate:{ type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectRecording', schema);