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
  var conversions = [];
  conversions[0] = function ( value, expo ) {
      return convert();
  };
  conversions[1] =
  conversions[5] = function ( value, expo ) {
      return symbol( value, expo ) ;
  };
  conversions[2] =
  conversions[3] = function ( value, expo ) { 
      var terms = [];
      while ( value-- ) {
          terms.push( [ 1, expo ] );
      }
      return convert.apply( [], terms );
  };
  conversions[4] = function ( value, expo ) { 
      return [ [ 1, expo ], [ 5, expo ] ];
  };
  conversions[6] =
  conversions[7] =
  conversions[8] = function ( value, expo ) { 
      return [ [ 5, expo ], [ value %5, expo ] ];
  };
  conversions[9] = function ( value, expo ) { 
      return [ [ 1, expo ], [ 1, expo +1 ] ];
  };

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

  function convert () {
      return _.chain( arguments )
          .map( function ( v ) {
              return _.flatten( [ v, conversions[ v[0] ] ] ) ;
          })
          .map( function ( v ) { return v[2].apply( [], v ); } )
          .flatten()
          .value();
  }

  _.forEach( [ symbol, digits, convert ], function ( v ) { 
      var k = v.toString().split( /[ \(]/ )[1];
      expose[k] = v;
  });
  expose.conversions = conversions ;

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
