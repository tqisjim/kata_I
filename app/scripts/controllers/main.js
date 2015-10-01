'use strict';

/**
 * @ngdoc function
 * @name kataApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the kataApp
 */
angular.module('kataApp')
  .controller('MainCtrl', function ( RomanNumbers, $window ) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $window.roman = RomanNumbers ;
  });
