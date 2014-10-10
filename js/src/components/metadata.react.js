/** @jsx React.DOM */
var $ = window.jQuery;
var React = require('react');
var prettyDate = require('../utils/prettyDate');
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
      $('.popup').popup()
    }
  },
  render: function(){
    return (
      <div>
        <div className="right floated column">
          <div className="ui mini basic icon buttons source">
            <a className="ui button" href={"https://gist.github.com/" + this.props.username + "/" + this.props.gistid}>
              <i className="octicon octicon-octoface popup" data-content="source"> </i>
            </a>
          
            <a className="ui button" href={"https://gist.github.com/" + this.props.username + "/" + this.props.gistid + "/fork"}>
              <i className="octicon octicon-git-branch popup" data-content="forks"> </i>
            </a>
            <a className="ui button count">
              {this.state.forks.length}
            </a>
          </div>
        </div>

        <h3 className="ui header">{this.state.description}</h3>
        <div className="authorship">
          <img className="ui avatar image" src={this.state.owner.avatar_url}/>
          <a href={this.state.owner.html_url}><span className="">{this.state.owner.login}</span></a>
        <span className="time"> updated {prettyDate(this.state.updated_at)}</span>
        </div>
      </div>
    )
  }
});

module.exports = MetaData;
