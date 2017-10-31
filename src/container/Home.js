import React, {Component} from 'react';
import {connect} from 'react-redux';

class Home extends Component {

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <div className="row">
                     <div className="twelve columns">
                        <h2 style={{color: '#29b573'}}>
                           Welcome{this.props.user !== null && this.props.user !== undefined ? (this.props.user.fullname!=="") ? ", " +(this.props.user.username) : ", " +(this.props.user.username) : "!"}</h2>
                        <h4 style={{fontSize: '2rem', color: 'gray'}}>You can download the app on</h4>
                     </div>
                  </div>
                  <div className="row">
                     <div className="six columns">
                        <a className="button button-primary" style={{marginRight: '10px'}}>Google Play</a>
                        <a className="button button-primary">Apple Store</a>
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
      user: state.auth.user,
      loggingIn: state.auth.loggingIn
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
