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
var Tabs = Mui.Tabs;
var Tab = Mui.Tab;

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
            <AppBar title='PeerPay'
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleLeftNav}
                    iconElementRight={userText}
                />
            <LeftNav ref='leftNav' docked={false} menuItems={menuItems} onChange={this.onLeftNavChange}/>
            <Tabs>
                <Tab label="Join payment" route="join" onActive={this._onActive} />
                <Tab label="Request payment" route="create" onActive={this._onActive} />
                <Tab label="My requests" route="query" onActive={this._onActive} />
            </Tabs>
            </div>
    );
    },

    toggleLeftNav: function() {
        this.refs.leftNav.toggle();
    },

    onLeftNavChange: function(e, key, payload) {
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
