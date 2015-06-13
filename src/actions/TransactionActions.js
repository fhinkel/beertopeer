/**
 * Created by kknauf on 13.06.15.
 */

'use strict';

var TransactionConstants = require('../constants/TransactionsConstants');

var Dispatcher = require('../dispatcher/Beer2PeerDispatcher');

var UserActions = {
    changeEventCode: function(eventCode) {
        Dispatcher.dispatch({
            actionType: TransactionConstants.USER_CREATE_WITH_SECRET,
            eventCode: eventCode
        });
    },
    addTransaction: function(transaction) {
        Dispatcher.dispatch({
            actionType: TransactionConstants.ADD_TRANSACTION,
            eventCode: transaction
        });
    }
};

module.exports = UserActions;
