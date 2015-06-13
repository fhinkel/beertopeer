/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var CodeInput = require('./CodeInput.react');
var Transaction = require('./Transaction.react');

var RippleService = require('../services/RippleService');
var EventService = require('../services/EventService');

var {Progress, LoadingState} = require('./Progress.react');

var Show = React.createClass({

    componentWillMount: function() {

        var that = this;
        var eventCode = this.props.params.eventCode;

        EventService.queryEvent(eventCode, function(event, status) {
            RippleService.requestTransactionsForEvent(event.recipientRippleAccountId, eventCode, function (success,transactions) {
                if (success) {
                    that.setState({
                            transactions: transactions,
                            loadingState:LoadingState.LOADED,
                            event: event
                        }
                    );
                }
            });
        });

    },

    getInitialState: function() {
        return {
            transactions: [],
            loadingState: LoadingState.LOADING,
            event: {}
        };
    },
    render: function() {
        var transactions = this.state.transactions;
        var transactionList = [];
        for (var i=0; i< transactions.length; i++) {
            transactionList.push(<div><Transaction transaction={transactions[i]} /></div>);
        }
        if (this.state.loadingState === LoadingState.LOADED) {
        return (
            <div>
                <h1>EventCode: {this.props.params.eventCode}</h1>
                <p>
                    {this.state.event.eventName} {this.state.event.totalAmount}
                </p>
                <p>
                    {transactionList}
                </p>
            </div>
        );
        } else {
            return (
                <Progress message = 'Loading Transactions...'/>
            );
        }
    }
});

module.exports = Show;
