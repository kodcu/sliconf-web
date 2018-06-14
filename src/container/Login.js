import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import {Link} from 'react-router-dom';
import Validator from '../helpers/Validator';
import ReCaptcha from 'react-google-recaptcha';

// import GoogleLogin from '../components/login/GoogleLogin';
import GoogleLogin from 'react-google-login';
import SocialButton from "../components/SocialButton";

class Login extends React.Component {

   state = {
      user: "",
      password: "",
      warning: false,
      message: "",
      kullaniciId: "",
      userWarning:false,
      passWarning:false,
      captcha:null,
   };

   onCaptchaChange = (value) => {
      this.setState({
         captcha:value,
      });
      //console.log("Captcha value:", value);
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true, message:"Cannot reach destination server!"})
      }

      //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
      if ((this.props.auth.user !== nextProps.auth.user)) {

         if (nextProps.auth.status === false) {
            //Yanlis girdi, mesaj bas
            this.setState({warning: true, message: nextProps.auth.message, type:nextProps.auth.status ? "info" : "error"})
            this.reCaptchaElement.reset();
         } else {
            //Dogru girildi, storela
            this.props.history.push('/')
         }
      }
   };
//

    responseGoogle = (response) => {
        console.log(response);
        this.setState({userWarning: false, passWarning:false});
        if (response && response !== undefined && response !== null && !response.error) {
            this.props.loginWithService('google', response.tokenId);
        } else {
            this.setState({userWarning: true})
            this.setState({warning: true, message: "Check your Google Authentication!", type:"error"})
        }
    };

    responseLinkedIn = (response) => {
        console.log(response);

        this.setState({userWarning: false, passWarning:false});
        if (response && response !== undefined && response !== null && !response.error && response._token) {
            this.props.loginWithService('linkedin', response._token.accessToken);
        } else {
            this.setState({userWarning: true})
            this.setState({warning: true, message: "Check your LinkedIn Authentication!", type:"error"})
        }
    };

   login = () => {
      //reset
      this.setState({userWarning: false, passWarning:false});
      if(this.state.captcha){
         if (!Validator.minMaxLen(4,50,this.state.user)){
            // uyari ver
            //console.log("isim uygun değil")
            this.setState({userWarning: true})
            this.setState({warning: true, message: "Username too short - minimum length is 4 characters.", type:"error"})
         }else if(!Validator.minLen(8,this.state.password)){
            // uyari ver
            //console.log('şifre 8 karakterden kısa')
            this.setState({warning: true, message: "Password too short - minimum length is 8 characters.", type:"error"})
            this.setState({passWarning: true})
         }else{
            // hersey okey
            this.props.login(this.state.user, this.state.password, this.state.captcha);
         }
      }else{
         this.setState({warning: true, message: "Please confirm you are human.", type:"error"})
      }

   };


   handleKeyPress = (event) => {
      if(event.key === 'Enter'){
         this.login();
      }
   };

   reCaptchaElement;

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
                           <h2 style={{color: '#29b573', marginBottom:"2px"}}>Sign In</h2>
                           <span>Don't you have an account? <a className="underline" onClick={()=>this.props.history.push("/register")}>Register now!</a></span>
                           <br /><br />
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <input autoFocus className={classNames("moving",{'hata': this.state.userWarning})} type="text" id="user" placeholder={"Username"} value={this.state.user} onChange={(e) => this.setState({user: e.target.value})}/>
                           <label htmlFor="user">Username or E-mail</label>
                        </div>
                        <div className="twelve columns">
                           <input onKeyPress={this.handleKeyPress} className={classNames("moving",{'hata': this.state.passWarning})} type="password" id="pass" placeholder={"Password"} value={this.state.password} onChange={(e) => this.setState({password: e.target.value})}/>
                           <label htmlFor="pass">Password</label>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <ReCaptcha
                              ref={(el) => { this.reCaptchaElement = el }}
                              sitekey="6Le6PD0UAAAAAP3JH2yxy18pEbGU8h5KwdY7yjXp"
                              onChange={this.onCaptchaChange}
                           />
                        </div>
                     </div>



                     <div className="row mtop25">
                        <div className="six columns">
                           <button className="button-primary" onClick={this.login}>Sign In</button><Link style={{fontSize:"12px",display:"inline-block",marginLeft:10}} className="forgotpass" to="/forgotpass">Lost password?</Link>
                        </div>
                     </div>

                     <div className="row">
                        <br />
                        <GoogleLogin
                           clientId="31237231524-4vibq7hrr7g6dsp1h9oh5h9k9mmndhhq.apps.googleusercontent.com"
                           buttonText={
                              <div className="googleLogo">
                                 <span>Sign in with Google</span>
                              </div>
                           }
                           className="button-google"
                           onSuccess={this.responseGoogle}
                           onFailure={this.responseGoogle}
                        />
                        {/*
                        <SocialButton
                           provider='linkedin'
                           appId='863g25szn8vggb'
                           onLoginSuccess={this.responseLinkedIn}
                           onLoginFailure={this.responseLinkedIn}
                           className="button-linkedin"
                        >
                           <div className="linkedInLogo">
                              <span>Sign in with Linkedin</span>
                           </div>
                        </SocialButton>
                        */}
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
};

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(AuthActions, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
