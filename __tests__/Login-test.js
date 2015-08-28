
jest.dontMock('../src/components/Login.react');

describe('Login page', function() {
    it('should have correct loading state', function() {
        var React = require('react/addons');
        var Login = require('../src/components/Login.react.js');
        var TestUtils = React.addons.TestUtils;

        //Login.getInitialState();
        var rippleSecretInput = {};
        var login = TestUtils.renderIntoDocument(
            <Login>
                {rippleSecretInput}
            </Login>
        );

        expect(login.state.loadingState).toBe('hello');

        expect("hello").toBe("hello");

    });

});
