import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';

class PassReset extends Component {

   state = {
      token:this.props.match.token,
      password: "",
      passworda: "",
      warning: false,
      message: "",
      passWarning:false,
      passaWarning:false,
      type:'',
      isFirst:true,
   };

   componentWillReceiveProps(nextProps) {
      if (this.props.auth.error !== nextProps.auth.error) {
         this.setState({warning: true, message:"Cannot reach destination server! ("+this.props.auth.error.status+")", type:'error'})
      }

      if (this.props.auth !== nextProps.auth) {
         //console.log(nextProps.message)
            if(nextProps.auth.message==="Password successfully changed"){
               this.setState({warning: true, message: "Password successfully changed. Redirecting..."});
               setTimeout(function(){
                  nextProps.history.push("/login");
               },3000);
            }if(nextProps.auth.message==="Token Is Not Valid"){
               nextProps.history.push("/410");
            }else{
            //console.log("ye", nextProps);
               if(!nextProps.auth.loggingIn)
               {
                  if(this.state.isFirst){
                     this.setState({
                        isFirst:false,
                     });
                  }else{
                     this.setState({warning: true, message: nextProps.auth.message, type:nextProps.auth.status ? "info" : "error"});
                  }
               }

            }
      }
   }

   componentWillMount(){
      this.props.resetPassword(this.props.match.params.token, '')
      this.setState({token:this.props.match.params.token})
   }

   resetPassword = (token, password) => {
      this.setState({passWarning:false, passaWarning:false, type:''})
      if(!Validator.minLen(8,this.state.password)){
         // uyari ver
         //console.log('şifre 8 karakterden kısa')
         this.setState({userWarning: true, warning:true, message:"Password too short - minimum length is 8 characters.", type:"error"})
         this.setState({passWarning: true})
      }else if(!Validator.minLen(8,this.state.passworda)){
         // uyari ver
         //console.log('şifre (again) 8 karakterden kısa')
         this.setState({userWarning: true, warning:true, message:"Password too short - minimum length is 8 characters.", type:"error"})
         this.setState({passaWarning: true})
      }else if(this.state.password!==this.state.passworda){
         // uyari ver
         //console.log('uyusmuyor')
         this.setState({userWarning: true, warning:true, message:"Passwords did not match. Please enter the same password in both fields.", type:"error"})
         this.setState({passWarning: true, passaWarning: true})
      }else{
         // hersey okey
         this.props.resetPassword(this.state.token, this.state.password)
      }
   }

   render() {
      return (
         <div className="container mtop">
               <div className={classNames('row warning', {'show': this.state.warning})}>
                  <div className="twelve columns">
                     <h4 className={this.state.type}>{this.state.message}</h4>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2 style={{color: '#29b573'}}>Reset Password</h2>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <label htmlFor="pass">Password</label>
                           <input className={classNames({'hata': this.state.passWarning})} type="password" id="pass" value={this.state.password}
                                  onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                        <label htmlFor="pass">Password (again)</label>
                        <input className={classNames({'hata': this.state.passaWarning})} type="password" id="pass" value={this.state.passworda}
                               onChange={(e) => this.setState({passworda: e.target.value})}/>
                        </div>
                     </div>
                     <div className="row">
                        <div className="six columns">
                           <button className="button-primary" onClick={this.resetPassword}>Reset</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PassReset)

