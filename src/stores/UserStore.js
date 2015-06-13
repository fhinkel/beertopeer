/**
 * Created by kknauf on 13.06.15.
 */

'use strict';

var Beer2PeerDispatcher = require('../dispatcher/Beer2PeerDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UserConstants = require('../constants/UserConstants.js');
var LocalConfig = require('../constants/LocalConfig.js');

var RippleService = require('../services/RippleService');

var CHANGE_EVENT = 'change';

var user = {name: '',
            rippleAccount:'',
            rippleSecret: ''};

function setUser(name, secret) {
    console.log('Logging in...');
    user.name = name;
    user.rippleSecret = secret;
    user.rippleAccount = RippleService.getAccountFromSecret(secret);
}

function logout() {
    console.log('Logging out...');
    user.name = '';
    user.rippleSecret = '';
    user.rippleAccount = '';
}

var UserStore = assign({}, EventEmitter.prototype, {

    /**
     * Get the entire collection of TODOs.
     * @return {object}
     */
    getUser: function() {
        return user;
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
            case UserConstants.USER_CREATE_WITH_SECRET:
                username = action.username.trim();
                secret = action.secret.trim();
                setUser(username, secret);
                break;
            case UserConstants.USER_LOGOUT:
                logout();
                break;
        }

    UserStore.emitChange();
    });

module.exports = UserStore;
