import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import classNames from 'classnames'
import Validator from '../helpers/Validator';

class Settings extends Component {

   state = {
      userId:this.props.auth.user.id ? this.props.auth.user.id : '',
      username: this.props.auth.user.username ? this.props.auth.user.username : '',
      email: this.props.auth.user.email ? this.props.auth.user.email : '',
      fullname: this.props.auth.user.fullname ? this.props.auth.user.fullname : '',
      userWarning:false,
      warning:true,
      message:""
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.auth.error !== nextProps.auth.error) {
         this.setState({warning: true})
      }
      if(this.props.auth !== nextProps.auth){
         console.log(this.props)
         this.setState({warning: true, message: nextProps.auth.message})
      }

   }

   update = (userId, username, fullname) => {
      this.setState({userWarning: false})
      if(!Validator.minLen(4,this.state.username)){
         this.setState({userWarning: true, warning:true, message:"Please enter a name that is at least 4 characters long."})
      }else{
         this.props.update(this.state.userId, this.state.username, this.state.fullname);
      }
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
            <div className="twelve columns">
               <div className={classNames('row warning', {'show': this.state.warning})}>
                  <div className="twelve columns">
                     <h4>{this.state.message}</h4>
                  </div>
               </div>
               <div className="row">
                  <div className="twelve columns">
                     <h2>Settings</h2>
                     <Link to="/changepassword">To change your password, click here.</Link>
                  </div>
               </div>

               <div className="row mtop50">
                  <div className="six columns">
                     <label htmlFor="name">full name</label>
                     <input type="text" id="name" value={this.state.fullname}
                            onChange={(e) => this.setState({fullname: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="name">username</label>
                     <input className={classNames({'hata': this.state.userWarning})} type="text" id="name" value={this.state.username}
                            onChange={(e) => this.setState({username: e.target.value})}/>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <label htmlFor="mail">e-mail</label>
                     <input disabled={true} className={classNames({'hata': this.state.mailWarning})} type="email" id="mail" value={this.state.email}
                            onChange={(e) => this.setState({email: e.target.value})}/>
                  </div>
               </div>

               <div className="row mtop50 mbottom100">
                  <div className="six columns">
                     <button className="button-primary" onClick={this.update}>Update</button>
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
      auth: state.auth,
      message: state.auth.message
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(AuthActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
