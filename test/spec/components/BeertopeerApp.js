'use strict';

describe('BeertopeerApp', function () {
  var React = require('react/addons');
  var BeertopeerApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    BeertopeerApp = require('components/BeertopeerApp.js');
    component = React.createElement(BeertopeerApp);
  });

  it('should create a new instance of BeertopeerApp', function () {
    expect(component).toBeDefined();
  });
});
