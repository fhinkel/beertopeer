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

var UserStore = require('../stores/UserStore');

var Header = require('./Header.react');

var Beer2Peer = React.createClass({

    getInitialState: function() {
        return  {user: UserStore.getUser()} ;
    },

    componentDidMount: function() {
        this.connectToRemote();
        UserStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this.onChange);
    },

    onChange: function() {
        this.setState( {user: UserStore.getUser()});
        this.onLoggedInUserChanged();
    },

    //For Material UI
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

  getChildContext() {
      return {muiTheme: ThemeManager.getCurrentTheme()};
  },

  connectToRemote() {
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
    this.remote.setSecret(this.state.user.name, this.state.user.secret);
  },

  render: function() {
    return (
        <AppCanvas>
            <Header user = {this.state.user} />
            <RouteHandler />
        </AppCanvas>
    );
  }
});

module.exports = Beer2Peer;
