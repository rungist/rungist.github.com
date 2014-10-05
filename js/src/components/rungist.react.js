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
  render: function(){
    return (
        <div className="ui grid">
          <div className="ten wide column">
            <MetaData gistid={this.props.gistid} username={this.props.username}/>
            <div className="ui segment"> 
              {this.state.result}
            </div>
          </div>
        </div>
    )
  }
});
module.exports=RunGistPage;
