/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');

var Transaction = React.createClass({

    render: function() {
        var transaction = this.props.transaction;
        return (
            <div>
            <span>{transaction.amount.to_human({precision: 2})}</span>
            <span> from </span>
            <span>{transaction.senderName}</span>
            </div>
        );
    }
});

module.exports = Transaction;
