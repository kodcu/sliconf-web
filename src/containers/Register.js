import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
//import {Link} from 'react-router-dom'
import NavBar from '../components/navbar'
import './skeleton.css'
import './styles.css'

class Register extends Component {

  state = {
      username:"",
      email:"",
      password:""
  }
  handleRegister(email,username, password) {

        console.log(email,username, password)

        //TODO Check if email is already exist
        var new_Data = {  email : email, password: password }
        new_Data = JSON.stringify(new_Data)

        //Adding new data to db.json
        fetch('http://localhost:3001/users', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: new_Data
        })
  }


  render() {
    return (
      <div>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>sliConf</title>
        <NavBar/>
        <div className="container mtop">
          <div className="row">
            <div className="six columns">
              <div className="row">
                <div className="twelve columns">
                  <h2 style={{color: '#29b573'}}>Register</h2>
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <label htmlFor="email">Username</label>
                  <input type="email" placeholder="i.e. morty" id="email"  value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
                </div>
                <div className="twelve columns">
                  <label htmlFor="username">Mail</label>
                  <input type="text" placeholder="i.e. rick" id="username"  value={this.state.username} onChange={(e)=>this.setState({username:e.target.value})}/>
                </div>
                <div className="twelve columns">
                  <label htmlFor="pass">Password</label>
                  <input type="password" placeholder="i.e. rick" id="pass" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} />
                </div>
              </div>
              <div className="row">
                <div className="six columns">
                  <input className="button-primary" type="submit" defaultValue="register" onClick={()=>this.handleRegister(this.state.email,this.state.username,this.state.password)}/>
                </div>
              </div>
            </div>
            <div className="six columns">
              <div className="row">
                <div className="six columns">
                  <h3 style={{color: 'gray'}}>or</h3>
                </div>
              </div>
              <div className="row">
                <div className="six columns">
                  <a className="button button-primary" style={{background: '#547dbe', borderColor: '#547dbe', boxShadow: '0px 0px 21px -4px #547dbe'}}>Register with Facebook</a>
                  <a className="button button-primary" style={{background: '#3b5a9a', borderColor: '#3b5a9a', boxShadow: '0px 0px 21px -4px #3b5a9a'}}>Register with Google</a>
                  <a className="button button-primary" style={{background: '#2d9cd7', borderColor: '#2d9cd7', boxShadow: '0px 0px 21px -4px #2d9cd7'}}>Register with Twitter</a>
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
        user: state.username
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pushState: push
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)
