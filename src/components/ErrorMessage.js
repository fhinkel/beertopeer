/**
 * Created by steffen on 6/13/15.
 */

'use strict';

var React = require('react');

var ErrorMessage = React.createClass({
    render: function() {
        if(this.props.message) {
            return (<p><b>{this.props.message}</b></p>);
        } else {
            return (<div></div>);
        }
    }
});

module.exports = ErrorMessage;
