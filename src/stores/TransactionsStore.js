/**
 * Created by kknauf on 13.06.15.
 */

'use strict';

var Beer2PeerDispatcher = require('../dispatcher/Beer2PeerDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var TransactionsConstants = require('../constants/TransactionsConstants.js');

var RippleService = require('../services/RippleService');

var CHANGE_EVENTCODE = 'changeEventCode';
var CHANGE_TRANSACTIONS = 'changeTransactions';

var eventCode = "";

var transactions = [];

function setEventCode(newEventCode) {
    eventCode = newEventCode;
    transactions = [];
}

function addTransaction(transaction) {
   transactions.push(transaction);
}

function setTransactions(newTransactions) {
    transactions =  newTransactions;
}

var TransactionsStore = assign({}, EventEmitter.prototype, {

    getCurrentEventCode: function() {
        return eventCode;
    },

    getAllTransactions: function() {
        return transactions;
    },

    emitChangeEventCode: function() {
        this.emit(CHANGE_EVENTCODE);
        this.emit(CHANGE_TRANSACTIONS);
    },

    emitChangeTransactions: function() {
        this.emit(CHANGE_TRANSACTIONS);
    },

    addChangeEventCodeListener: function(callback) {
        this.on(CHANGE_EVENTCODE, callback);
    },

    removeChangeEventCodeListener: function(callback) {
        this.removeListener(CHANGE_EVENTCODE, callback);
    },
    addChangeTransactionListener: function(callback) {
        this.on(CHANGE_TRANSACTIONS, callback);
    },

    removeChangeTransactionListener: function(callback) {
        this.removeListener(CHANGE_TRANSACTIONS, callback);
    }
});

Beer2PeerDispatcher.register(function(action) {
    switch(action.actionType) {
        case TransactionsConstants.CHANGE_EVENT_CODE:
            console.log('Setting Event Code...');
            setEventCode(action.eventCode);
            break;
        case TransactionsConstants.ADD_TRANSACTION:
            addTransaction(action.transaction);
            break;
    }
    TransactionsStore.emitChange();
});

module.exports = TransactionsStore;
