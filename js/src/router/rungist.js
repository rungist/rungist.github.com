/** @jsx React.DOM */
var React = require('react');
var RunGistPage = require('../components/rungist.react');
module.exports = function(){
  React.renderComponent(
    <RunGistPage username={this.username} gistid={this.gistid}/>,
    document.getElementById('main-container')
  );
};
