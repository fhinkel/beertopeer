/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var mui = require('material-ui');
var CircularProgress = mui.CircularProgress;
var keyMirror = require('keymirror');

var LoadingState = keyMirror({
    LOADING: null,
    LOADED: null
});

var NavBarHeader = React.createClass({

    render: function() {
        return (<div>
        <div>Username:</div>
        <div>{this.props.username}</div>
        </div>);
    }
});

module.exports =  NavBarHeader;
