var ripple = require('ripple-lib');

var RippleService = {
    isSecretValid(secret) {
        return secret && Base.decode_check(33, secret);
    },

    getAccountFromSecret(secret) {
        if (!this.isSecretValid(secret)) {
            throw 'invalid secret ' + secret;
        }

        return  ripple.Seed.from_json(value).get_key().get_address().to_json();
    }
}

module.exports = RippleService