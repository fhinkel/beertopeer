/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TextField = require('material-ui').TextField;
var RaisedButton = require('material-ui').RaisedButton;
var UserActions = require('../actions/UserActions');
var Config = require('../constants/Config');
var RippleSecretInput = require('./RippleSecretInput');
var UsernameInput = require('./UsernameInput');


var $ = require('jquery');

var {Progress, LoadingState}  = require('./Progress.react');


var Login = React.createClass({

    getInitialState() {
        return {
                loadingState: LoadingState.LOADED
        };
    },

    login: function(e) {
        e.preventDefault();
        this.refs.usernameInput.validate();
        this.refs.rippleSecretInput.validate();
        if (this.refs.rippleSecretInput.isValid() && this.refs.usernameInput.isValid()) {
            this.setState({
                loadingState: LoadingState.LOADING
            });
            var username = this.refs.usernameInput.getValue();
            var secret = this.refs.rippleSecretInput.getValue();
            UserActions.loginUser(username, secret);
        }
    },

    render: function() {

        var style= {
            fontSize: "80%",
            color: "#757575"
        };

        var progress;

        if (this.state.loadingState === LoadingState.LOADING) {
            progress =  <Progress />;
        } else {
            progress = <span style={style}><p>Login with your any name and your Ripple secret.</p></span>;
        }

        return (
            <div>
                <img src={Config.serverOptions.url + "/images/logo.png"} width="100" style={{paddingTop: "50px"}}></img>
                <form onSubmit={this.login} >
                    <UsernameInput ref="usernameInput" />
                    <br />
                    <RippleSecretInput ref="rippleSecretInput" />
                    <br/>
                    <br/>
                    <RaisedButton type="submit" label='Login' primary={true} />
                    {progress}
                </form>
                </div>
        );
    }
});

Login.contextTypes = {
    router: React.PropTypes.func
};

module.exports = Login;
