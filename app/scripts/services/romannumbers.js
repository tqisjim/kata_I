'use strict';

/**
 * @ngdoc service
 * @name kataApp.RomanNumbers
 * @description
 * # RomanNumbers
 * Service in the kataApp.
 */
angular.module('kataApp')
  .service('RomanNumbers', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
  var _this = {};
  var expose = {};

  _this.expose = function () { return expose; };

  _this.toRoman = function ( number ) {
    return number.toString();
  } ;

  _this.fromRoman = function ( string ) {
    parseInt( string );
  } ;

  return _this;
  });
