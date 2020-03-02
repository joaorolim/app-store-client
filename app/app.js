'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'ngResource',
  'myApp.main',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
])
.factory('Fac', function () {
  let modulos       = [];
  let modulosCli    = [];
  let moduloToView  = [];
  let modulosToView = [];

  let factory = {};

  function getColor(cat) {
    // Em uma aplicação real, essas configurações seriam salvas no BD.

    let cor = '#00b3b3';

    if ( cat === 'Performance' ) {
      cor = '#3366ff';
    } else if ( cat === 'Engajamento' ) {
      cor = '#b366ff';
    } else if ( cat === 'Cultura' ) {
      cor = '#00b33c';
    } else if ( cat === 'Relações' ) {
      cor = '#ff8000';
    }

    return cor;
  }


  factory.setModulos = function (val) {
    // console.log('setModulos');
    modulos = val;
  }

  factory.getModulos = function () {
    return modulos;
  }

  factory.setModulosCli = function (val) {
    modulosCli = val;
  }

  factory.getModulosCli = function () {
    return modulosCli;
  }

  factory.getModuloToView = function (modId) {
    moduloToView = [];

    var filterModulos = modulos.filter(function(el, pos) {
      if (el.mod_id == modId) {
        return true;
      }
      return false;
    });

    var filterModulosCli = modulosCli.filter(function(el, pos) {
      if (el.mod_id == modId) {
        return true;
      }
      return false;
    });

    //console.log(filterModulos[0].mod_id);
    let prepModToView = {};
    let btnDesc       = "";

    let cor = getColor( filterModulos[0].mod_categoria );

    if ( typeof filterModulosCli[0] != "undefined" ) {

      if ( filterModulosCli[0].mcl_ativo === '0' ) {
        btnDesc = "Ativar";
      } else {
        btnDesc = "Desativar";
      }

      prepModToView = {
        mod_id       : filterModulos[0].mod_id,
        mod_categoria: filterModulos[0].mod_categoria,
        mod_nome     : filterModulos[0].mod_nome,
        mod_valor    : filterModulos[0].mod_valor,
        mod_sobre    : filterModulos[0].mod_sobre,
        mod_img      : filterModulos[0].mod_img,
        btn_desc     : btnDesc,
        mod_cor      : cor
      }

    } else {

      btnDesc = "Contratar e Ativar";

      prepModToView = {
        mod_id       : filterModulos[0].mod_id,
        mod_categoria: filterModulos[0].mod_categoria,
        mod_nome     : filterModulos[0].mod_nome,
        mod_valor    : filterModulos[0].mod_valor,
        mod_sobre    : filterModulos[0].mod_sobre,
        mod_img      : filterModulos[0].mod_img,
        btn_desc     : btnDesc,
        mod_cor      : cor
      }

    }

    moduloToView = prepModToView;

    return moduloToView;
  }

  factory.getModulosToView = function () {
    // console.log('getModulosToView');
    // console.log(modulos);
    // console.log(modulosCli);

    modulosToView = [];

    let prepMdsToView = {};
    let btnDesc       = "";
    let cor           = "";

    for (let x in modulos) {

      cor = getColor( modulos[x].mod_categoria );

      var filterModulosCli = modulosCli.filter(function(el, pos) {
        if (el.mod_id == modulos[x].mod_id) {
          return true;
        }
        return false;
      });

      if ( typeof filterModulosCli[0] != "undefined" ) {
        // console.log(x + ":" + modulos[x].mod_id + ":" +modulos[x].mod_nome + " --- " + filterModulosCli[0].mod_id + " - " + filterModulosCli[0].mcl_ativo);

        if ( filterModulosCli[0].mcl_ativo === '0' ) {
          btnDesc = "Ativar";
        } else {
          btnDesc = "Desativar";
        }

        prepMdsToView = {
          mod_id       : modulos[x].mod_id,
          mod_categoria: modulos[x].mod_categoria,
          mod_nome     : modulos[x].mod_nome,
          mod_valor    : modulos[x].mod_valor,
          mod_sobre    : modulos[x].mod_sobre,
          mod_img      : modulos[x].mod_img,
          btn_desc     : btnDesc,
          mod_cor      : cor
        }

        modulosToView.push(prepMdsToView);

      } else {
        // console.log(x + ":" + modulos[x].mod_id + ":" +modulos[x].mod_nome + " - " + 'null');

        btnDesc = "Contratar";

        prepMdsToView = {
          mod_id       : modulos[x].mod_id,
          mod_categoria: modulos[x].mod_categoria,
          mod_nome     : modulos[x].mod_nome,
          mod_valor    : modulos[x].mod_valor,
          mod_sobre    : modulos[x].mod_sobre,
          mod_img      : modulos[x].mod_img,
          btn_desc     : btnDesc,
          mod_cor      : cor
        }

        modulosToView.push(prepMdsToView);
      }
    }

    return modulosToView;
  }

  return factory;
})
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: true
  });

  $routeProvider.otherwise({redirectTo: '/main'});

  // $routeProvider
  // .when('/view1', {
  //   redirectTo: '/view1'
  // })
  // .when('/view2', {
  //   redirectTo: '/view2'
  // })
  // .otherwise({
  //   redirectTo: '/view1'
  // });
}]);

