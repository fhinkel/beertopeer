/**
 * Created by kknauf on 13.06.15.
 */

'use strict';

var Config = require('../constants/Config');
var $ = require('jquery');

var EventService = {
    queryEvent: function(eventCode, callback) {
        $.get( Config.serverOptions.url + ':' + Config.serverOptions.port + '/event/'+ eventCode, callback);
    }
};

module.exports = EventService;
