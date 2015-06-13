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
            console.log('found event ', event);

            RippleService.subscribeToTransactionsForEvent(event.recipientRippleAccountId, eventCode, function(newT) {
                console.log('new transaction', newT);

                var ts = that.state.transactions;

                ts.push(newT);

                that.setState({
                        transactions: ts,
                    });
            });
            RippleService.requestTransactionsForEvent(event.recipientRippleAccountId, eventCode, function (success,transactions) {
                if (success) {
                    that.setState({
                            transactions: transactions,
                            loadingState:LoadingState.LOADED
                        });
                }
            });
        });

    },

    getInitialState: function() {
        return {
            transactions: [],
            loadingState: LoadingState.LOADING
        };
    },
    render: function() {
        var transactions = this.state.transactions;
        var transactionList = [];
        for (var i=0; i< transactions.length; i++) {
            transactionList.push(<li><Transaction transaction={transactions[i]} /></li>);
        }
        if (this.state.loadingState === LoadingState.LOADED) {
        return (
            <div>
                <p>{this.props.params.eventCode}</p>
                    {transactionList}
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
