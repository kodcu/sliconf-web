import React, {Component} from 'react';
import {bindActionCreators, createStore} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import MasterPage from './MasterPage'
import classNames from 'classnames'



class Settings extends Component {

   state = {
      event_name: "",
      event_time: "",
       username:"",
       email:"",
       password:"",
       passwordAgain:"",

   }

    update = (email,username, password, passwordAgain) => {
        // action creatorü bind ettikten sonra this.props.update :)
        this.props.update(this.state.username,this.state.email, this.state.password, this.state.passwordAgain)
    }
   render() {
      return (
         <MasterPage>
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
                            <input type="text" placeholder="i.e. Altuğ Bilgin Altıntaş" id="name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label htmlFor="mail">e-mail</label>
                            <input type="email" placeholder="i.e. altuga@kodcu.com" id="mail" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label htmlFor="pass">password</label>
                            <input type="password" placeholder="i.e. 123456" id="pass" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="six columns">
                            <label htmlFor="passa">password (again)</label>
                            <input type="password" placeholder="i.e. 123456" id="passa" />
                        </div>
                    </div>


                    <div className="row mtop50">
                        <div className="six columns">
                            <button className="button-primary" onClick={this.update}>Update</button>
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
        user: state.auth.user,
        loggingIn: state.auth.loggingIn
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
