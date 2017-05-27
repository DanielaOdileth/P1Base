var mongoose = require('mongoose');
var LaboratorySchema = new mongoose.Schema({
	idLab : String,
	asientos : String,
	recursos : String
});

module.exports = mongoose.model('Laboratory', LaboratorySchema);