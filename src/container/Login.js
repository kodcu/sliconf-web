import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import {Link} from 'react-router-dom';
import Validator from '../helpers/Validator';

class Login extends Component {

   state = {
      email: "",
      password: "",
      warning: false,
      message: "",
      kullaniciId: "",
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true})
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
      if (!Validator.minMaxLen(5,50,this.state.email)){
         // uyarı ver
         console.log("email uygun değil")
      }else if(!Validator.minLen(8,this.state.password)){
         // uyarı ver
         console.log('şifre 8 karakterden kısa')
      }else{
         // herşey okey
         this.props.login(this.state.email, this.state.password)
      }
   }

   closeWarning = () => {
      this.setState({warning: false})
   }

   render() {
      return (
         <div className="container mtop">
               <div className={classNames('row warning', {'show': this.state.warning})}>
                  <h4>{this.state.message}</h4>
                  <div className="kapa" onClick={this.closeWarning}>X</div>
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
                           <label htmlFor="email">Username</label>
                           <input type="email" placeholder="i.e. altuga" id="email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                           <label htmlFor="pass">Password</label>
                           <input type="password" placeholder="i.e. 123456" id="pass" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
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
