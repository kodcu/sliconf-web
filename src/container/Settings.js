import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'

class Settings extends Component {

   state = {
      event_name: "",
      event_time: "",
      username: "",
      email: "",
      password: "",
      passwordAgain: "",

   }

   update = (username, email, password, passwordAgain) => {
      // action creatorü bind ettikten sonra this.props.update :)
      this.props.update(this.state.email, this.state.username, this.state.password, this.state.passwordAgain)
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
                     <input type="text" placeholder="i.e. Altuğ Bilgin Altıntaş" id="name" value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="mail">e-mail</label>
                     <input type="email" placeholder="i.e. altuga@kodcu.com" id="mail" value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="pass">password</label>
                     <input type="password" placeholder="i.e. 123456" id="pass" value={this.state.password}
                            onChange={(e) => this.setState({password: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="passa">password (again)</label>
                     <input type="password" placeholder="i.e. 123456" id="passa" value={this.state.passwordAgain}
                            onChange={(e) => this.setState({passwordAgain: e.target.value})}/>
                  </div>
               </div>


               <div className="row mtop50">
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
