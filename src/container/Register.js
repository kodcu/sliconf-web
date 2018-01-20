import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';
class Register extends Component {

   state = {
      username: "",
      email: "",
      password: "",
      passworda: "",
      warning: false,
      message: "",
      userWarning:false,
      mailWarning:false,
      passWarning:false,
      passaWarning:false,
      type:'',
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true, message:"Cannot reach destination server!"})
      }else {
         if (this.props.auth !== nextProps.auth) {
            this.setState({
               message: nextProps.auth.message
            });
         }
         //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
         //console.log(nextProps);
         if ((this.props.auth !== nextProps.auth && !nextProps.auth.loggingIn)) {
            if (nextProps.auth.status === false) {
               //Yanlis girdi, mesaj bas
               this.setState({warning: true, message: nextProps.auth.message, type:"error"});
            }
         }
      }
   }


   register = (email, username, password) => {
      this.setState({userWarning: false, mailWarning:false, passWarning:false, passaWarning:false, type:''});
      if(!Validator.minLen(4,this.state.username)){
         // uyari ver
         //console.log('username uygun degil')
         this.setState({warning: true, message: "Username too short - minimum length is 4 characters.", type:"error"});
         this.setState({userWarning: true})
      }else if (!Validator.minMaxLen(5,50,this.state.email) || !Validator.isMail(this.state.email)){
         // uyari ver
         //console.log("email uygun değil")
         this.setState({mailWarning: true})
         this.setState({warning: true, message: "Please enter a valid email.", type:"error"})
      }else if(!Validator.minLen(8,this.state.password)){
         // uyari ver
         //console.log('şifre 8 karakterden kısa')
         this.setState({warning: true, message: "Password too short - minimum length is 8 characters.", type:"error"});
         this.setState({passWarning: true})
      }else if(!Validator.minLen(8,this.state.passworda)){
         // uyari ver
         //console.log('şifre (again) 8 karakterden kısa')
         this.setState({warning: true, message: "Password too short - minimum length is 8 characters.", type:"error"});
         this.setState({passaWarning: true})
      }else if(this.state.password!==this.state.passworda){
         // uyari ver
         this.setState({warning: true, message: "Passwords did not match. Please enter the same password in both fields.", type:"error"});
         //console.log('uyusmuyor')
         this.setState({passWarning: true, passaWarning: true})
      }else{
         // herşey okey
         this.props.register(this.state.email, this.state.username, this.state.password)
      }
   }

   render() {
      return (
         <div className="container mtop">
               <div className={classNames('row warning', {'hide': !this.state.warning})}>
                  <div className="twelve columns">
                     <h4 className={this.state.type}>{this.state.message}</h4>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="row mbottom10">
                        <div className="twelve columns">
                           <h2 style={{color: '#29b573'}}>Register</h2>
                        </div>
                     </div>
                     <div className="row">
                       <div className="twelve columns">
                        <input autoFocus className={classNames("moving",{'hata': this.state.userWarning})} type="text" id="username" placeholder={"Pick a username"} value={this.state.username}
                               onChange={(e) => this.setState({username: e.target.value})}/>
                          <label htmlFor="username">Username</label>
                        </div>
                        <div className="twelve columns">
                           <input className={classNames("moving",{'hata': this.state.mailWarning})} type="email"id="email" placeholder={"you@example.com"} value={this.state.email}
                                  onChange={(e) => this.setState({email: e.target.value})}/>
                           <label htmlFor="email">Mail</label>
                        </div>
                        <div className="twelve columns">
                           <input className={classNames("moving",{'hata': this.state.passWarning})} type="password" id="pass" placeholder={"Create a password"} value={this.state.password}
                                  onChange={(e) => this.setState({password: e.target.value})}/>
                           <label htmlFor="pass">Password</label>
                        </div>
                        <div className="twelve columns">
                        <input className={classNames("moving",{'hata': this.state.passaWarning})} type="password" id="passc" placeholder={"Confirm your password"} value={this.state.passworda}
                               onChange={(e) => this.setState({passworda: e.target.value})}/>
                           <label htmlFor="passc">Password (again)</label>
                        </div>
                     </div>
                     <div className="row mbottom100 mtop50">
                        <div className="six columns">
                           <button className="button-primary" onClick={this.register}>Register</button>
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
      auth: state.auth
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(AuthActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)

