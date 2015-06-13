'use strict';

var React = require('react');
var Router = require('react-router');
var {Route, RouteHandler, Link } = Router;
var Styles = require('material-ui').Styles;
var ThemeManager = new Styles.ThemeManager();
var AppCanvas = require('material-ui').AppCanvas;

var UserStore = require('../stores/UserStore');

var Header = require('./Header.react');

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
    return (
        <AppCanvas>
            <Header user = {this.state.user} />

            <div className='mui-app-content-canvas'>
                <RouteHandler />
            </div>
        </AppCanvas>
    );
  }
});

module.exports = Beer2Peer;
