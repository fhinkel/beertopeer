'use strict';

var ripple = require('ripple-lib');
var Remote = ripple.Remote;
var Config = require('../constants/Config');

var SEND_MAX_FACTOR = 1.01;

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

    pay: function(senderSecret, recipientAccount, amount, callback) {
        console.log('Pay was called with ' + senderSecret + ' ' + recipientAccount + ' ' + amount);

        var senderAccount = this.getAccountFromSecret(senderSecret);

        this.remote.setSecret(senderAccount, senderSecret);

        amount.set_issuer(recipientAccount);
        var sendMax = amount.scale(SEND_MAX_FACTOR).set_issuer(senderAccount);
        console.log('amount: ' + amount.to_human_full());
        console.log('sendMax: ' + sendMax.to_human_full());

        // TODO set dynamically
        sendMax.set_issuer('rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q');
        amount.set_issuer('rMwjYedjc7qqtKYVLiAccJSmCwih4LnE2q');

        var tx = this.remote.createTransaction('Payment', {
            account: senderAccount,
            destination: recipientAccount,
            amount: amount
        });
        tx.setSendMax(sendMax);

        tx.on('state', function(state) {
            console.log('tx state changed to ' + state);
            if (state === 'final') {
                callback(tx.state === 'validated' && tx.finalized === true);
            }
        });

        console.log('tx to be submitted: ', tx.tx_json);

        tx.submit(function(err, res) {
            if (err) {
                console.log('- Transaction Submit Callback Error -');
                console.log(err);
            }
            else {
                console.log('- Transaction Submit Callback -');
            }
        });
    },

    _connectToRemote() {
        var remote = this.remote = new Remote(Config.rippleOptions);

        remote.on('error', function (error) {
            console.log('remote error: ', error);
        });

        remote.connect(function (err, res) {
            if (err) {
                console.log("error connecting", err);
                return;
            }
        });
    }

};

RippleService._connectToRemote();

module.exports = RippleService;
