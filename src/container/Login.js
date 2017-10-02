import React, {Component} from 'react';
import {bindActionCreators, createStore} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import MasterPage from './MasterPage'
import classNames from 'classnames'

function veriler(state = [], action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                id: action.id,
                email: action.email,
                name: action.name,
            }
        default:
            return state
    }
}

let store = createStore(veriler)


class Login extends Component {

   state = {
      name: "",
      password: "",
      warning:false,
      message:"",
      kullaniciId:"",
   }

   componentWillReceiveProps(nextProps){
      if(this.props.auth.loginError !== nextProps.auth.loginError){
         this.setState({warning:true})
      }
      //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
       if((this.props.auth.status !== nextProps.auth.status)){
         if(nextProps.auth.status === false){
             //Yanlis girdi, mesaj bas
             this.setState({warning:true, message:nextProps.auth.message})
         }else{
             //Dogru girildi, storela
             this.setState({kullaniciId:nextProps.auth.returnObject.id})
             store.dispatch({type: 'USER_LOGIN', id: nextProps.auth.returnObject.id, email: nextProps.auth.returnObject.email, name: nextProps.auth.returnObject.name})
             console.log(store.getState())
         }
       }
   }

   login = (name, password) => {
      this.props.login(this.state.name, this.state.password)
   }

    kapat = () => {
        this.setState({warning:false})
    }

   render() {

      if(this.props.auth.user){
         // zaten oturum açılmış ise / adresine yolla
         this.props.history.push('/')
      }

      return (
         <MasterPage>
            <div className="container mtop">
            <div className={classNames('row warning',{'show':this.state.warning})}>
               <h4>{this.state.message}</h4><div className="kapa">X</div>
            </div>
               <div className="row">
                  <div className="six columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2 style={{color: '#29b573'}}>Sign In</h2>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <label htmlFor="email">Username</label>
                           <input type="email" placeholder="i.e. altuga" id="email" value={this.state.name}
                                  onChange={(e) => this.setState({name: e.target.value})}/>
                        </div>
                        <div className="twelve columns">
                           <label htmlFor="pass">Password</label>
                           <input type="password" placeholder="i.e. 123456" id="pass" value={this.state.password}
                                  onChange={(e) => this.setState({password: e.target.value})}/>
                        </div>
                     </div>
                     <div className="row">
                        <div className="six columns">
                           <button className="button-primary" onClick={this.login}>Sign In</button>
                        </div>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="row">
                        <div className="six columns">
                           <h3 style={{color: 'gray'}}>or</h3>
                        </div>
                     </div>
                     <div className="row">
                        <div className="six columns">
                           <a className="button button-primary" style={{
                              background: '#547dbe',
                              borderColor: '#547dbe',
                              boxShadow: '0px 0px 21px -4px #547dbe'
                           }}>Sign In with Facebook</a>
                           <a className="button button-primary" style={{
                              background: '#3b5a9a',
                              borderColor: '#3b5a9a',
                              boxShadow: '0px 0px 21px -4px #3b5a9a'
                           }}>Sign In with Google</a>
                           <a className="button button-primary" style={{
                              background: '#2d9cd7',
                              borderColor: '#2d9cd7',
                              boxShadow: '0px 0px 21px -4px #2d9cd7'
                           }}>Sign In with Twitter</a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </MasterPage>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      auth: state.auth
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(AuthActions,dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
