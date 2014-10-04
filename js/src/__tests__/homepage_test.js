/** @jsx React.DOM */
jest.dontMock('../components/homepage.react');
describe('homepage', function(){
  var React = require('react/addons');
  var HomePage = require('../components/homepage');
  var TestUtils = React.addons.TestUtils;
  var homepage = TestUtils.renderIntoDocument(
    <HomePage/>
  );
  it('should render homepage into DOM', function(){
    var homePageElement = TestUtils.findRenderedComponentWithType(homepage, HomePage);
    expect(homePageElement.getDOMNode().id).toBe("homepage");
  });
});
