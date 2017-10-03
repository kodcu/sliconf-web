import React, {Component} from 'react';
import {bindActionCreators, createStore} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import MasterPage from './MasterPage'
import classNames from 'classnames'

class Login extends Component {

   state = {
      name: ""
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
                           <button className="button-primary" onClick={this.login}>Send Mail</button>
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
