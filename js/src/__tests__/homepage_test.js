/** @jsx React.DOM */
jest.dontMock('../components/rungist.react');
describe('rungist page', function(){
  var React = require('react/addons');
  window.jQuery = require('jquery');
  window.jQuery.setAjaxReturn({result: "hehe"});
  var RunGistPage = require('../components/rungist.react');
  var TestUtils = React.addons.TestUtils;
  var runGistPage = TestUtils.renderIntoDocument(
    <RunGistPage gistid="wang le ai" username="kong nv shen"/>
  );
  it('should render result into DOM', function(){
    var runGistPageElement = TestUtils.findRenderedComponentWithType(runGistPage, RunGistPage);
    expect(runGistPageElement.getDOMNode().querySelector('.ui').innerHTML).toBe("hehe");
  });
});
