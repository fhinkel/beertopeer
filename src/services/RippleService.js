var ripple = require('ripple-lib');

var RippleService = {
    isSecretValid: function (secret) {
        return secret && Base.decode_check(33, secret);
    },

    getAccountFromSecret: function (secret) {
        if (!isSecretValid(secret)) {
            throw 'invalid secret ' + secret;
        }

        return ripple.Seed.from_json(value).get_key().get_address().to_json();
    }
};

module.exports = RippleService;