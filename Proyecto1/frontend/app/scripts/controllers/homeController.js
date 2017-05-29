angular.module('AngularScaffold.Controllers')
  .controller('HomeController', ['HomeService', '$scope', '$rootScope', '$sessionStorage',  function ( homeService, $scope, $rootScope, $sessionStorage) {
    	/*$scope.exampleObject = {text: "Hola, Mundo"}*/
      $scope.reservation = {};
      $scope.reservations = [];
      $scope.$sessionStorage = $sessionStorage;

      $scope.addReservation1 = function(){
         $scope.reservation.diaInicio = $("#fecha1").val();
         $scope.reservation.diaFin = $('#fecha2').val();

        if((parseInt($scope.reservation.horaInicio) >= parseInt($scope.reservation.horaFin)) ||
          ($scope.getDay($scope.reservation.diaInicio) > $scope.getDay($scope.reservation.diaFin))){
          alert('Horarios ingresados erroneamente');
        }else{
          var reservation = {name : $scope.reservation.name, organization : $scope.reservation.organization,
                            purpose : $scope.reservation.purpose, idLab: $scope.reservation.idLab,
                            horaInicio : $scope.hourToString($scope.reservation.horaInicio),
                            horaFin : $scope.hourToString($scope.reservation.horaFin),
                            diaInicio : $scope.reservation.diaInicio, diaFin : $scope.reservation.diaFin};
          if($scope.verifyReservations(reservation)){
            homeService.addReservation(reservation).then(function(response){
            alert('Registered in correctly!');
            }).catch(function(err){
            console.log(err);
            alert(err.data.error + " " + err.data.message);
            });
          }else{
            alert('La reserva que intento realizar entra en conflictos con otras reservas');
          }
        }
      }



      $scope.getReservations1 = function(idLab){
        $scope.reservations = {};
        homeService.getReservation(idLab).then(function(response){
          $scope.reservations = response.data;
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message)
        });

      }

      $scope.getDay = function(param){
        var day = '';

        if(parseInt(param.charAt(0) + '') == 0){
          day = param.charAt(1) + '';
        }else{
          day = param.charAt(0) + param.charAt(1);
        }

        if(parseInt(day) == 31){
          day = '0';
        }
        return parseInt(day);
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

      $scope.getDaysRange = function(date1,date2){
        var days = [];
        var day1 = $scope.getDay(date1);
        var day2 = $scope.getDay(date2);

        for(var i = day1; i <=day2; i++){
          days.push(i);
        }
        return days;
      }

      $scope.hoursToInt = function(param){
        alert('size' + param.length);
        if(parseInt(param.charAt(0) + '') > 6 ){
            return parseInt(param.charAt(0) + '');
        }else{
          if(param.length == 8){
            return parseInt(param.charAt(0) + '') + 12;
          }else{
            return parseInt(param.charAt(0) + param.charAt(1));
          }
        }
      }

      $scope.getHoursRange = function(hour1,hour2){
        var hours = [];
        var hora1 = $scope.hoursToInt(hour1);
        var hora2 = $scope.hoursToInt(hour2);

        for(var i = hora1;i<hora2;i++){
          hours.push(i);
        }
        return hours;
      }

      $scope.verifyReservations = function(newReservation){
        alert(newReservation.idLab + " Holis");
        $scope.getReservations1(newReservation.idLab);
        alert($scope.reservations.length);

        for(var i = 0; i < $scope.reservations.length; i++){
          if($scope.compareArrays($scope.getDaysRange($scope.reservations[i].diaInicio,
            $scope.reservations[i].diaFin),$scope.getDaysRange(newReservation.diaInicio,
            newReservation.diaFin))){
            if($scope.compareArrays($scope.getHoursRange($scope.reservations[i].horaInicio,
            $scope.reservations[i].horaFin),$scope.getHoursRange(newReservation.horaInicio,
            newReservation.horaFin))){
              return false;
            }
          }
        }
        return true;
      }

      $scope.clearArray = function(){
        $scope.reservations = [];
        $scope.reservation = {};
      }

      $scope.compareArrays = function(arr1, arr2){
        for(var i = 0; i < arr1.length; i++){
          for(var k= 0; k < arr2.length; k++){
            if(arr1[i] == arr2[k]){
              return true;
            }
          }
        }
        return false;
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
          $scope.getReservations();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.deleteReservations = function(item){
        $scope.reservation = item;
        homeService.deleteReservation($scope.reservation, item._id).then(function(response){
          $scope.getReservations();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.isAdmin = function(){
        console.log('Aquii admin');
        return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
      }

  }]);
