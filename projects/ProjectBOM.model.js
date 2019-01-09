const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.Schema.Types;
const schema = new Schema({
    srNo:{type: Number},
    projId: { type: String, required: true },
    desc: { type: String, default: "Details" },
    rate: { type: SchemaTypes.Double, default: 0 },
    qty: { type: SchemaTypes.Double, default: 0 },
    amount: { type: SchemaTypes.Double, default: 0 },
    status: { type: SchemaTypes.Double, default: 0 },
    createDate: { type: String, default: "DD/MM/YYYY h:m:s" },
    updateDate: { type: String, default: "DD/MM/YYYY h:m:s" }
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('ProjectBOM', schema);