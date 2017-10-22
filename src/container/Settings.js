import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';

class Settings extends Component {

   state = {
      userId:this.props.user.id,
      username: this.props.user.name,
      email: this.props.user.email,
      fullname: this.props.user.fullname,
      oldpassword: "",
      password: "",
      passwordAgain: "",
      userWarning:false,
      mailWarning:false,
      oldpassWarning:false,
      passWarning:false,
      passaWarning:false
   }

   update = (userId, username, fullname, oldpassword, password) => {
      // action creatorü bind ettikten sonra this.props.update :)
      this.setState({userWarning: false, mailWarning:false, passWarning:false, passaWarning:false})
      if(!Validator.minLen(4,this.state.username)){
         // uyarı ver
         console.log('username uygun degil')
         this.setState({userWarning: true})
      }else if (!Validator.minMaxLen(5,50,this.state.email) || !Validator.isMail(this.state.email)){
         // uyarı ver
         console.log("email uygun değil")
         this.setState({mailWarning: true})
      }else if(!Validator.minLen(8,this.state.password)){
         // uyarı ver
         console.log('şifre 8 karakterden kısa')
         this.setState({passWarning: true})
      }else if(!Validator.minLen(8,this.state.passwordAgain)){
         // uyarı ver
         console.log('şifre (again) 8 karakterden kısa')
         this.setState({passaWarning: true})
      }else if(this.state.password!==this.state.passwordAgain){
         // uyarı ver
         console.log('uyusmuyor')
         this.setState({passWarning: true, passaWarning: true})
      }else{
         // herşey okey
         this.props.update(this.state.userId, this.state.username ,this.state.fullname, this.state.oldpassword, this.state.password)
      }
   }

   render() {
      return (
         <div className="container mtop">
            <div className="twelve columns">
               <div className="row">
                  <div className="twelve columns">
                     <h2>Settings</h2>
                  </div>
               </div>

               <div className="row mtop50">
                  <div className="six columns">
                     <label htmlFor="name">full name</label>
                     <input className={classNames({'hata': this.state.userWarning})} type="text" placeholder="i.e. Altuğ Bilgin Altıntaş" id="name" value={this.state.fullname}
                            onChange={(e) => this.setState({fullname: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="name">username</label>
                     <input className={classNames({'hata': this.state.userWarning})} type="text" placeholder="i.e. altuga" id="name" value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="mail">e-mail</label>
                     <input className={classNames({'hata': this.state.mailWarning})} type="email" placeholder="i.e. altuga@kodcu.com" id="mail" value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="pass">old password</label>
                     <input className={classNames({'hata': this.state.oldpassWarning})} type="password" placeholder="i.e. 123456" id="pass" value={this.state.oldpassword}
                            onChange={(e) => this.setState({oldpassword: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="pass">password</label>
                     <input className={classNames({'hata': this.state.passWarning})} type="password" placeholder="i.e. 123456" id="pass" value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="passa">password (again)</label>
                     <input className={classNames({'hata': this.state.passaWarning})} type="password" placeholder="i.e. 123456" id="passa" value={this.state.passwordAgain}
                            onChange={(e) => this.setState({passwordAgain: e.target.value})}/>
                  </div>
               </div>


               <div className="row mtop50 mbottom100">
                  <div className="six columns">
                     <button className="button-primary" onClick={this.update}>Update</button>
                  </div>
               </div>


            </div>

         </div>
      );
   }
}


const mapStateToProps = (state, ownProps) => {
   return {
      user: state.auth.user,
      loggingIn: state.auth.loggingIn
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(AuthActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
