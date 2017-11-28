import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import EditEvent from "./EditEvent";
import Events from "./Events";
import AddEvent from "./EventPage";
import Settings from "./Settings";
import AddEventSuccess from "./EventSuccess";
import ForgotPass from "./ForgotPass";
import {history} from '../reducks'
import PrivateRoute from "./PrivateRoute";
import MasterPage from "./MasterPage";
import Speakers from "./Speakers";
import Talks from "./Talks";
import AddSpeaker from "./AddSpeaker";
import AddTalk from "./AddTalk";
import PassReset from "./PassReset";
import PassChange from "./PassChange";
import MailSuccess from "./MailSuccess";
import Logout from "./Logout";
import ModerateComments from "./ModerateComments";
import Statics from "./Statics";
import Speaker from "./Speaker";

class App extends Component {
   render() {
      if(this.props.rehydrate && this.props.rehydrate.loaded){
         return (
            <Router history={history}>
               <MasterPage>
                  <Switch>
                     <Route path="/login" component={Login}/>
                     <Route path="/register" component={Register}/>
                     <Route path="/forgotpass" component={ForgotPass}/>
                     <Route path="/resetpass/:token" component={PassReset}/>
                     <Route path="/mailsuccess" component={MailSuccess}/>
                     <Route path="/logout" component={Logout}/>
                     <PrivateRoute path="/events/:eventId/speaker/:speakerId" component={Speaker}/>
                     <PrivateRoute path="/events/:eventId/speakers" component={Speakers}/>
                     <PrivateRoute path="/events/:eventId/talks" component={Talks}/>
                     <PrivateRoute path="/events/:eventId/addspeaker" component={AddSpeaker}/>
                     <PrivateRoute path="/events/:eventId/addtalk" component={AddTalk}/>
                     <PrivateRoute path="/events/:eventId/edit" component={EditEvent}/>
                     <PrivateRoute path="/events/:eventId/moderate" component={ModerateComments}/>
                     <PrivateRoute path="/events/:eventId/statics" component={Statics}/>
                     <PrivateRoute path="/events" component={Events}/>
                     <PrivateRoute path="/addeventsuccess" component={AddEventSuccess}/>
                     <PrivateRoute path="/addevent" component={AddEvent}/>
                     <PrivateRoute path="/settings" component={Settings}/>
                     <PrivateRoute path="/changepassword" component={PassChange}/>
                     <Route path="/" component={Home}/>
                  </Switch>
               </MasterPage>
            </Router>
         );
      }
      //WARNING <h5></h5>
      return <div/>
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      rehydrate: state.rehydrate,
      user: state.username
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
