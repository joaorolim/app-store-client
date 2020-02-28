'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
	// $http.get("https://jsonplaceholder.typicode.com/posts")
	$http.get("http://localhost:8080/api/modulos")
    .then(function (response) {
      $scope.modulos = response.data;
      console.log(response.data);
    });
}]);
