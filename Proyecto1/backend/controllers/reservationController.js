var reservation = require('../schemas/reservation');

exports.createReservation = {
	handler : function(request,reply){
		var newReservation = new reservation({
			name : request.payload.name,
			organization : request.payload.organization,
			purpose : request.payload.purpose,
			idLab : request.payload.idLab,
			horaInicio : request.payload.horaInicio,
			horaFin : request.payload.horaFin,
			diaInicio : request.payload.diaInicio,
			diaFin : request.payload.diaFin
		});

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
		console.log('u ' + request.params.idLab);
		var reservations = reservation.find({idLab : request.params.idLab});
			reply (reservations);
	}
};

exports.reservations = {
handler: function(request, reply){
		var r= reservation.find({});
		reply(r);
	}
};

exports.removeReservation = {
	handler : function(request,reply){
		//reservation.find({name : 'reservacion'}).remove().exec();
		var filterBy = request.params.reservationId;

          reservation.findOneAndRemove(
            { _id: filterBy },function (err, reservations){
              reservations.save(function(err){
							})
							  return reply('ok');
                console.log('deleted');
            });
					}
};

exports.updateReservation = {
	handler: function(request, reply){
		var filterBy = request.params.reservationId;
		//var newIdUsuario = request.params.idUsuario;
		var newName = request.payload.name;
		var newOrganizacion = request.payload.organization;
		var newProposito = request.payload.purpose;
		var newIdLab = request.payload.idLab;
		var newHoraInicio = request.payload.horaInicio;
		var newHoraFin = request.payload.horaFin;
		var newDias = request.payload.dias;
		reservation.findOneAndUpdate(
			{_id: filterBy},
			{
				name: newName,
				organization: newOrganizacion,
				purpose: newProposito,
				idLab: newIdLab,
				horaInicio: newHoraInicio,
				horaFin: newHoraFin,
				dias: newDias
			}, function(err, reservations){
				reservations.save(function(err){
				});
			});
			console.log("updated");
			return reply('ok');
	}
};
