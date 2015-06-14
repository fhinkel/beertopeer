/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;
var Mui = require('material-ui');

var {Colors, Spacing, Typography} = Mui.Styles;

var LeftNav = Mui.LeftNav;
var AppBar = Mui.AppBar;
var Tabs = Mui.Tabs;
var Tab = Mui.Tab;

var UserActions = require('../actions/UserActions');

var Header = React.createClass({

    render: function () {

        var menuItems = [];

        if (this.props.user.name !== '') {
            menuItems.push({ route:'join', text: 'Logout' });
        } else {
            menuItems.push({ route:'join', text: 'Login' });
        }

        var headerStyles  = {
                cursor: 'pointer',
                //.mui-font-style-headline
                fontSize: '24px',
                color: Typography.textFullWhite,
                lineHeight: Spacing.desktopKeylineIncrement + 'px',
                fontWeight: Typography.fontWeightLight,
                backgroundColor: Colors.cyan500,
                paddingLeft: Spacing.desktopGutter,
                paddingTop: '0px',
                marginBottom: '8px'
            };

        var header = (
                <div style={headerStyles}>
                    {this.props.user.name}
                </div>
            );

        return(
            <div>
            <AppBar title='PeerPay'
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleLeftNav}
                />
            <LeftNav ref='leftNav' docked={false} menuItems={menuItems} onChange={this.onLeftNavChange} header = {header} />
            <Tabs>
                <Tab label="Join" route="join" onActive={this._onActive} />
                <Tab label="Request" route="create" onActive={this._onActive} />
                <Tab label="History" route="query" onActive={this._onActive} />
            </Tabs>
            </div>
    );
    },

    toggleLeftNav: function() {
        this.refs.leftNav.toggle();
    },

    onLeftNavChange: function(e, key, payload) {
        UserActions.logout();
        this.context.router.transitionTo(payload.route);
    },

    _onActive: function(tab){
        this.context.router.transitionTo(tab.props.route);
    }

});

Header.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Header;
