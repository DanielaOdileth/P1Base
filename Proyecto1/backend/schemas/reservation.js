var mongoose = require('mongoose');

var ReservationSchema = mongoose.Schema({
	name : String,
	organization : String,
	purpose : String
});

module.exports = mongoose.model('Reservation', ReservationSchema);