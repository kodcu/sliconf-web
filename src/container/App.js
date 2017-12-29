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
import PublicRoute from "./PublicRoute";
import MasterPage from "./MasterPage";
import Speakers from "./Speakers";
import Talks from "./Talks";
import AddSpeaker from "./AddSpeaker";
import AddTalk from "./AddTalk";
import AddBreak from "./AddBreak";
import PassReset from "./PassReset";
import PassChange from "./PassChange";
import MailSuccess from "./MailSuccess";
import Logout from "./Logout";
import ModerateComments from "./ModerateComments";
import Statics from "./Statics";
import Speaker from "./Speaker";
import Error from "./Error";
import Presentation from "./Presentation";

class App extends Component {
   render() {
      if(this.props.rehydrate && this.props.rehydrate.loaded){
         return (
            <Router history={history}>
               <MasterPage>
                  <Switch>
                     <PublicRoute path="/login" component={Login}/>
                     <PublicRoute path="/register" component={Register}/>
                     <PublicRoute path="/forgotpass" component={ForgotPass}/>
                     <PublicRoute path="/resetpass/:token" component={PassReset}/>
                     <PublicRoute path="/mailsuccess" component={MailSuccess}/>
                     <PrivateRoute path="/events/:eventId/speaker/:speakerId" component={Speaker}/>
                     <PrivateRoute path="/events/:eventId/speakers" component={Speakers}/>
                     <PrivateRoute path="/events/:eventId/talks" component={Talks}/>
                     <PrivateRoute path="/events/:eventId/addspeaker/:redirected" component={AddSpeaker}/>
                     <PrivateRoute path="/events/:eventId/addspeaker" component={AddSpeaker}/>
                     <PrivateRoute path="/events/:eventId/editspeaker/:speakerId" component={AddSpeaker}/>
                     <PrivateRoute path="/events/:eventId/addtalk" component={AddTalk}/>
                     <PrivateRoute path="/events/:eventId/edittalk/:talkId" component={AddTalk}/>
                     <PrivateRoute path="/events/:eventId/addbreak" component={AddBreak}/>
                     <PrivateRoute path="/events/:eventId/editbreak/:breakId" component={AddBreak}/>
                     <PrivateRoute path="/events/:eventId/edit/:new" component={EditEvent}/>
                     <PrivateRoute path="/events/:eventId/edit" component={EditEvent}/>
                     <PrivateRoute path="/events/:eventId/moderate" component={ModerateComments}/>
                     <PrivateRoute path="/events/:eventId/statics" component={Statics}/>
                     <PrivateRoute path="/events" component={Events}/>
                     <PrivateRoute path="/addeventsuccess" component={AddEventSuccess}/>
                     <PrivateRoute path="/addevent/:isFirst" component={AddEvent}/>
                     <PrivateRoute path="/addevent" component={AddEvent}/>
                     <PrivateRoute path="/settings" component={Settings}/>
                     <PrivateRoute path="/changepassword" component={PassChange}/>
                     <Route path="/p/:eventId" component={Presentation}/>
                     <Route path="/logout" component={Logout}/>
                     <Route path="/410" render={routeProps => <Error {...routeProps} error={"410"}/>} />
                     <Route path="/401" render={routeProps => <Error {...routeProps} error={"401"}/>} />
                     <Route exact path="/" component={Home}/>
                     <Route render={routeProps => <Error {...routeProps} error={"404"}/>} />
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
