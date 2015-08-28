/**
 * Created by kknauf on 10.07.15.
 */

'use strict';

var React = require('react');
var TextField = require('material-ui').TextField;

//var RippleService= require('../services/RippleService');

var USERNAME_REGEX = /^[^\s].{0,32}$/;

var UsernameInput = React.createClass({


    getInitialState: function() {
        return {
            errorText: ''
        };
    },

    isValid: function() {
        return this.getValue().toString().match(USERNAME_REGEX);
    },

    getValue: function() {
        return this.refs.username.getValue();
    },

    validate: function() {
        if (this.isValid()) {
            this.setState({errorText: ''});
        } else {
            this.setState({errorText: 'Invalid Username'});
        }
    },

    render: function() {
        return (
            <TextField
                ref = "username"
                floatingLabelText="Username"
                errorText = {this.state.errorText}
                onKeyUp = {this.validate}
                style={{width: '18em'}}
                />
        );
    }
});

module.exports = UsernameInput;
