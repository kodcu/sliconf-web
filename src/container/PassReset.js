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
      passaWarning:false
   }


   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true})
      }
   }

   componentWillMount(){
      this.setState({token:this.props.match.params.token})
   }

   resetPassword = (token, password) => {
      this.setState({passWarning:false, passaWarning:false})
      if(!Validator.minLen(8,this.state.password)){
         // uyarı ver
         console.log('şifre 8 karakterden kısa')
         this.setState({passWarning: true})
      }else if(!Validator.minLen(8,this.state.passworda)){
         // uyarı ver
         console.log('şifre (again) 8 karakterden kısa')
         this.setState({passaWarning: true})
      }else if(this.state.password!==this.state.passworda){
         // uyarı ver
         console.log('uyusmuyor')
         this.setState({passWarning: true, passaWarning: true})
      }else{
         // herşey okey
         this.props.resetPassword(this.state.token, this.state.password)
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
                           <h2 style={{color: '#29b573'}}>Reset Password</h2>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <label htmlFor="pass">Password</label>
                           <input className={classNames({'hata': this.state.passWarning})} type="password" placeholder="i.e. 123456" id="pass" value={this.state.password}
                                  onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                        <label htmlFor="pass">Password (again)</label>
                        <input className={classNames({'hata': this.state.passaWarning})} type="password" placeholder="i.e. 123456" id="pass" value={this.state.passworda}
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

