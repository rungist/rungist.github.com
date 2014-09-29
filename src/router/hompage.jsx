var React = require('react');
var HomePage = require('./components/homepage.js');
exports.renderHomepage = function(){
  React.renderComponent(
      <HomePage/>,
      document.querySelector('main')
  )
}