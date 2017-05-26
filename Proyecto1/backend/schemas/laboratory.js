var mongoose = require('mongoose');

var LaboratorySchema = new mongoose.Schema({
	id : Schema.ObjectId;
	asientos : Number;
	recursos : String;
});

module.exports = mongoose.model('Laboratory', LaboratorySchema);