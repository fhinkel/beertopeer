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

    it('should parse memo data', function() {
        var res = RippleService._parseMemoData({
            MemoData: "7B226576656E74436F6465223A224A42434452222C22757365724E616D65223A22446965746572227D",
            MemoFormat: "6A736F6E",
            MemoType: "626565723270656572"
        });

        assert.equal(res.MemoType, '626565723270656572');
        assert.equal(res.MemoFormat, '6A736F6E');
        assert.equal(res.MemoData, '7B226576656E74436F6465223A224A42434452222C22757365724E616D65223A22446965746572227D');

        assert.equal(res.parsed_memo_type, 'beer2peer');
        assert.equal(res.parsed_memo_format, 'json');
        assert.deepEqual(res.parsed_memo_data, {
            eventCode: 'JBCDR',
            userName: 'Dieter'
        });
    });
});