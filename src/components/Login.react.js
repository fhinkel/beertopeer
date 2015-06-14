/**
 * Created by kknauf on 13.06.15.
 */
'use strict';

var React = require('react');
var TextField = require('material-ui').TextField;
var RaisedButton = require('material-ui').RaisedButton;
var UserActions = require('../actions/UserActions');

var $ = require('jquery');

var RippleVaultClient = require('ripple-vault-client');
var vc = new RippleVaultClient.VaultClient('rippletrade.com');

var Login = React.createClass({

    login: function () {
        var username = this.refs.username.getValue();
        var password = this.refs.password.getValue();
        vc.loginAndUnlock(username, password, null, function (err, resp) {
            console.log(username);
            console.log(password);
            UserActions.loginUser(username, resp.secret);
        });
    },

    render: function () {
        return (
            <div>
                <form onSubmit={this.login} >
                    <img src="http://blitzpay.biz/images/logo.png" width="200"></img>
                    <br/>
                        <TextField
                            ref = "username"
                            floatingLabelText="Username"
                            style={{width: '12em'}}/>
                        <br/>
                        <TextField
                            type="password"
                            ref = "password"
                            floatingLabelText="Password"
                            style={{width: '12em'}}/>
                        <br/>
                        <RaisedButton label='Login' primary={true} />
                    </form>
                </div>
                );
                }
                });

                Login.contextTypes = {
                router: React.PropTypes.func
                };

                module.exports = Login;
