import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';

class PassChange extends Component {

   state = {
      token:this.props.match.token,
      password: "",
      passworda: "",
      warning: false,
      message: "",
      oldpassword:"",
      opassWarning:false,
      passWarning:false,
      passaWarning:false,
   }


   componentWillReceiveProps(nextProps) {
      this.setState({warning: false})
      if (this.props.auth.error !== nextProps.auth.error) {
         console.log(this.props.auth.error);
         this.setState({warning: true, message:"Cannot reach destination server!"})
      }
      if(nextProps.auth.loaded){
         console.log(nextProps.auth)
         if (this.props.auth !== nextProps.auth) {
            console.log(nextProps.message)
            if(nextProps.auth.message!==""){
               this.setState({warning: true, message: nextProps.auth.message})
            }
         }
      }
   }

   componentWillMount(){
      this.setState({token:this.props.match.params.token})
   }

   changePassword = (token, password) => {
      this.setState({passWarning:false, passaWarning:false, opassWarning:false})
      if(!Validator.minLen(8,this.state.oldpassword)){
         // uyari ver
         //console.log('şifre (again) 8 karakterden kısa')
         this.setState({warning:true, message:"Password too short - minimum length is 8 characters."})
         this.setState({opassWarning: true})
      }else if(!Validator.minLen(8,this.state.password)){
         // uyari ver
         //console.log('şifre 8 karakterden kısa')
         this.setState({warning:true, message:"Password too short - minimum length is 8 characters."})
         this.setState({passWarning: true})
      }else if(!Validator.minLen(8,this.state.passworda)){
         // uyari ver
         //console.log('şifre (again) 8 karakterden kısa')
         this.setState({warning:true, message:"Password too short - minimum length is 8 characters."})
         this.setState({passaWarning: true})
      }else if(this.state.password!==this.state.passworda){
         // uyari ver
         //console.log('uyusmuyor')
         this.setState({warning:true, message:"Passwords did not match. Please enter the same password in both fields."})
         this.setState({passWarning: true, passaWarning: true})
      }else{
         // hersey okey
         this.props.changePassword(this.props.auth.user.id, this.state.oldpassword, this.state.password)
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
                           <h2 style={{color: '#29b573'}}>Change Password</h2>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns mtop50">
                           <label htmlFor="pass">CURRENT Password</label>
                           <input className={classNames({'hata': this.state.opassWarning})} type="password" id="pass" value={this.state.oldpassword}
                                  onChange={(e) => this.setState({oldpassword: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                           <label htmlFor="pass">NEW Password</label>
                           <input className={classNames({'hata': this.state.passWarning})} type="password" id="pass" value={this.state.password}
                                  onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                        <label htmlFor="pass">NEW Password (again)</label>
                        <input className={classNames({'hata': this.state.passaWarning})} type="password" id="pass" value={this.state.passworda}
                               onChange={(e) => this.setState({passworda: e.target.value})}/>
                        </div>
                     </div>
                     <div className="row mtop50">
                        <div className="six columns">
                           <button className="button-primary" onClick={this.changePassword}>Update</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PassChange)

