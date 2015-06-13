/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TextField = require('material-ui').TextField;
var RaisedButton = require('material-ui').RaisedButton;
var CodeInput = require('./CodeInput.react');

var $ = require('jquery');

var Join = React.createClass({

    joinEvent(eventCode) {
        var that = this;
            $.ajax({
                method: "GET",
                url: 'http://46.101.128.85:3000/event/'+eventCode,
                dataType: "json",
                async: false,
                success: function(data, status, xhr) {
                    that.context.router.transitionTo('pay', {eventCode: eventCode});
                }
            });
        },
    render: function() {
        return (
            <CodeInput onSubmit={this.joinEvent} />
        );
    }
});

Join.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Join;
