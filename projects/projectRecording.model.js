const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
//var mongoose = require('mongoose')
const SchemaTypes = mongoose.Schema.Types;

const schema = new Schema({
    projId: { type: String, required: true},
    pileNo:{ type: String, default: "ProjectDec", required: true},
    startDate:{ type: Date, default: Date.now},
    fromTimeOfBoring:{ type: String, required: true},
    toTimeOfBoring:{ type: String, required: true},
    depthOfBoreFrom:{type: SchemaTypes.Double, default: 0},
    depthOfBoreTo:{type: SchemaTypes.Double, default: 0},
    finalDepthOfBore:{type: SchemaTypes.Double, default: 0},
    descriptionOfSoil:{ type: String, default: "ProjectDec"},
    RLOfThePileFrom:{type: SchemaTypes.Double, default: 0},
    RLOfThePileTo:{type: SchemaTypes.Double, default: 0},
    remarks:{ type: String, default: "any"},
    siteEnggId:{ type: String, default: "Details" },
    createDate:{ type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectRecording', schema);