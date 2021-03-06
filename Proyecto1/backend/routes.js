var usersController = require('./controllers/usersController');
var authController = require('./controllers/authController');
var labController = require('./controllers/laboratoryController');
var reservationController = require('./controllers/reservationController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Labs')}}},
	{method: 'POST', path: '/v1/register', config: usersController.createUser},
	{method: 'POST', path: '/v1/login', config: authController.login},
	{method: 'GET', path: '/v1/logout', config: authController.logout},
	{method: 'POST', path: '/v1/addReservation', config : reservationController.createReservation},
	{method: 'GET', path: '/v1/reservations/{idLab}', config : reservationController.getReservationsByLab},
	{method: 'GET', path: '/v1/reservationsName/{reservationName}', config : reservationController.getReservationsByName},
	{method: 'DELETE', path: '/v1/removeReservation/{reservationId}', config : reservationController.removeReservation},
	{method: 'PUT', path: '/v1/updatedReservation/{reservationId}', config: reservationController.updateReservation}
	//{method: 'GET',path: '/',config: ejemplo.test}
];
