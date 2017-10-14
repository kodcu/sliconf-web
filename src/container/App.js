import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import Events from "./Events";
import AddEvent from "./EventPage";
import Settings from "./Settings";
import AddEventSuccess from "./EventSuccess";
import ForgotPass from "./ForgotPass";
import {history} from '../reducks'
import PrivateRoute from "./PrivateRoute";
import MasterPage from "./MasterPage";
import Speakers from "./Speakers";
import AddSpeaker from "./AddSpeaker";

class App extends Component {
   render() {
      if (this.props.rehydrate) {
         return (
            <Router history={history}>
               <MasterPage>
                  <Switch>
                     <Route path="/login" component={Login}/>
                     <Route path="/register" component={Register}/>
                     <Route path="/forgotpass" component={ForgotPass}/>
                     <PrivateRoute path="/events/:eventId/speakers" component={Speakers}/>
                     <PrivateRoute path="/events/:eventId/addspeaker" component={AddSpeaker}/>
                     <PrivateRoute path="/events" component={Events}/>
                     <PrivateRoute path="/addeventsuccess" component={AddEventSuccess}/>
                     <PrivateRoute path="/addevent" component={AddEvent}/>
                     <PrivateRoute path="/settings" component={Settings}/>
                     <Route path="/" component={Home}/>
                  </Switch>
               </MasterPage>
            </Router>
         );
      } else {
         return <h3>Loading...</h3>
      }
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      rehydrate: state.rehydrate.rehydrate,
      user: state.username
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
