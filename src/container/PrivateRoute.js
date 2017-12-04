import React from 'react'
import {connect} from 'react-redux';
import {Route,Redirect,withRouter} from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route {...rest}
   render={props =>
    auth.user
        ? <Component {...props} />
        : <Redirect to={{ pathname: "/401" }} />}
  />
);

const mapStateToProps = (state, ownProps) => {
  return {
     auth: state.auth
  }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));