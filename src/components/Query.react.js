/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var CodeInput = require('./CodeInput.react');

var Query = React.createClass({

    eventCodeSelected(eventCode) {
        this.context.router.transitionTo('show', {eventCode: eventCode});
    },

    render: function() {
        return (
            <div>
                <CodeInput onSubmit={this.eventCodeSelected} label="Show"/>
            </div>
        );
    },
    contextTypes: {
        router: React.PropTypes.func
    }
});

module.exports = Query;
