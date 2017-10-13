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

class App extends Component {
   render() {
      return (
         <Router history={history}>
            <MasterPage>
               <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/forgotpass" component={ForgotPass}/>
                  <Route path="/events" component={Events}/>
                  <Route path="/addeventsuccess" component={AddEventSuccess}/>
                  <Route path="/addevent" component={AddEvent}/>
                  <Route path="/settings" component={Settings}/>
                  <Route path="/" component={Home}/>
               </Switch>
            </MasterPage>
         </Router>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      user: state.username
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
