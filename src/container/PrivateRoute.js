import React from 'react'
import {connect} from 'react-redux';
import {Route,Redirect,withRouter} from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest}
   render={props =>
    auth.loggingIn
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/login" }} />}
  />
);

const mapStateToProps = (state, ownProps) => {
  return {
     auth: state.auth
  }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));