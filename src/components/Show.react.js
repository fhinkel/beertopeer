/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TransactionsStore = require('../stores/TransactionsStore');
var CodeInput = require('./CodeInput.react');
var TransactionsActions = require('../actions/TransactionActions');
var Transaction = require('./Transaction.react');

var Show = React.createClass({

    componentDidMount: function() {
        TransactionsStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        TransactionsStore.removeChangeListener(this.onChange);
    },

    getInitialState: function() {
        return {
            eventCode: TransactionsStore.getCurrentEventCode(),
            transactions: TransactionsStore.getAllTransactions()
        };
    },

    onChange: function () {
        this.setState( {
            eventCode: TransactionsStore.getCurrentEventCode(),
            transactions: TransactionsStore.getAllTransactions()
        });
    },

    eventCodeSelected(eventCode) {
        TransactionsActions.changeEventCode(eventCode);
    },

    render: function() {
        var transactions = this.state.transactions;
        var transactionList = [];
        for (var i=0; i< transactions.length; i++) {
            transactionList.push(<li><Transaction transaction={transactions[i]} /></li>);
        }
        return (
            <div>
                <ul>
                    {transactionList}
                </ul>
                <CodeInput onSubmit={this.eventCodeSelected} label="Show"/>
            </div>
        );
    }
});

module.exports = Show;
