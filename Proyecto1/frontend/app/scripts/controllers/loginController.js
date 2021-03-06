angular.module('AngularScaffold.Controllers')
  .controller('LoginController', ['AuthService', '$scope', '$rootScope', '$sessionStorage',  function ( authService, $scope, $rootScope, $sessionStorage) {
      $scope.user = {};
      $scope.$sessionStorage = $sessionStorage;

      $scope.logout = function(){
        authService.Logout().then(function(response){
          alert('logged out correctly');
          $sessionStorage.$reset();
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        })
      }

      $scope.login = function(user){
        alert('entre');
        authService.Login(user).then(function(response){
          $sessionStorage.currentUser = response.data;
          $scope.user = {};
          $state.go('home');
        }).catch(function(err){
          alert(err.data.error + " " + err.data.message);
        });
      }

      $scope.register = function(){
        alert('me registre');
        var user = {username: $scope.user.username, password:  $scope.user.password, scope: ['admin']};
        authService.Register(user).then(function(response){
          alert('Registered in correctly!');
          $scope.login({username: user.username, password: user.password});
        }).catch(function(err){
          console.log(err);
          alert(err.data.error + " " + err.data.message);
        })
      }
  }]);
