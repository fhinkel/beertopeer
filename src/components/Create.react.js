/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var $ = require('jquery');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;
var UserStore = require('../stores/UserStore');
var Config = require('../constants/Config');


var Create = React.createClass({

    onClickCreate: function () {

        var data = {
            eventName: this.refs.name.getValue(),
            totalAmount: this.refs.totalAmount.getValue(),
            currency: "EUR",
            recipientRippleAccountId: UserStore.getUser().rippleAccount,
            recipientUserName: UserStore.getUser().name
        };
        let url = Config.serverOptions.url + '/event';
        $.post(url, data, function (data, status) {
            var eventCode = data.eventCode;
            console.log("id for new event is " + eventCode);
            this.context.router.transitionTo('show', {eventCode: eventCode});
        }.bind(this));
    },

    render: function () {
        return (
            <div>
                <h1>Request group payments</h1>

                <TextField ref="name" defaultValue="Event name" />
                <br/>
                <TextField ref="totalAmount" defaultValue="0,00" />
                <br/>
                <RaisedButton label="Create" primary={true} onClick={this.onClickCreate}/>
            </div>
        );
    }
});

Create.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Create;
