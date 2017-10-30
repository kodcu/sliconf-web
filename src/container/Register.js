import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';
import randomString from 'random-string';

class Register extends Component {

   state = {
      username: "",
      email: "",
      password: "",
      passworda: "",
      warning: true,
      message: "",
      userWarning:false,
      mailWarning:false,
      passWarning:false,
      passaWarning:false,
      kullaniciId:'',
      iePass:randomString({length: 8}),
   }


   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true, message:"Cannot reach destination server! ("+this.props.auth.loginError.status+")"})
      }else {
         if (this.props.auth !== nextProps.auth) {
            this.setState({
               message: nextProps.auth.message
            });
         }
         //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
         if ((this.props.auth.status !== nextProps.auth.status)) {
            if (nextProps.auth.status === false) {
               //Yanlis girdi, mesaj bas
               this.setState({warning: true, message: nextProps.auth.message})
            } else {
               //Dogru girildi, storela
               this.setState({kullaniciId: nextProps.auth.user.id})
               this.props.history.push("/addevent/first")
            }
         }
      }
   }


   register = (email, username, password) => {
      this.setState({userWarning: false, mailWarning:false, passWarning:false, passaWarning:false})
      if(!Validator.minLen(4,this.state.username)){
         // uyari ver
         console.log('username uygun degil')
         this.setState({warning: true, message: "Username too short - minimum length is 4 characters."})
         this.setState({userWarning: true})
      }else if (!Validator.minMaxLen(5,50,this.state.email) || !Validator.isMail(this.state.email)){
         // uyari ver
         console.log("email uygun değil")
         this.setState({mailWarning: true})
         this.setState({warning: true, message: "Please enter a valid email."})
      }else if(!Validator.minLen(8,this.state.password)){
         // uyari ver
         console.log('şifre 8 karakterden kısa')
         this.setState({warning: true, message: "Password too short - minimum length is 8 characters."})
         this.setState({passWarning: true})
      }else if(!Validator.minLen(8,this.state.passworda)){
         // uyari ver
         console.log('şifre (again) 8 karakterden kısa')
         this.setState({warning: true, message: "Password too short - minimum length is 8 characters."})
         this.setState({passaWarning: true})
      }else if(this.state.password!==this.state.passworda){
         // uyari ver
         this.setState({warning: true, message: "Passwords did not match. Please enter the same password in both fields."})
         console.log('uyusmuyor')
         this.setState({passWarning: true, passaWarning: true})
      }else{
         // herşey okey
         this.props.register(this.state.email, this.state.username, this.state.password)
      }
   }

   render() {
      return (
         <div className="container mtop">
               <div className={classNames('row warning', {'show': this.state.warning})}>
                  <div className="twelve columns">
                     <h4>{this.state.message}</h4>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2 style={{color: '#29b573'}}>Register</h2>
                        </div>
                     </div>
                     <div className="row">
                       <div className="twelve columns">
                        <label htmlFor="username">Username</label>
                        <input className={classNames({'hata': this.state.userWarning})} type="text" placeholder="i.e. altuga" id="username" value={this.state.username}
                               onChange={(e) => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                           <label htmlFor="email">Mail</label>
                           <input className={classNames({'hata': this.state.mailWarning})} type="email" placeholder="i.e. altuga@kodcu.com" id="email" value={this.state.email}
                                  onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                           <label htmlFor="pass">Password</label>
                           <input className={classNames({'hata': this.state.passWarning})} type="password" placeholder={"i.e. "+this.state.iePass} id="pass" value={this.state.password}
                                  onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                        <label htmlFor="pass">Password (again)</label>
                        <input className={classNames({'hata': this.state.passaWarning})} type="password" placeholder={"i.e. "+this.state.iePass} id="pass" value={this.state.passworda}
                               onChange={(e) => this.setState({passworda: e.target.value})}/>
                        </div>
                     </div>
                     <div className="row mbottom100">
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

