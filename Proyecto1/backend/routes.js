var ejemplo = require('./controllers/ejemploController');
var usersController = require('./controllers/usersController');
var authController = require('./controllers/authController');
var labController = require('./controllers/laboratoryController');
var reservationController = require('./controllers/reservationController');

exports.endpoints = [{method: 'GET', path: '/', config: {handler: function(request, reply){reply('API v1, Labs')}}},
	{method: 'POST', path: '/v1/register', config: usersController.createUser},
	{method: 'POST', path: '/v1/login', config: authController.login},
	{method: 'GET', path: '/v1/logout', config: authController.logout}
	//{method: 'GET',path: '/',config: ejemplo.test}
];
