angular.module('AngularScaffold.Services').factory('HomeService', ['$http',
	function($http){
		$http.defaults.withCredentials = true;
		var baseUrl = 'http://localhost:8000/';
		return {
			addReservation : function(payload){
        		return $http.post(baseUrl + "v1/addReservation",payload);
        	},
			getReservation : function(idLab){;
				return $http.get(baseUrl + "v1/reservations/"+idLab,idLab);
			},
			deleteReservation : function(payload, id){
				return $http.delete(baseUrl + "v1/removeReservation/"+id, payload);
			},
			updateReservation : function(payload, id){
				return $http.put(baseUrl + "v1/updatedReservation/" + id, payload);
			}
	    };
}]);
