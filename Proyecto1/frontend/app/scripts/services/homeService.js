angular.module('AngularScaffold.Services').factory('HomeService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		var baseUrl = 'http://localhost:8000/';
		return {
				PostLabs: function(payload){
					return $http.post(baseUrl + "v1/lab", payload);
				}
	    };
}]);
