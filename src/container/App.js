import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom'
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import {history} from '../reducks'


class App extends Component {
   render() {
      return (
         <div>
            <Router history={history}>
               <Switch>
                  <Route path="/login" component={Login}/>
                  <Route path="/register" component={Register}/>
                  <Route path="/" component={Home}/>
               </Switch>
            </Router>
         </div>
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
