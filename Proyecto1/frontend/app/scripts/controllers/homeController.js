angular.module('AngularScaffold.Controllers')
  .controller('HomeController', ['HomeService', '$scope', '$rootScope', '$sessionStorage',  function ( homeService, $scope, $rootScope, $sessionStorage) {
    	/*$scope.exampleObject = {text: "Hola, Mundo"}*/
      $scope.reservation = {};

      $scope.addReservation1 = function(){
        alert('Lllegue reservacion');
        var reservation = {name : $scope.reservation.name, organization : $scope.reservation.organization,
                          purpose : $scope.reservation.purpose, horaInicio : '11', horaFin : '12',
                          dias : ['1', '2']};
                          alert(reservation.name);
        homeService.addReservation(reservation).then(function(response){
          alert('Registered in correctly!');
        }).catch(function(err){
          console.log(err);
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.isAdmin = function(){
        console.log('Aquii admin');
        return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
      }

  }]);
