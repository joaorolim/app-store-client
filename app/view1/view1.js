'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', 'Fac', function($scope, $http, Fac) {
  // console.log('View1Ctrl');

  let modulosToView = Fac.getModulosToView();
  $scope.mdsToView = modulosToView;

  //console.log($scope.mdsToView);

}]);
