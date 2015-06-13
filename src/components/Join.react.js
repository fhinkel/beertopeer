/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TextField = require('material-ui').TextField;
var RaisedButton = require('material-ui').RaisedButton;

var $ = require('jquery');

var MIN_NUMBER_OF_CHARACTERS = 5;
var MAX_NUMBER_OF_CHARACTERS = 5;

var Join = React.createClass({

    getInitialState() {
        return {errorText: '' };
    },

    getEventCode() {
      return this.refs.eventCode.getValue().toString().toUpperCase();
    },

    checkCodeFormat(eventCode) {
        console.log('Checking '+ eventCode);
        return eventCode.toString().match(new RegExp('^[A-Z]{'+MIN_NUMBER_OF_CHARACTERS+','+MAX_NUMBER_OF_CHARACTERS+'}$'));
    },

    codeExists(eventCode) {
        $.get('http://46.101.128.85:3000/event/'+eventCode, function(data,status,xhr) {
             return (status === 'success');
        });
    },

    onKeyUp() {
        var eventCode = this.getEventCode();
        if (!this.checkCodeFormat(eventCode)) {
            this.setState( {errorText: MIN_NUMBER_OF_CHARACTERS+'-'+MAX_NUMBER_OF_CHARACTERS+' digits required.'});
        } else if (!this.codeExists(eventCode)) {
            if (this.getEventCode() === eventCode) {
                this.setState( {errorText: "No event with this code exists."});
            } else {
                this.setState( {errorText: ''});
            }
        } else {
            this.setState( {errorText: ''});
        }
    },

    joinEvent() {
        var eventCode = this.getEventCode();
        if (this.checkCodeFormat(eventCode) && this.codeExists(eventCode)) {
            console.log('Joining Event: ' +eventCode);
            this.context.router.transitionTo('pay', {eventCode: eventCode});
        }
    },

    render: function() {
        return (
            <div>
                <form onSubmit={this.joinEvent} >
                <TextField
                    ref = "eventCode"
                    errorText={this.state.errorText}
                    onKeyUp={this.onKeyUp}
                    className = "upperCase"
                    floatingLabelText="Event Code"/>
                <br/>
                <br/>
                <RaisedButton label="Join" primary={true} />
                </form>
            </div>
        );
    }
});

Join.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Join;
