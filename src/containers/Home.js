import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router-dom'
import NavBar from '../components/navbar'
import './skeleton.css'
import './styles.css'
class Home extends Component {

  state= {
    username:"x",
    isLoggedin:false
  }
  render() {
    console.log("Home")
    console.log(this.state)
    const isLoggedin = this.state.isLoggedin
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>sliConf</title>
      <NavBar/>
        <div className="container mtop">
          <div className="row">
            <div className="twelve columns">
              <div className="row">
                <div className="twelve columns">
                    <h2 style={{color: '#29b573'}}>Welcome back, {isLoggedin ? this.state.username : "Stranger"}</h2>
                    <h4 style={{fontSize: '2rem', color: 'gray'}}>Let's search an event.</h4>
                </div>
              </div>
              <div className="row" style={{marginTop: 50}}>
                <div className="six columns">
                  <label htmlFor="search">Event Name</label>
                  <input type="text" placeholder="i.e. Javaday or K162" id="search" style={{fontSize: '2rem'}} />
                </div>
              </div>
              <div className="row" style={{marginTop: 50}}>
                <div className="six columns">
                  <input className="button-primary" type="submit" defaultValue="search" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }


  }


const mapStateToProps = (state, ownProps) => {
    return {
        username: state.username,
        isLoggedin:state.isLoggedin
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pushState: push
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
