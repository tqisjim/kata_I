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
 *
 * The echoOnly() method is used for testing to disable the recursion.
 */
  it('should decompose non-mapping digits', function () {
    var expose = RomanNumbers.expose();
    expose.echoOnly() ;

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

/**
 * Test the recursion
 */
  it('should convert a digit to its Roman equivalent', function () {
    var expose = RomanNumbers.expose();
    expect( flattenToString( expose.conversions[0]( 0, 0 ) ) )
        .toBe('');
    expect( flattenToString( expose.conversions[1]( 1, 1 ) ) )
        .toBe('X');
    expect( flattenToString( expose.conversions[2]( 2, 0 ) ) )
        .toBe('I-I');
    expect( flattenToString( expose.conversions[3]( 3, 0 ) ) )
        .toBe('I-I-I');
    expect( flattenToString( expose.conversions[4]( 4, 0 ) ) )
        .toBe('I-V');
    expect( flattenToString( expose.conversions[5]( 5, 0 ) ) )
        .toBe('V');
    expect( flattenToString( expose.conversions[5]( 5, 2 ) ) )
        .toBe('D');
    expect( flattenToString( expose.conversions[6]( 6, 2 ) ) )
        .toBe('D-C');
    expect( flattenToString( expose.conversions[7]( 7, 1 ) ) )
        .toBe('L-X-X');
    expect( flattenToString( expose.conversions[8]( 8, 0 ) ) )
        .toBe('V-I-I-I');
    expect( flattenToString( expose.conversions[9]( 9, 2 ) ) )
        .toBe('C-M');
  });

/**
 * The convert() method either performs a symbol lookup or recurses.
 * Ultimately, it returns the Roman representation for a single digit.
 */
  it('should convert a digit to its Roman equivalent', function () {
    var expose = RomanNumbers.expose();
    expect( expose.convert( [ 0, 1 ] ).join('') ).toBe('');
    expect( expose.convert( [ 1, 1 ] ).join('') ).toBe('X');
    expect( expose.convert( [ 2, 2 ] ).join('') ).toBe('CC');
    expect( expose.convert( [ 3, 0 ] ).join('') ).toBe('III');
    expect( expose.convert( [ 4, 1 ] ).join('') ).toBe('XL');
    expect( expose.convert( [ 5, 2 ] ).join('') ).toBe('D');
    expect( expose.convert( [ 6, 0 ] ).join('') ).toBe('VI');
    expect( expose.convert( [ 7, 1 ] ).join('') ).toBe('LXX');
    expect( expose.convert( [ 8, 2 ] ).join('') ).toBe('DCCC');
    expect( expose.convert( [ 9, 0 ] ).join('') ).toBe('IX');
  });

/**
 * The public toRoman() method combines the results of the convert() 
 * method applied to each digit.
 */
  it('should convert a digit to its Roman equivalent', function () {
    expect( RomanNumbers.toRoman( 1 ) ).toBe( 'I' );
    expect( RomanNumbers.toRoman( 3 ) ).toBe( 'III' );
    expect( RomanNumbers.toRoman( 9 ) ).toBe( 'IX' );
    expect( RomanNumbers.toRoman( 1066 ) ).toBe( 'MLXVI' );
    expect( RomanNumbers.toRoman( 1989 ) ).toBe( 'MCMLXXXIX' );
  });

/**
 * Parsing a Roman representation is easier.  Each Roman symbol maps
 * directly to a numeric value.
 */
  it('should convert a Roman symbol to numeric value', function () {
    var expose = RomanNumbers.expose();
    var values = expose.romanValues();
    expect( values.I ).toBe( 1 );
    expect( values.V ).toBe( 5 );
    expect( values.X ).toBe( 10 );
    expect( values.L ).toBe( 50 );
    expect( values.C ).toBe( 100 );
    expect( values.D ).toBe( 500 );
    expect( values.M ).toBe( 1000 );
  });

/**
 * Values are slightly affected by position.  A value smaller than the 
 * proceeding value is negated.  Eg, the 'I' in 'IX' represents a value
 * of -1.  The leadingDecr() method performs this function in a collection
 * context.
 */
  it('should negate values based on position', function () {
    var expose = RomanNumbers.expose();
    expect( expose.leadingDecr( 10, 0, [ 10, 50, 1, 10 ] ) )
        .toBe( -10 );
    expect( expose.leadingDecr( 50, 1, [ 10, 50, 1, 10 ] ) )
        .toBe( 50 );
    expect( expose.leadingDecr( 1, 2, [ 10, 50, 1, 10 ] ) )
        .toBe( -1 );
    expect( expose.leadingDecr( 10, 3, [ 10, 50, 1, 10 ] ) )
        .toBe( 10 );
  });

/**
 * The public fromRoman() method determines the values of each
 * Roman symbol, and returns the sum.
 */
  it('should convert a Roman Numeral to a number', function () {
    expect( RomanNumbers.fromRoman( 'I' ) ).toBe( 1 );
    expect( RomanNumbers.fromRoman( 'III' ) ).toBe( 3 );
    expect( RomanNumbers.fromRoman( 'IX' ) ).toBe( 9 );
    expect( RomanNumbers.fromRoman( 'MLXVI' ) ).toBe( 1066 );
    expect( RomanNumbers.fromRoman( 'MCMLXXXIX' ) ).toBe( 1989 );
  });
});
