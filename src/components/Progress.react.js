'use strict';

var React = require('react');
var mui = require('material-ui');
var CircularProgress = mui.CircularProgress;
var keyMirror = require('keymirror');

var LoadingState = keyMirror({
    LOADING: null,
    LOADED: null
});

var Progress = React.createClass({
    render: function() {
            return (
                <div>
                    <p>{this.props.message}</p>
                    <CircularProgress mode = "indeterminate" />
                </div>
            );
    }
});

module.exports = {Progress: Progress, LoadingState: LoadingState};
