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
  var romans = [
      [ 'I', 'V' ],	// 1, 5
      [ 'X', 'L' ],	// 10, 50
      [ 'C', 'D' ],	// 100, 500
      [ 'M', '?' ]	// 1000, 5000
  ]; 

  var _this = {};
  var expose = {};

  // private methods

  function symbol ( value, expo ) {
      // value should either be 1 or 5
      return romans[ expo ][ value < 5 ? 0 : 1 ];
  }

  function digits ( number ) {
      var out = [];
      var digit, decimal; 

      while ( number !== 0 ) {
          digit = Math.pow( 10, 1 +out.length );
          decimal = number %digit;
          number = number -decimal;
          out.push( 10 *decimal /digit );
      }

      return out;
  }

  _.forEach( [ symbol, digits ], function ( v ) { 
      var k = v.toString().split( /[ \(]/ )[1];
      expose[k] = v;
  });

  // public methods

  _this.expose = function () { return expose; };

  _this.toRoman = function ( number ) {
    return number.toString();
  } ;

  _this.fromRoman = function ( string ) {
    parseInt( string );
  } ;

  return _this;
  });
