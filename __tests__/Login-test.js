
jest.dontMock('../src/components/Login.react');

describe('Login page', function() {
    it('should have correct loading state', function() {
        var React = require('react/addons');
        var Login = require('../src/components/Login.react.js');
        var TestUtils = React.addons.TestUtils;

        expect("hello").toBe("world");

    });

});
