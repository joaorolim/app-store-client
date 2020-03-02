'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2/:id', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', '$routeParams', '$http', '$location', 'Fac', function($scope, $routeParams, $http, $location, Fac) {
  // $scope.modId = $routeParams.id;

  $scope.cadastrar = function(ev, obj) {
    ev.preventDefault(); // prevent it opens default

    // alert(obj.modToView.btn_desc); mod_id

    let id  = obj.modToView.mod_id;
    let url = "";

    if ( obj.modToView.btn_desc === 'Desativar' ) {

      url = "http://localhost:8080/api/modulo/desativar/" + id;
      console.log(url);

      $http.get(url)
        .then(function (response) {
          $location.path('/main');
        });

    } else {

      url = "http://localhost:8080/api/modulo/ativar/" + id;
      console.log(url);

      $http.get(url)
        .then(function (response) {
          $location.path('/main');
        });

    }

    return false;
  };


  let modId = $routeParams.id;

  let moduloToView = Fac.getModuloToView(modId);
  $scope.modToView = moduloToView;


  //console.log($scope.modToView);
}]);
