import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';
import ReCaptcha from 'react-google-recaptcha';

class Login extends Component {

   state = {
      name: "",
      mailWarning:false,
      warning:false,
      message:"",
      email:"",
      type:'',
      captcha:null,
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true, message:"Cannot reach destination server!"})
      }
      if(this.props.auth !== nextProps.auth){
         if(nextProps.auth && nextProps.auth.message==="Mail sent!"){
            this.props.history.push("/mailsuccess");
         }else{
            this.reCaptchaElement.reset();
            if(!nextProps.auth.loggingIn){
               this.setState({warning: true, message: nextProps.auth.message, type:nextProps.auth.status ? "info" : "error"})
            }
         }
      }

   }

   onCaptchaChange = (value) => {
      this.setState({
         captcha:value,
      });
      //console.log("Captcha value:", value);
   }
   //sa
   sendForgotMail = () => {
      //reset
      this.setState({mailWarning: false,warning: false});
      if(this.state.captcha){
         if (!Validator.minMaxLen(5,50,this.state.email) || !Validator.isMail(this.state.email)){
            // uyari ver
            //console.log("email uygun değil")
            this.setState({warning: true, message: "Please enter a valid email.", type:"error"});
            this.setState({mailWarning: true})
         }else{
            // hersey okey
            this.props.sendForgotMail(this.state.email, this.state.captcha)
         }
      }else{
         this.setState({warning: true, message: "Please confirm you are human.", type:"error"});
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
                        <h2 style={{color: '#29b573'}}>Forgot Password</h2>
                     </div>
                  </div>
                  <div className="row">
                     <div className="twelve columns">
                        <input autoFocus className={classNames("moving",{'hata': this.state.mailWarning})} type="email" id="email" value={this.state.email}
                               onChange={(e) => this.setState({email: e.target.value})}/>
                        <label htmlFor="email">Email</label>
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
                  <div className="row mtop50">
                     <div className="six columns">
                        <button className="button-primary" onClick={this.sendForgotMail}>Send Mail</button>
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
