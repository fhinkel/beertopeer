/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var $ = require('jquery');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;

var UserAction = require('../actions/UserActions');

var Create = React.createClass({

    onClickCreate: function() {
        // TODO
    },

    render: function() {
        return (
        <div>
            <TextField defaultValue="Event name" />
            <br/>
            <TextField defaultValue="0,00" />
            <br/>
            <RaisedButton label="Create" primary={true} onClick={this.onClickCreate}/>
        </div>
        );
    }
});

module.exports = Create;
