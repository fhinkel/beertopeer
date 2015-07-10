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
var Footer = require('./Footer.react');

var Login = require('./Login.react');

var RippleService = require('../services/RippleService');

ThemeManager.setTheme(SocialPayTheme);
var Beer2Peer = React.createClass({

    getInitialState: function() {
        return {
            user: UserStore.getUser(),
            balances: []
        };
    },

    componentDidMount: function() {
        UserStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        UserStore.removeChangeListener(this.onChange);
    },

    onChange: function() {
        var user = UserStore.getUser();
        this.setState({user: user});

        if (user.name !== '') {
            this.loadBalances(user);
        }
    },

    loadBalances: function(user) {
        if (user) {
            RippleService.getBalance(user.rippleAccount, this.balanceLoaded);
        }
    },

    balanceLoaded: function(succ, balances) {
        console.log('balance loaded', balances);

        if (!succ) {
            return;
        }

        this.setState({
            balances: balances
        });
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
    var header;
      if (this.state.user.name === '') {
          mainSection = <Login />;
      } else {
          header =  <Header user = {this.state.user} balances={this.state.balances}/>;
          mainSection  = (
                         <div>
                            <RouteHandler />
                          </div>);
      }
      return (
              <div className="centered">
                  {header}
                  <div className='inlineBlock'  id="realContent">
                    {mainSection}
                  </div>
                  <Footer />
              </div>
      );

  }
});

module.exports = Beer2Peer;
