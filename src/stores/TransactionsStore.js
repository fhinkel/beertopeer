/**
 * Created by kknauf on 13.06.15.
 */

'use strict';

var Beer2PeerDispatcher = require('../dispatcher/Beer2PeerDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var TransactionsConstants = require('../constants/TransactionsConstants.js');

var RippleService = require('../services/RippleService');

var CHANGE_EVENT = 'change';

var eventCode = "";

var transactions = [];

function setEventCode(newEventCode) {
    console.log('Setting Event Code...');
    eventCode = newEventCode;
    transactions = [];
}

function addTransaction(transaction) {
   transactions.push(transaction);
}

var TransactionsStore = assign({}, EventEmitter.prototype, {

    getCurrentEventCode: function() {
        return eventCode;
    },

    getAllTransactions: function() {
        return eventCode;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
});

Beer2PeerDispatcher.register(function(action) {
    var username, secret, account;
    switch(action.actionType) {
        case TransactionsConstants.CHANGE_EVENT_CODE:
            username = action.username.trim();
            secret = action.secret.trim();
            setEventCode(username, secret);
            break;
        case TransactionsConstants.ADD_TRANSACTION:
            addTransaction(action.transaction);
            break;
    }
    TransactionsStore.emitChange();
});

module.exports = TransactionsStore;
