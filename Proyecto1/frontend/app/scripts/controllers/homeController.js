angular.module('AngularScaffold.Controllers')
  .controller('HomeController', ['$scope', 'HomeService', '$sessionStorage', function ($scope, HomeService, $sessionStorage) {
    	$scope.title = "Tabla de estudiantes de programamción 4."
      /*$scope.exampleObject = {text: "Hola, Mundo"}*/
      $scope.labs = [];
      $scope.lab = {};

      $scope.getLabs = function(){
        HomeService.GetLabs().then(function(response){
          $scope.labs = response.data;
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message)
        });
      }

      $scope.isAdmin = function(){
        return $sessionStorage.currentUser && $sessionStorage.currentUser.scope.indexOf('admin') > -1;
      }

  }]);
