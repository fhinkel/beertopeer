var assert = require('chai').assert;

describe('RippleService', function () {
    var RippleService = require('../../../src/services/RippleService');

    beforeEach(function () {
    });

    it('should validate ripple secrets', function () {
        assert.equal(RippleService.isSecretValid('asd'), false);
        assert.equal(RippleService.isSecretValid('asd'), false);
        assert.equal(RippleService.isSecretValid('snvMr7mkrPosYjRwejWsKcGXbBma1'), true);
        assert.equal(RippleService.isSecretValid('snvMr7mkrPosYjRwejWsKcGXbBma2'), false);
    });

    it('should get account from secret', function () {
        assert.equal(RippleService.getAccountFromSecret('snvMr7mkrPosYjRwejWsKcGXbBma1'), 'rMTnqqawC9SQQPVqWVSNwjQz1Z5nDnE9qt');
    });
});