'use strict';

/**
 * Roman Numerals are string representation of numbers.  The API might
 * best create methods to JavaScript Number and String built-in classes,
 * as the toRoman() method is functionally identical to Number.toString() 
 * except the resulting representation is uniquely Roman.  Only cardinal 
 * numbers can be converted.
 *
 * The internals of the RomanNumbers service need to be exposed for testing
 * using the public method expose().
 */

function flattenToString ( a ) {
  return _.flatten( a, true ).join('-') ;
  }

describe('Service: RomanNumbers', function () {

  // load the service's module
  beforeEach(module('kataApp'));

  // instantiate service
  var RomanNumbers;
  beforeEach(inject(function (_RomanNumbers_) {
    RomanNumbers = _RomanNumbers_;
  }));

  it('should do something', function () {
    expect(!!RomanNumbers).toBe(true);
  });

/**
 * Break an integer into a series of exponential terms Each exponential term 
 * is an array consisting of a single digit and an exponential value (0-3).  
 * The resulting elements need to map to Roman symbols:
 * eg, [ 1, 0 ], [ 5, 0 ], [ 1, 1 ], [ 5, 1 ], etc.
 */
  it('should map Roman symbols', function () {
    var expose = RomanNumbers.expose();
    expect( expose.symbol( 1, 0 ) ).toBe('I');
    expect( expose.symbol( 5, 0 ) ).toBe('V');
    expect( expose.symbol( 1, 1 ) ).toBe('X');
    expect( expose.symbol( 5, 1 ) ).toBe('L');
    expect( expose.symbol( 1, 2 ) ).toBe('C');
    expect( expose.symbol( 5, 2 ) ).toBe('D');
    expect( expose.symbol( 1, 3 ) ).toBe('M');
  });

/**
 * Roman representation is base 10, conversions can be performed on 
 * digit-by-digit basis.
 */
  it('should convert a number to a series of digits', function () {
    var expose = RomanNumbers.expose();
    expect( expose.digits( 1849 ).join('-') ).toBe('9-4-8-1');
    expect( expose.digits( 103 ).join('-') ).toBe('3-0-1');
    expect( expose.digits( 9 ).join('-') ).toBe('9');
  });

/**
 * Terms are recursively decomposed.  Decomposition algorithms correspond
 * to every digit.
 */
  it('should decomponse non-mapping digits', function () {
    var expose = RomanNumbers.expose();
    expect( flattenToString( expose.conversions[0]( 0, 0 ) ) )
        .toBe('');
    expect( flattenToString( expose.conversions[1]( 1, 0 ) ) )
        .toBe('I');
    expect( flattenToString( expose.conversions[1]( 1, 1 ) ) )
        .toBe('X');
    expect( flattenToString( expose.conversions[2]( 2, 0 ) ) )
        .toBe('1-0-1-0');
    expect( flattenToString( expose.conversions[3]( 3, 0 ) ) )
        .toBe('1-0-1-0-1-0');
    expect( flattenToString( expose.conversions[4]( 4, 0 ) ) )
        .toBe('1-0-5-0');
    expect( flattenToString( expose.conversions[5]( 5, 0 ) ) )
        .toBe('V');
    expect( flattenToString( expose.conversions[5]( 5, 2 ) ) )
        .toBe('D');
    expect( flattenToString( expose.conversions[6]( 6, 2 ) ) )
        .toBe('5-2-1-2');
    expect( flattenToString( expose.conversions[7]( 7, 1 ) ) )
        .toBe('5-1-2-1');
    expect( flattenToString( expose.conversions[8]( 8, 0 ) ) )
        .toBe('5-0-3-0');
    expect( flattenToString( expose.conversions[9]( 9, 2 ) ) )
        .toBe('1-2-1-3');
  });

});
