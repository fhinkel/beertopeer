/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var CodeInput = require('./CodeInput.react');
var Transaction = require('./Transaction.react');

var RippleService = require('../services/RippleService');
var EventService = require('../services/EventService');
var mui = require('material-ui');
var Paper = mui.Paper;
var ripple = require('ripple-lib');

var Colors = require('material-ui').Styles.Colors;

var {Progress, LoadingState} = require('./Progress.react');

var Table = mui.Table;
var Card = mui.Card;
var CardTitle = mui.CardTitle;
var CardText = mui.CardText;

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
                        loadingState: LoadingState.LOADED,
                        event: event
                    });
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


        if (this.state.loadingState === LoadingState.LOADED) {
            var tableHeaders = {
                senderName: {content: 'Name'},
                amount: {content: 'Amount'},
                status: {content: 'Status'}
            };
            var tableColOrder = ['senderName', 'amount', 'status'];
            var tableData = this.state.transactions.map(function(transaction) {
                return {
                    senderName: {content: transaction.senderName},
                    amount: {content: transaction.amount.to_human({precision: 2, min_precision: 2})+' '+transaction.amount.currency().to_human()},
                    status: {content: '✓'}
                };
            });

            var sumReceived = this.state.transactions.reduce(function(acc, t) {
                return acc.add(t.amount);
            }, ripple.Amount.from_human('0 EUR'));

            var total = ripple.Amount.from_human(this.state.event.totalAmount + ' EUR');
            var remaining = total.subtract(sumReceived);

            var remainingToHuman =  remaining.to_human({precision: 2, min_precision: 2})+' '+remaining.currency().to_human();
            var tableFooter = {
                    senderName: {content: 'Remaining'},
                    amount: {content: remainingToHuman},
                    status: {content: remaining.is_positive() ? ' ' : '✓'}
                };

            return (
                <Card>
                    <CardTitle title={this.props.params.eventCode} className="eventCode"/>
                    <CardTitle subtitle={this.state.event.eventName} />
                    <CardText>
                        <Table
                            headerColumns={tableHeaders}
                            rowData={tableData}
                            columnOrder = {tableColOrder}
                            displayRowCheckbox={false}
                            displaySelectAll={false}
                            footerColumns={tableFooter}
                            />
                    </CardText>
                </Card>
            );
        } else {
            return (
                <Progress message='Loading Transactions...'/>
            );
        }
    }
});

module.exports = Show;
