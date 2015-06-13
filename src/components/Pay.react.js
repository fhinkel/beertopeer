/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var $ = require('jquery');
var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var CircularProgress = mui.CircularProgress;
var RippleService = require('../services/RippleService');
var keyMirror = require('keymirror');
var Config = require('../constants/Config');

var UserStore = require('../stores/UserStore');

var ripple = require('ripple-lib');

var LoadingState = keyMirror({
    LOADING: null,
    LOADED: null
});

var ErrorMessage = React.createClass({
    render: function() {
        if(this.props.message) {
            return (<p><b>{this.props.message}</b></p>);
        } else {
            return (<div></div>);
        }
    }
});

var Pay = React.createClass({
    getInitialState: function() {
        return {
            loadingState: LoadingState.LOADING,
            loadingMessage: 'Retrieving event from server...'
        };
    },

    onClickPayButton: function() {
        var user = UserStore.getUser();

        var amount = this.refs.amountField.getValue().replace(',', '.');

        var rippleAmount = ripple.Amount.from_human(amount + ' ' + this.state.currency);

        this.setState({
            loadingState: LoadingState.LOADING,
            loadingMessage: 'Transaction ongoing...'
        });

        RippleService.pay(user.name, user.rippleSecret, this.state.targetRippleAccountId, rippleAmount, this.props.params.eventCode, function (success) {
            console.log('payment result ' + success);
            if(!success) {
                this.context.router.transitionTo('pay', {eventCode: this.props.eventCode, errorMessage: "Payment failed! Try again?"});
            } else {
                this.context.router.transitionTo('show', {eventCode: this.props.eventCode});
            }
        }.bind(this));

    },

    componentDidMount: function() {
        $.get( Config.serverOptions.url + '/event/'+ this.props.params.eventCode, function(data, status) {
            this.setState({
                eventName: data.eventName,
                totalAmount: data.amount,
                currency: data.currency,
                targetRippleAccountId: data.senderAddress,
                eventCreator: data.senderNickname
            });
        }.bind(this));
        this.setLoadedState();
    },

    setLoadedState: function() {
        this.setState({loadingState: LoadingState.LOADED});
    },

    render: function() {
        if(this.state.loadingState === LoadingState.LOADING) {
            return (<div>
                <p>{this.state.loadingMessage}</p>
                <CircularProgress mode = "indeterminate" size={2}/>
            </div>);
        } else {
            return (
                <div>
                    <h1>Contribute to {this.state.eventname}</h1>

                    <ErrorMessage message={this.props.errorMessage}/>
                    <p>{this.state.eventCreator} has requested {this.state.totalAmount} {this.state.currency} from the group.</p>
                    <div>
                        <TextField ref="amountField"
                                   defaultValue="0,00"
                                   className="text-field-text-right"
                                   style={{width:'5em'}}
                            />
                        <span>&nbsp;&nbsp;EUR&nbsp;&nbsp;&nbsp;</span>

                        <RaisedButton label="Pay!"
                                      primary={true}
                                      onClick={this.onClickPayButton}/>
                    </div>
                </div>
            );
        }
    }
});

Pay.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Pay;
