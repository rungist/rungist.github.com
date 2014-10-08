/** @jsx React.DOM */

var CODEBLOCK = {
  sh: "curl -H \"Content-Type: application/json\" -d  '{ \"your_parameter_key\": \"your_value_here\" }' GISTURL",
  javascript:"$.ajax({\n  url: \"GISTURL\",\n  type: \"POST\",\n  data: { base_url: \"your_value_here\"},\n  crossDomain: true\n}).done(function(response){\n  console.log(response);\n});",
  ruby:"require 'rest_client'\n response = RestClient.post 'GISTURL', { :base_url => \"asdf\" }"
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
    var codeblock = document.querySelector('.apiwidget .codeblock');
    editor = ace.edit(codeblock);
    editorSession = editor.getSession();

    editor.setTheme('ace/theme/github');
    editor.setShowPrintMargin(false);
    editor.setReadOnly(true);
    editor.renderer.setShowGutter(false);
    editor.setHighlightActiveLine(false);
    editorSession.setMode('ace/mode/' + this.state.language);
    editorSession.setUseWrapMode(true);
    editorSession.setTabSize(2);
    editorSession.setUseSoftTabs(true);

    codeHeight = editorSession.getScreenLength() * editor.renderer.lineHeight;
    codeblock.style.height = codeHeight + 'px';
    editor.resize();
  },

  render: function(){
    var codeblocks = ['sh','javascript','ruby'].map((language)=>{
      return (
        <div className={(language==this.state.language)?"":"hidden" + " codeblock"}>
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
