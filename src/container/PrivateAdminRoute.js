import React from 'react'
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom'

const PrivateAdminRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest}
           render={props =>
               auth.status && auth.user && auth.user.role === "ROLE_ADMIN"
                   ? <Component {...props} />
                   : <Redirect to={{pathname: "/401"}}/>}
    />
);

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth
    }
};

export default withRouter(connect(mapStateToProps)(PrivateAdminRoute));