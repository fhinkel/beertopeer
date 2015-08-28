jest.dontMock('../src/components/Login.react');
jest.dontMock('keymirror');
jest.dontMock('../src/components/LoadingState');

describe('Login page', function () {
    it('should have correct loading state', function () {
        var React = require('react/addons');
        var Login = require('../src/components/Login.react');
        var TestUtils = React.addons.TestUtils;

        var LoadingState = require('../src/components/LoadingState.js');
        //console.log('LoadingState inside test: ');
        //console.log(keyMirror);
        //console.dir(LoadingState);
        var Progress = React.createClass({
            render: function () {
                return (<div />);
            }
        }); //require('../src/components/Progress.react');
        var RaisedButton = React.createClass({
            render: function () {
                return (<div />);
            }
        });
        //require('material-ui').RaisedButton;
        var Config = require('../src/constants/Config');
        var UserActions = {}; //require('../src/actions/UserActions');
        var UsernameInput = React.createClass({
            render: function () {
                return (<div />);
            }
        }); //require('../src/components/UsernameInput');
        //console.dir(UsernameInput);
        //
        //UsernameInput = React.addons.cloneWithProps(UsernameInput, {
        //    ref: "usernameInput"
        //});
        //console.dir(UsernameInput);

        var RippleSecretInput = React.createClass({
            render: function () {
                return (<div />);
            }
        });

        var login = TestUtils.renderIntoDocument(
            <Login
                LoadingState={LoadingState}
                Config={Config}
                UserActions={UserActions}
                >
                <RippleSecretInput />
                <Progress />
                <RaisedButton />
                <UsernameInput />
            </Login>
        );

        expect(login.state.loadingState).toBe('LOADED');

        expect("hello").toBe("hello");

    });

});
