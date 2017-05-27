var mongoose = require('mongoose');

var ReservationSchema = mongoose.Schema({
	name : String,
	organization : String,
	purpose : String,
	idLab : String,
	horaInicio : String,
	horaFin : String, 
	dias : Array
});

module.exports = mongoose.model('Reservation', ReservationSchema);