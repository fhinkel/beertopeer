/**
 * Created by kknauf on 21.06.15.
 */

'use strict';

var RippleService = require('./RippleService');

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');


var RippleListener = {

    activeRippleAccount: '',

    listenToBalanceChanges: function(rippleAccount) {
        RippleService.stopListeningToBalanceChanges(this.activeRippleAccount);
        RippleService.startListeningToBalanceChanges(rippleAccount, this.balancesLoaded);
        this.activeRippleAccount = rippleAccount;
    },

    balancesLoaded: function(succ, balances) {
        if (!succ) {
            return;
        }
        UserActions.changeBalance(balances);
    }
};

module.exports = RippleListener;


