'use strict';

var React = require('react');
var $ = require('jquery');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;

var Home = React.createClass({

    onClickShow: function () {
        this.context.router.transitionTo("show")
    },
    onClickCreate: function () {
        this.context.router.transitionTo("create")
    },
    onClickJoin: function () {
        this.context.router.transitionTo("join")
    },

    render: function () {
        return (
            <div>
                <RaisedButton label="Show my requests" primary={true} onClick={this.onClickShow} style={{width:'20em'}}/><br/><br/>
                <RaisedButton label="Request group payment" primary={true} onClick={this.onClickCreate} style={{width:'20em'}}/><br/><br/>
                <RaisedButton label="Join group payment" primary={true} onClick={this.onClickJoin} style={{width:'20em'}}/><br/><br/>
            </div>
        );
    }
});

Home.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Home;
