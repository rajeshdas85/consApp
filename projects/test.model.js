const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
//var mongoose = require('mongoose')
const SchemaTypes = mongoose.Schema.Types;
const schema = new Schema({
});

schema.set('toJSON', { virtuals: true });
module.exports = mongoose.model('Test', schema);