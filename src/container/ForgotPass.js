import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';

class Login extends Component {

   state = {
      name: "",
      mailWarning:false
   }

   sendForgotMail = (email) => {
      //reset
      this.setState({mailWarning: false})
      if (!Validator.minMaxLen(5,50,this.state.email) || !Validator.isMail(this.state.email)){
         // uyarı ver
         console.log("email uygun değil")
         this.setState({mailWarning: true})
      }else{
         // herşey okey
         this.props.sendForgotMail(this.state.email)
      }
   }

   closeWarning = () => {
      this.setState({warning: false})
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="six columns">
                  <div className="row">
                     <div className="twelve columns">
                        <h2 style={{color: '#29b573'}}>Forgot Password</h2>
                     </div>
                  </div>
                  <div className="row">
                     <div className="twelve columns">
                        <label htmlFor="email">Email</label>
                        <input className={classNames({'hata': this.state.mailWarning})} type="email" placeholder="i.e. altuga@kodcu.com" id="email" value={this.state.email}
                               onChange={(e) => this.setState({email: e.target.value})}/>
                     </div>
                  </div>
                  <div className="row">
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