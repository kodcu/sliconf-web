import React, {Component} from 'react';
import {connect} from 'react-redux';
import MasterPage from "./MasterPage";

class Home extends Component {

   render() {
      return (
         <MasterPage>
            <div className="container mtop">
               <div className="row">
                  <div className="twelve columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2 style={{color: '#29b573'}}>Welcome back, {this.props.loggingIn ? this.props.user.username : "Stranger"}</h2>
                           <h4 style={{fontSize: '2rem', color: 'gray'}}>Let's search an event.</h4>
                        </div>
                     </div>
                     <div className="row" style={{marginTop: 50}}>
                        <div className="six columns">
                           <label htmlFor="search">Event Name</label>
                           <input type="text" placeholder="i.e. Javaday or K162" id="search"
                                  style={{fontSize: '2rem'}}/>
                        </div>
                     </div>
                     <div className="row" style={{marginTop: 50}}>
                        <div className="six columns">
                           <input className="button-primary" type="submit" defaultValue="search"/>
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
      user: state.auth.user,
      loggingIn: state.auth.loggingIn
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
