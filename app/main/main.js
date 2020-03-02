'use strict';

angular.module('myApp.main', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'main/main.html',
    // templateUrl: 'view1/view1.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', '$http', '$location', 'Fac', function($scope, $http, $location, Fac) {
  //console.log('MainCtrl');

  $http.get("http://localhost:8080/api/modulos")
    .then(function (response) {
      //$scope.modulos = response.data;
      Fac.setModulos(response.data);

      $http.get("http://localhost:8080/api/modulos/cliente")
        .then(function (response) {
          Fac.setModulosCli(response.data);
          $location.path('/view1');
        });
    });

}]);
