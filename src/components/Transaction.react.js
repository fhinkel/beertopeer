/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');

var Transaction = React.createClass({

    render: function () {
        var transaction = this.props.transaction;
        return (
            <div>
                <div>{transaction.senderName}</div>
                <div className="right"> - {transaction.amount.to_human({precision: 2})}</div>
            </div>
        );
    }
});

module.exports = Transaction;
