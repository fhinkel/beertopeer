'use strict';

var ripple = require('ripple-lib');

var RippleService = {
    isSecretValid: function (secret) {
        return !!secret && !!ripple.Base.decode_check(33, secret);
    },

    getAccountFromSecret: function (secret) {
        if (!this.isSecretValid(secret)) {
            throw 'invalid secret ' + secret;
        }

        return ripple.Seed.from_json(secret).get_key().get_address().to_json();
    },

    pay: function(amount, currency, targetRippleAccountId) {
        console.log('Pay was called with ' + amount + ' ' + currency + '  to be paid to account with ID ' + targetRippleAccountId);
    }
};

module.exports = RippleService;
