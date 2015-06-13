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

    pay: function(userName, senderSecret, recipientAccount, amount, eventCode, callback) {
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

        tx.addMemo({
            memoType: 'beer2peer',
            memoFormat: 'json',
            memoData: {
                eventCode: eventCode,
                userName: userName
            }
        });

        tx.on('state', function(state) {
            console.log('tx state changed to ' + state);
        });

        console.log('tx to be submitted: ', tx.tx_json);

        tx.submit(function(err, res) {
            if (err) {
                console.log('- Transaction Submit Callback Error -');
                console.log(err);
                callback(false);
            }
            else {
                console.log('- Transaction Submit Callback -');
                callback(true);
            }
        });
    },

    requestTransactionsForEvent(recipientAccount, eventCode, callback) {
        var that = this;

        var opts = {
            account: recipientAccount,
            ledger_index_min: -1,
            ledger_index_max: -1,
            limit: 100, // at some point we might want to implement paging
            forward: false
        };
        this.remote.requestAccountTransactions(opts, function(err, resp) {
            if (err) {
                console.log("request account tx error", err);
                callback(false);
                return;
            }
            console.log("requestAccountTransactions resp", resp);

            var ts = resp.transactions.
                filter(function(t) {
                    var isPaymentToDest = t.tx.TransactionType === 'Payment' && t.tx.Destination === recipientAccount;

                    var memoData = that._getOurMemoData(t.tx.Memos);
                    var isForEvent = memoData && memoData.eventCode === eventCode;

                    return isPaymentToDest && isForEvent;
                }).
                map(function(t) {
                    var memoData = that._getOurMemoData(t.tx.Memos);

                    return {
                        senderAccount: t.tx.Account,
                        senderName: memoData.userName,
                        amount: ripple.Amount.from_json(t.meta.delivered_amount)
                    };
                });

            console.log('TS', ts);

            callback(true, ts);
        });
    },

    _getOurMemoData(memos) {
        if (!memos) {
            return null;
        }

        var ourMemos = memos.filter(function(m) {
            return m.Memo.parsed_memo_type === 'beer2peer' && m.Memo.parsed_memo_format === 'json';
        });

        if (ourMemos.length === 1) {
            return ourMemos[0].Memo.parsed_memo_data;
        } else {
            return null;
        }
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
