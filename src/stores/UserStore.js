/**
 * Created by kknauf on 13.06.15.
 */

'use strict';

var Beer2PeerDispatcher = require('../dispatcher/Beer2PeerDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var UserConstants = require('../constants/UserConstants.js');
var LocalConfig = require('../constants/LocalConfig.js.template');

var CHANGE_EVENT = 'change';

var user = {name: 'Dieter',
            rippleAccount: LocalConfig.ripple.account,
            rippleSecret: LocalConfig.ripple.secret};

function setUser(name, secret) {
    console.log('Setting user...');
    user.name = name;
    user.rippleSecret = secret;
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
        }

    UserStore.emitChange();
    });

module.exports = UserStore;
