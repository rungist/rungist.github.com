/** @jsx React.DOM */
var React = require('react');
var RunGistPage = require('../components/rungist.react');
module.exports = function(){
  React.renderComponent(
      <RunGistPage/>,
      document.getElementById('main-container')
  );
};
