/** @jsx React.DOM */
var $ = window.jQuery;
var aceHighlighter = require('../utils/ace')
var CODEBLOCK = {
  sh: "curl -H \"Content-Type: application/json\" -d  '{ \"your_parameter_key\": \"your_value_here\" }' GISTURL",
  javascript:"$.ajax({\n  url: \"GISTURL\",\n  type: \"POST\",\n  data: { your_parameter_key: \"your_value_here\"},\n  crossDomain: true\n}).done(function(response){\n  console.log(response);\n});",
  ruby:"require 'rest_client'\nresponse = RestClient.post 'GISTURL', { :your_parameter_key => \"your_value_here\" }"
}
var $ = window.jQuery
var React = require('react');
var APIWidget = React.createClass({
  getInitialState: function(){
    return {
      loading: true,
      error: false,
      language: 'sh',
      codeblock: CODEBLOCK['sh'],
      url: "http://gist.github.com.au/" + this.props.username +'/' + this.props.gistid
    }
  },
  changeTab: function(e){
    var currentTab = $(e.currentTarget)
    currentTab.addClass("active");
    currentTab.siblings().removeClass("active");
    this.setState({
      language: currentTab.data('tab'),
      codeblock: CODEBLOCK[currentTab.data('tab')]
    })
  },
  componentDidUpdate: function(){
    var codeblocks = $('.apiwidget .codeblock');
    codeblocks.each((_,codeblock)=>{
      aceHighlighter(codeblock, codeblock.dataset.language)
    })
  },

  render: function(){
    var codeblocks = ['sh','javascript','ruby'].map((language)=>{
      return (
        <div className={"codeblock " + (language==this.state.language?"":"hidden")} data-language={language}>
          {CODEBLOCK[language].replace('GISTURL',this.state.url)}
        </div>
      );
    })
    return (
	    <div className="six wide right column">
				<div className="ui menu">
			    <a className="gray item active" data-tab="sh" onClick={this.changeTab}>CURL</a>
			    <a className="green item" data-tab="javascript" onClick={this.changeTab}>jQuery</a>
			    <a className="red item" data-tab="ruby" onClick={this.changeTab}>Ruby</a>
			  </div>
        <div className="ui segment apiwidget">
          {codeblocks}
        </div>
			</div>
    )
  }
});
module.exports=APIWidget;
