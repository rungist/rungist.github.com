/** @jsx React.DOM */
var React = require('react');
var HomePage = require('../components/homepage.react');
module.exports = function(){
  React.renderComponent(
      <HomePage/>,
      document.getElementById('main-container')
  );
};
