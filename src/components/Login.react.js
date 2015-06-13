/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TextField = require('material-ui').TextField;
var RaisedButton = require('material-ui').RaisedButton;
var Config = require('../constants/Config');
var UserActions = require('../actions/UserActions');

var $ = require('jquery');

var RippleVaultClient = require('ripple-vault-client');
var vc = new RippleVaultClient.VaultClient('rippletrade.com');
var {Progress, LoadingState}  = require('./Progress.react');


var Login = React.createClass({

    getInitialState() {
        return {errorText : '',
                loadingState: LoadingState.LOADED
        };
    },

    login: function() {
        this.setState({ errorText: '',
            loadingState: LoadingState.LOADING});
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();
        vc.loginAndUnlock(username, password, null, function(err, resp) {
            if(!err) {
                this.setState({ errorText: '',
                    loadingState: LoadingState.LOADED});
            } else {
                this.setState({ errorText: err.toString(),
                    loadingState: LoadingState.LOADED});
            }

            console.log(username);
            console.log(password);
            console.log(err);

            UserActions.loginUser(username, resp.secret);
        }.bind(this));
    },

    render: function() {
        var progress;
        if (this.state.loadingState === LoadingState.LOADING) {
            progress = <Progress />;
        }
        return (
            <div>
                <form onSubmit={this.login} >
                    <TextField
                        ref = "username"
                        floatingLabelText="Username"
                        style={{width:'18em'}}/>
                    <br/>
                    <TextField
                        type="password"
                        ref = "password"
                        errorText={this.state.errorText}
                        floatingLabelText="Password"
                        style={{width:'18em'}}/>
                    <br/>
                    <br/>
                    <RaisedButton label='Login' primary={true} />
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
