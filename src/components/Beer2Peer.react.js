'use strict';

var React = require('react');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;
var Styles = require('material-ui').Styles;
var ThemeManager = new Styles.ThemeManager();
var AppCanvas = require('material-ui').AppCanvas;

var Header = require('./Header.react');

var Beer2Peer = React.createClass({

    //For Material UI
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext() {
        return {muiTheme: ThemeManager.getCurrentTheme()};
    },

  render: function() {
    return (
        <AppCanvas>
            <Header />
            <RouteHandler />
        </AppCanvas>
    );
  }
});

module.exports = Beer2Peer;
