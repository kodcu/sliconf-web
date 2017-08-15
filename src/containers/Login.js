import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
//import {LoginButton} from '../theme/Buttons'
import './skeleton.css'
import './styles.css'
import NavBar from '../components/navbar'



class Login extends Component {


    state = {
        username:"",
        email:"",
        password:""
    }
    handleLogin(email,password) {

        console.log(email,password)
        //check auth
        fetch('http://localhost:3001/users')
          .then((response) => response.json())
          .then((responseJson) => {
            //console.log(responseJson)
            var emailFound = false;
            for(var i in responseJson)
            {
              if(responseJson[i].email === email)
              {
                emailFound = true;
                if(responseJson[i].password === password)  {
                  console.log("Success." + responseJson[i].email)
                  this.setState({username: responseJson[i].email,isLoggedin:true})

                  console.log("Redirecting login to Home last user : " + this.state.username)
                  this.props.history.push('/');
                  break;
                 }
                else {console.log("Wrong password"); break;}
              }
            }
            if(!emailFound)
            {
              console.log("Wrong email");
            }
          })
          .catch((error) => {
            console.error(error);
        });



        //return to home page

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
                            <h2 style={{color: '#29b573'}}>Sign In</h2>
                          </div>
                        </div>
                        <div className="row">
                          <div className="twelve columns">
                            <label htmlFor="email">Username</label>
                            <input type="email" placeholder="i.e. morty" id="email"  value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
                          </div>
                          <div className="twelve columns">
                            <label htmlFor="pass">Password</label>
                            <input type="password" placeholder="i.e. rick" id="pass" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})} />
                          </div>
                        </div>
                        <div className="row">
                          <div className="six columns">
                            <input className="button-primary" type="submit" defaultValue="Sign In" onClick={()=>this.handleLogin(this.state.email,this.state.password)}/>
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
                            <a className="button button-primary" style={{background: '#547dbe', borderColor: '#547dbe', boxShadow: '0px 0px 21px -4px #547dbe'}}>Sign In with Facebook</a>
                            <a  className="button button-primary" style={{background: '#3b5a9a', borderColor: '#3b5a9a', boxShadow: '0px 0px 21px -4px #3b5a9a'}}>Sign In with Google</a>
                            <a className="button button-primary" style={{background: '#2d9cd7', borderColor: '#2d9cd7', boxShadow: '0px 0px 21px -4px #2d9cd7'}}>Sign In with Twitter</a>
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

export default connect(mapStateToProps,AuthActions)(Login)
