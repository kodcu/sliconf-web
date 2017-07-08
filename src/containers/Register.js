import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {Link} from 'react-router-dom'

class Login extends Component {
  render() {
    return (
      <div> Register <Link to="/login">Login</Link> </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        pushState: push
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
