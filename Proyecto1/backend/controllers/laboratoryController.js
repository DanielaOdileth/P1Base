var lab = require('../schemas/laboratory');
var boom = require('boom');

exports.createLab = {
	handler : function(request,reply){
		var newLab = new lab({
			idLab : request.payload.idLab, 
			asientos : request.payload.asientos,
			recursos : request.payload.recursos
		});

		 newLab.save(function (err) {
         console.log(err);
         if(err){
          return reply(boom.notAcceptable('Error ' + err));
         }else{
           return reply('ok');
         };
      });
	}
};

exports.getLabsByID = {
	handler: function(request, reply) {
    	var lab2 = lab.find({idLab : '3.2'});
    	reply(lab2);
  		return lab2;
	}
};