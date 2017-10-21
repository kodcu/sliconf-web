import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';

class Register extends Component {

   state = {
      username: "",
      email: "",
      password: "",
      passworda: "",
      warning: false,
      message: "",
      userWarning:false,
      mailWarning:false,
      passWarning:false,
      passaWarning:false,
      kullaniciId:'',
   }


   componentWillReceiveProps(nextProps) {
      if (this.props.auth.loginError !== nextProps.auth.loginError) {
         this.setState({warning: true})
      }
      //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
      if ((this.props.auth.status !== nextProps.auth.status)) {
         if (nextProps.auth.status === false) {
            //Yanlis girdi, mesaj bas
            this.setState({warning: true, message: nextProps.auth.message})
         } else {
            //Dogru girildi, storela
            this.setState({kullaniciId: nextProps.auth.user.id})

         }
      }
   }


   register = (email, username, password) => {
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
         this.props.register(this.state.email, this.state.username, this.state.password)
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
                           <h2 style={{color: '#29b573'}}>Register</h2>
                        </div>
                     </div>
                     <div className="row">
                       <div className="twelve columns">
                        <label htmlFor="username">Username</label>
                        <input className={classNames({'hata': this.state.userWarning})} type="text" placeholder="i.e. altuga" id="username" value={this.state.username}
                               onChange={(e) => this.setState({username: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                           <label htmlFor="email">Mail</label>
                           <input className={classNames({'hata': this.state.mailWarning})} type="email" placeholder="i.e. altuga@kodcu.com" id="email" value={this.state.email}
                                  onChange={(e) => this.setState({email: e.target.value})}/>
                        </div>
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
                     <div className="row mbottom100">
                        <div className="six columns">
                           <button className="button-primary" onClick={this.register}>Register</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)

