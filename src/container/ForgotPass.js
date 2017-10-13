import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'

class Login extends Component {

   state = {
      name: ""
   }

   sendForgotMail = (name, password) => {
      //
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
                        <input type="email" placeholder="i.e. altuga@kodcu.com" id="email" value={this.state.name}
                               onChange={(e) => this.setState({name: e.target.value})}/>
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

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(AuthActions, dispatch)}
}

export default connect(null, mapDispatchToProps)(Login)
