import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import {Link} from 'react-router-dom';
import Validator from '../helpers/Validator';
import randomString from 'random-string';

class Login extends Component {

   state = {
      user: "",
      password: "",
      warning: false,
      message: "",
      kullaniciId: "",
      userWarning:false,
      passWarning:false,
      iePass:randomString({length: 8}),
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true, message:"Cannot reach destination server! ("+this.props.auth.loginError.status+")"})
      }

      //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
      if ((this.props.auth.user !== nextProps.auth.user)) {

         if (nextProps.auth.status === false) {
            //Yanlis girdi, mesaj bas
            this.setState({warning: true, message: nextProps.auth.message})
         } else {
            //Dogru girildi, storela
            this.props.history.push('/')
         }
      }
   }

   login = () => {
      //reset
      this.setState({userWarning: false, passWarning:false})
      if (!Validator.minMaxLen(4,50,this.state.user)){
         // uyari ver
         console.log("isim uygun değil")
         this.setState({userWarning: true})
         this.setState({warning: true, message: "Username too short - minimum length is 4 characters."})
      }else if(!Validator.minLen(8,this.state.password)){
         // uyari ver
         console.log('şifre 8 karakterden kısa')
         this.setState({warning: true, message: "Password too short - minimum length is 8 characters."})
         this.setState({passWarning: true})
      }else{
         // hersey okey
         this.props.login(this.state.user, this.state.password)
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
                           <h2 style={{color: '#29b573'}}>Sign In</h2>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <label htmlFor="user">Username</label>
                           <input className={classNames({'hata': this.state.userWarning})} type="text" placeholder="i.e. altuga" id="user" value={this.state.user} onChange={(e) => this.setState({user: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                           <label htmlFor="pass">Password</label>
                           <input className={classNames({'hata': this.state.passWarning})} type="password" placeholder={"i.e. "+this.state.iePass} id="pass" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                     </div>
                     <div className="row">
                        <div className="six columns">
                           <button className="button-primary" onClick={this.login}>Sign In</button>
                        </div>
                     </div>
                     <div className="row">
                        <div className="six columns">
                           <Link className="forgotpass" to="/forgotpass">Forgot your password?</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
