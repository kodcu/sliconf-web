import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import {Link} from 'react-router-dom';
import Validator from '../helpers/Validator';
import ReCaptcha from 'react-google-recaptcha';
import GoogleLogin from 'react-google-login';

class Login extends React.Component {

   reCaptchaElement;

   state = {
      user: "",
      password: "",
      message: "",
      warning: false,
      userWarning: false,
      passWarning: false,
      captcha: null,
   };

   warning = (warningType, ...args) => {
      this.setState({[warningType]: true});
      this.showError(...args);
   };

   showError = (err, type = "error") => {
      if (!err) {
         this.setState({warning: false, userWarning: false, passWarning: false});
      } else {
         this.setState({warning: true, message: err, type})
      }
   };

   onCaptchaChange = (value) => {
      this.setState({
         captcha: value,
      });
   };

   componentWillReceiveProps(nextProps) {
      let nextAuth = nextProps.auth;
      let postAuth = this.props.auth;
      if (postAuth && nextAuth && postAuth.loginError !== nextAuth.loginError) {
         this.showError("Cannot reach destination server!");
      }else{
         if (postAuth && nextAuth && postAuth.user !== nextAuth.user) {
            if (nextAuth.status === false) {
               this.showError(nextAuth.message, nextAuth.status ? "info" : "error");
               this.reCaptchaElement.reset();
            } else {
               this.props.history.push('/')
            }
         }
      }
   };

   responseGoogle = (response) => {
      this.showError(false);
      if (typeof response === "object") {
         if (!response.error) {
            this.props.loginWithService('google', response.tokenId);
         } else {
            if (response.error === "popup_closed_by_user") {
               this.showError("Couldn't sign in with Google because user closed the popup.");
            } else {
               this.showError("Check your Google Authentication!");
            }
         }
      } else {
         this.userWarning("Check your Google Authentication!");
      }
   };

   login = () => {
      this.showError(false);
      if (this.state.captcha) {
         if (!Validator.minMaxLen(4, 50, this.state.user)) {
            this.warning("userWarning", "Username too short - minimum length is 4 characters.");
         } else if (!Validator.minLen(8, this.state.password)) {
            this.warning("passWarning", "Password too short - minimum length is 8 characters.");
         } else {
            this.props.login(this.state.user, this.state.password, this.state.captcha);
         }
      } else {
         this.showError("Please confirm you are human.");
      }
   };

   handleKeyPress = (event) => {
      if (event.key === 'Enter') {
         this.login();
      }
   };

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
                        <h2 style={{color: '#29b573', marginBottom: "2px"}}>Sign In</h2>
                        <span>Don't you have an account? <a className="underline"
                                                            onClick={() => this.props.history.push("/register")}>Register now!</a></span>
                        <br/><br/>
                     </div>
                  </div>
                  <div className="row">
                     <div className="twelve columns">
                        <input autoFocus className={classNames("moving", {'hata': this.state.userWarning})} type="text"
                               id="user" placeholder={"Username"} value={this.state.user}
                               onChange={(e) => this.setState({user: e.target.value})}/>
                        <label htmlFor="user">Username or E-mail</label>
                     </div>
                     <div className="twelve columns">
                        <input onKeyPress={this.handleKeyPress}
                               className={classNames("moving", {'hata': this.state.passWarning})} type="password"
                               id="pass" placeholder={"Password"} value={this.state.password}
                               onChange={(e) => this.setState({password: e.target.value})}/>
                        <label htmlFor="pass">Password</label>
                     </div>
                  </div>
                  <div className="row">
                     <div className="twelve columns">
                        <ReCaptcha
                           ref={(el) => {
                              this.reCaptchaElement = el
                           }}
                           sitekey="6Le6PD0UAAAAAP3JH2yxy18pEbGU8h5KwdY7yjXp"
                           onChange={this.onCaptchaChange}
                        />
                     </div>
                  </div>

                  <div className="row mtop25">
                     <div className="six columns">
                        <button className="button-primary" onClick={this.login}>Sign In</button>
                        <Link style={{fontSize: "12px", display: "inline-block", marginLeft: 10}} className="forgotpass"
                              to="/forgotpass">Lost password?</Link>
                     </div>
                  </div>

                  <div className="row">
                     <br/>
                     <GoogleLogin
                        clientId="31237231524-4vibq7hrr7g6dsp1h9oh5h9k9mmndhhq.apps.googleusercontent.com"
                        buttonText={
                           <div>Sign in with Google</div>
                        }
                        className="button-google"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                     />
                     <br/>
                  </div>
               </div>

            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      auth: state.auth
   }
};

const mapDispatchToProps = (dispatch) => {
   return {...bindActionCreators(AuthActions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
