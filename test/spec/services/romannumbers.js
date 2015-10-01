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

});
