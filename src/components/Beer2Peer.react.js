'use strict';

var React = require('react');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;
var Styles = require('material-ui').Styles;
var ThemeManager = new Styles.ThemeManager();
var AppCanvas = require('material-ui').AppCanvas;
var Remote = require('ripple-lib').Remote;

var Config = require('../constants/Config');
var LocalConfig = require('../constants/LocalConfig');

var Header = require('./Header.react');

var Beer2Peer = React.createClass({

  //For Material UI
  childContextTypes: {
      muiTheme: React.PropTypes.object
  },

  getChildContext() {
      return {muiTheme: ThemeManager.getCurrentTheme()};
  },

  componentDidMount() {
    var remote = this.remote = new Remote(Config.rippleOptions);

    remote.on('error', function (error) {
      console.log('remote error: ', error);
    });

    remote.connect(function (err, res) {
      if (err) {
        console.log("error connecting", err);
        return;
      }

    });
  },

  onLoggedInUserChanged() {
    // TODO: access user store here
    this.remote.setSecret(LocalConfig.ripple.account, LocalConfig.ripple.secret);
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
