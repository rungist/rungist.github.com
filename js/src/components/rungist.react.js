/** @jsx React.DOM */
var $ = window.jQuery;
var aceHighlighter = require('../utils/ace')
var clipboardify = require('../utils/zeroclipboard')
var React = require('react');
var ramda = require('ramda');
var MetaData = require('./metadata.react')
var APIWidget = require('./api.react')
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
    var codeblock = document.querySelector('.result .codeblock');
    aceHighlighter(codeblock, 'javascript');
    clipboardify($('#result-clipboard'));
  },
  render: function(){
    var result = JSON.stringify(this.state.result, undefined, 2)
    return (
      <div className="ui grid">
        <div className="ten wide column">
          <MetaData gistid={this.props.gistid} username={this.props.username}/>
        <div className="ui segment result">
          <a className="ui right corner label" data-content="copied" data-variation="inverted" data-clipboard-text={result}  id="result-clipboard">
            <span className="ui icon octicon octicon-clippy"></span>
          </a>
            <div className="codeblock" id="result-codeblock">
              {result}
            </div>
          </div>
        </div>
        <APIWidget gistid={this.props.gistid} username={this.props.username}/>
      </div>
    )
  }
});
module.exports=RunGistPage;




