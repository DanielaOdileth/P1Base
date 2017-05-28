angular.module('AngularScaffold.Controllers')
  .controller('HomeController', ['HomeService', '$scope', '$rootScope', '$sessionStorage',  function ( homeService, $scope, $rootScope, $sessionStorage) {
    	/*$scope.exampleObject = {text: "Hola, Mundo"}*/
      $scope.reservation = {};
      $scope.reservations = [];

      $scope.addReservation1 = function(){
        if(parseInt($scope.reservation.horaInicio) >= parseInt($scope.reservation.horaFin)){
          alert('Horarios ingresados erroneamente');
        }else{
          var reservation = {name : $scope.reservation.name, organization : $scope.reservation.organization,
                            purpose : $scope.reservation.purpose, idLab: "1",
                            horaInicio : $scope.hourToString($scope.reservation.horaInicio), 
                            horaFin : $scope.hourToString($scope.reservation.horaFin),
                            dias : ['1', '2']};
          homeService.addReservation(reservation).then(function(response){
            alert('Registered in correctly!');
          }).catch(function(err){
            console.log(err);
            alert(err.data.error + " " + err.data.message);
          });
        }
      }

      $scope.hourToString = function(param){
        var word = "";
        if(parseInt(param) < 13){
          word = param + ":00 a.m";
        }else{
          word = (parseInt(param) - 12) + ":00 p.m";
        }
        return word;
      }

      $scope.getReservations = function(){
        homeService.getReservation().then(function(response){
          $scope.reservations = response.data;
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message)
        });
      }

      $scope.updateReservations = function(item){
        $scope.reservation = item;
        homeService.updateReservation($scope.reservation, item._id).then(function(response){
          alert("Update");
          $scope.getReservation();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.deleteReservations = function(item){
        $scope.user = item;
        homeService.deleteReservation($scope.reservation, item._id).then(function(response){
          alert("Delete");
          $scope.getReservations();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      /*$scope.isAdmin = function(){
        console.log('Aquii admin');
        return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
      }*/

  }]);
