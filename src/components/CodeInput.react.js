/**
 * Created by kknauf on 13.06.15.
 */

/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TextField = require('material-ui').TextField;
var RaisedButton = require('material-ui').RaisedButton;
var Config = require('../constants/Config');

var $ = require('jquery');

var MIN_NUMBER_OF_CHARACTERS = 5;
var MAX_NUMBER_OF_CHARACTERS = 5;

var CodeInput = React.createClass({

    getInitialState() {
        return {errorText: '' };
    },

    getEventCode() {
        return this.refs.eventCode.getValue().toString().toUpperCase();
    },

    checkCodeFormat(eventCode) {
        console.log('Checking Format'+ eventCode);
        return eventCode.toString().match(new RegExp('^[A-Z]{'+MIN_NUMBER_OF_CHARACTERS+','+MAX_NUMBER_OF_CHARACTERS+'}$'));
    },

    codeExists(eventCode) {
        var codeExists;
        var that = this;
        console.log('Checking Code Existence '+ eventCode);
        $.ajax({
            method: "GET",
            url: Config.serverOptions.url + '/event/'+eventCode,
            dataType: "json",
            error: function(xhr, status, error) { if (that.getEventCode() === eventCode) {
                that.setState( {errorText: 'No event with this code exists.'});
            } },
            success: function(data, status, xhr) { if (that.getEventCode() === eventCode) {
                that.setState( {errorText: ''});
            } }
        });
    },

    onKeyUp() {
        var eventCode = this.getEventCode();
        if (!this.checkCodeFormat(eventCode)) {
            this.setState( {errorText: MIN_NUMBER_OF_CHARACTERS+'-'+MAX_NUMBER_OF_CHARACTERS+' digits required.'});
        } else {
            this.setState( {errorText: ''});
            this.codeExists(eventCode);
        }
    },

    onSubmit() {
        var eventCode = this.getEventCode();
        if (this.checkCodeFormat(eventCode)) {
            this.props.onSubmit(eventCode);
        }
    },

    render: function() {
        return (
            <div>
                <form onSubmit={this.onSubmit} >
                    <TextField
                        ref = "eventCode"
                        errorText={this.state.errorText}
                        onKeyUp={this.onKeyUp}
                        className = "upperCase eventInput"
                        floatingLabelText="Event Code"
                        style={{width:'12em'}}/>
                    <br />
                    <br />
                    <RaisedButton label={this.props.label} primary={true} />
                </form>
            </div>
        );
    }
});

CodeInput.contextTypes = {
    router: React.PropTypes.func
};

module.exports = CodeInput;

