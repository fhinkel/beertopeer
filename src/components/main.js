'use strict';

var BeertopeerApp = require('./BeertopeerApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={BeertopeerApp}>
    <Route name="/" handler={BeertopeerApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
