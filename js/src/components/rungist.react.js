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
      <div>
        <div className="ui grid">
          <div className="ten wide column">
            <div className="right floated column">
              <div className="ui mini basic icon buttons star">
                <button className="ui button">
                  <i className="star code icon"></i>
                  Star
                </button>
                <a className="ui button count">
                  10
                </a>
              </div>
              <div className="ui mini basic icon buttons fork">
                <button className="ui button">
                  <i className="fork code icon"></i>
                  Fork
                </button>
                <a className="ui button count">
                  2
                </a>
              </div>
            </div>

            <MetaData gistid={this.props.gistid}/>
            <div className="ui segment"> 
              {this.state.result}
            </div>
          </div>

          <div className="six wide right column">
            <div className="ui tabular filter menu">
              <a className="item active" data-tab="curl">CURL</a>
              <a className="item" data-tab="api">API</a>
              <a className="item" data-tab="jquery">JQUERY</a>
            </div>
            <div className="ui divided inbox selection list tab active" data-tab="curl">
              <a className="active item">
                <div className="left floated ui star rating"><i className="icon"></i></div>
                <div className="right floated date">Sep 14, 2013</div>
                <div className="description">First Tab</div>
              </a>
            </div>
            <div className="ui divided inbox selection list tab" data-tab="api">
              <a className="active item">
                <div className="left floated ui star rating"><i className="icon"></i></div>
                <div className="right floated date">Sep 14, 2013</div>
                <div className="description">Second Tab</div>
              </a>
            </div>
            <div className="ui divided inbox selection list tab" data-tab="jquery">
              <a className="active item">
                <div className="left floated ui star rating"><i className="icon"></i></div>
                <div className="right floated date">Sep 14, 2013</div>
                <div className="description">Third Tab</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
module.exports=RunGistPage;
