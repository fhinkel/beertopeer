
jest.dontMock('../src/components/Login.react');

describe('Login page', function() {
    it('should have correct loading state', function() {
        var React = require('react/addons');
        var Login = require('../src/components/Login.react.js');
        var TestUtils = React.addons.TestUtils;

        var foo = require('../src/components/Progress.react');
        var loadingState = foo.LoadingState;

        var rippleSecretInput = {};
        var login = TestUtils.renderIntoDocument(
            <Login loadingState={loadingState}>
                {rippleSecretInput}
            </Login>
        );

        expect(login.state.loadingState).toBe('hello');

        expect("hello").toBe("hello");

    });

});
