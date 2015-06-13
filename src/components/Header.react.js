/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;
var Mui = require('material-ui');

var LeftNav = Mui.LeftNav;
var AppBar = Mui.AppBar;

var Header = React.createClass({

    render: function () {

        var menuItems = [
            { route: 'create', text: 'Create' },
            { route: 'join', text: 'Join' },
            { route: 'show', text: 'Show' }
        ];

        return(
            <div>
            <AppBar title='Title' iconClassNameRight="muidocs-icon-navigation-expand-more" onLeftIconButtonTouchTap={this.toggleLeftNav}/>
            <LeftNav ref='leftNav' docked={false} menuItems={menuItems} />
            </div>
    );
    },

    toggleLeftNav: function() {
        console.log("Left Tap");
        this.refs.leftNav.toggle();
    }

});

module.exports = Header;
