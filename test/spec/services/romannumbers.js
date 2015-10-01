'use strict';

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
