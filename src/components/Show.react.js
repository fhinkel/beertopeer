/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TransactionsStore = require('../stores/TransactionsStore');
var CodeInput = require('./CodeInput.react');
var TransactionsActions = require('../actions/TransactionActions');

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

    eventCodeSelected() {
        TransactionsActions.changeEventCode();
    },

    render: function() {
        return (
            <CodeInput onSubmit={this.eventCodeSelected}/>
        );
    }


});

module.exports = Show;
