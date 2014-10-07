/** @jsx React.DOM */
var $ = window.jQuery;
var React = require('react');
var MetaData = require('./metadata.react')
var RunGistPage = React.createClass({
  getInitialState: function(){
    return {
      loading: true,
      error: false,
      result: "hoho",
    }
  },
  componentDidMount: function(){
    if (this.isMounted()) {
      $.ajax({
        url:"http://gist.github.com.ru/"+this.props.username +'/' + this.props.gistid,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true
      }).then((data)=>{
        if((!data.error) && data.result){
          this.setState(data)
        }else{
          this.setState({
            error:true
          })
        }
      })
    }
  },
  componentDidUpdate: function(){
    var codeblock = document.querySelector('.codeblock');
    editor = ace.edit(codeblock);
    editorSession = editor.getSession();

    editor.setTheme('ace/theme/github');
    editor.setShowPrintMargin(false);
    editor.setReadOnly(true);
    editor.renderer.setShowGutter(false);
    editor.setHighlightActiveLine(false);
    editorSession.setMode('ace/mode/javascript');
    editorSession.setUseWrapMode(true);
    editorSession.setTabSize(2);
    editorSession.setUseSoftTabs(true);

    codeHeight = editorSession.getScreenLength() * editor.renderer.lineHeight;
    codeblock.style.height = codeHeight + 'px';
    editor.resize();
  },
  render: function(){
    return (
        <div className="ui grid">
          <div className="ten wide column">
            <MetaData gistid={this.props.gistid} username={this.props.username}/>
            <div className="ui segment">
              <div className="codeblock" id="editor">
                {JSON.stringify(this.state.result)}
              </div>
            </div>
          </div>
        </div>
    )
  }
});
module.exports=RunGistPage;
