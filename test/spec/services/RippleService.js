var assert = require('chai');

describe('RippleService', function () {

    var number = 43;
    var RippleService = require('../../../src/services/RippleService');
    beforeEach(function () {

        number = 17;
    });

    it('should foo', function () {
        assert.equal(42, number);
    });
});