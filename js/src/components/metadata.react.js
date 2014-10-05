/** @jsx React.DOM */
var $ = window.jQuery;
var React = require('react');
var MetaData = React.createClass({
  getInitialState: function(){
    return {
      error: false,
      files: {},
      public: false,
      description: "hehe",
      forks: [],
      owner: {},
      updated_at: ""
    }
  },
  componentDidMount: function(){
    if (this.isMounted()) {
      $.ajax({
        url: "http://api.github.com/gists/"+ this.props.gistid,
        type: 'get',
        dataType: 'jsonp',
        crossDomain: true
      }).then((response)=>{
        if(response.meta.status==200){
          this.setState(response.data)
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
      <div>
        <h3 className="ui header">{this.state.description}</h3>
        <div className="authorship">
          <img className="ui avatar image" src={this.state.owner.avatar_url}/>
          <span className="author-name">{this.state.owner.login}</span>
          <span className="time">{this.state.updated_at}</span>
        </div>
      </div>
    )
  }
});

module.exports = MetaData;
