import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {logout} from '../reducks/modules/auth';
import {withRouter} from 'react-router-dom'
import { Route, Switch} from 'react-router-dom'

import Home from './Home'
import About from './About'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute path="/about" component={About}/>
            <Route component={NotFound}/>
          </Switch>
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
  return {
    logout: logout,
    pushState: push
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
