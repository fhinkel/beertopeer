/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');

var UserAction = require('../actions/UserActions');

var Create = React.createClass({

    onClick: function() {
        console.log('onClick');
        UserAction.loginUser("something else", "somekey");
    },

    render: function() {
        return (
            <button onClick={this.onClick}>Change User</button>
        );
    }
});

module.exports = Create;
