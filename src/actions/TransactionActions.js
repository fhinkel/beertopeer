/**
 * Created by kknauf on 13.06.15.
 */

'use strict';

var TransactionConstants = require('../constants/TransactionsConstants');

var Dispatcher = require('../dispatcher/Beer2PeerDispatcher');

var UserActions = {
    changeEventCode: function(eventCode) {
        Dispatcher.dispatch({
            actionType: TransactionConstants.CHANGE_EVENT_CODE,
            eventCode: eventCode
        });
    },
    addTransaction: function(transaction) {
        Dispatcher.dispatch({
            actionType: TransactionConstants.ADD_TRANSACTION,
            transaction: transaction
        });
    }
};

module.exports = UserActions;
