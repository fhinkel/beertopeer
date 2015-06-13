/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var RaisedButton = require('material-ui').RaisedButton;

var UserAction = require('../actions/UserActions');

var Create = React.createClass({

    onClick: function() {
        console.log('onClick');
        alert ("click");
        UserAction.loginUser("something else", "somekey");
    },

    render: function() {
        return (
        <RaisedButton label="Change User" primary={true} onClick={this.onClick} />
        );
    }
});

module.exports = Create;
