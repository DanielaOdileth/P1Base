var reservation = require('../schemas/reservation');

exports.createReservation = {
	handler : function(request,reply){
		console.log('Llegueeeeeeeee');
		var newReservation = new reservation({
			name : request.payload.name,
			organization : request.payload.organization,
			purpose : request.payload.purpose,
			idLab : request.payload.idLab, 
			horaInicio : request.payload.horaInicio,
			horaFin : request.payload.horaFin, 
			dias : request.payload.dias 
		});
		console.log('Llegueeeeeeeee2');

		newReservation.save(function (err) {
         console.log(err);
         if(err){
          return reply(boom.notAcceptable('Error' + err));
         }else{
           return reply('ok');
         };
      });
	}
};

//devuelve reservaciones segun el id del lab
exports.getReservationsByLab = {
	handler : function(request,reply){
		var reservations = reservation.find({idLab : '3.2'});
			reply(reservations);
			return reservations;
	}
};

exports.removeReservationByName = {
	handler : function(request,reply){
		reservation.find({name : 'reservacion'}).remove().exec();
	}
};