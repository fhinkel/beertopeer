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
            { route: 'query', text: 'Show' }
        ];

        var userText = <span>{this.props.user.name}</span>;

        return(
            <div>
            <AppBar title='Beer2Peer'
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleLeftNav}
                    iconElementRight={userText}
                />
            <LeftNav ref='leftNav' docked={false} menuItems={menuItems} onChange={this.onLeftNavChange}/>
            </div>
    );
    },

    toggleLeftNav: function() {
        this.refs.leftNav.toggle();
    },

    onLeftNavChange: function(e, key, payload) {
        this.context.router.transitionTo(payload.route);
    }

});

Header.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Header;
