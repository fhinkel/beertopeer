'use strict';

var React = require('react');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;
var Styles = require('material-ui').Styles;
var ThemeManager = new Styles.ThemeManager();
var AppCanvas = require('material-ui').AppCanvas;
var SocialPayTheme = require('../themes/socialPayTheme');

var UserStore = require('../stores/UserStore');

var Header = require('./Header.react');

var Login = require('./Login.react');

ThemeManager.setTheme(SocialPayTheme);
var Beer2Peer = React.createClass({

    getInitialState: function() {
        return  {user: UserStore.getUser()} ;
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this.onChange);
    },

    onChange: function() {
        this.setState( {user: UserStore.getUser()});
    },

    //For Material UI
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

  getChildContext() {
      return {muiTheme: ThemeManager.getCurrentTheme()};
  },

  render: function() {

    var mainSection;

      if (this.state.user.name === '') {
          mainSection =  <Login />;
      } else {
          mainSection =  <RouteHandler />;
      }
    return (
        <AppCanvas>
            <Header user = {this.state.user} />
            <div className='mui-app-content-canvas'>
                {mainSection}
            </div>
        </AppCanvas>
    );
  }
});

module.exports = Beer2Peer;
