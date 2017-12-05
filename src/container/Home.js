import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

class Home extends Component {

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <div className="row">
                     <div className="twelve columns">
                        <h2 style={{color: '#29b573'}}>
                           Welcome{this.props.user !== null && this.props.user !== undefined ? (this.props.user.fullname!=="") && (this.props.user.fullname!==undefined) && (this.props.user.fullname!==null) ? ", " +(this.props.user.fullname) : ", " +(this.props.user.username) : "!"}</h2>
                           {this.props.user !== null && this.props.user !== undefined ? <Redirect to={{ pathname: "/events" }} /> : ''}
                     </div>
                  </div>
                  {!(this.props.user !== null && this.props.user !== undefined) ? <div className="row">
                     <div className="six columns">
                        <h4 style={{fontSize: '2rem', color: 'gray'}}>You can download the app on</h4>
                        <a className="button button-primary" style={{marginRight: '10px'}}>Google Play</a>
                        <a className="button button-primary">Apple Store</a>
                     </div>
                  </div> :<div className="row">
                     <div className="six columns">
                        <h4 style={{fontSize: '2rem', color: 'gray'}}>Do you need any help?</h4>

                     </div>
                  </div>}
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
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
