import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as AuthActions from '../reducks/modules/auth'
import {LoginButton} from '../theme/Buttons'

class Login extends Component {
    state = {
        email:"",
        password:""
    }

    render() {
        return (
        <div> 
            <h3>Login <Link to="/register">Register</Link></h3>
            <div>
                <input type="email" placeholder="E-mail address" value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}/>
                <input type="password" placeholder="Password" value={this.state.password} onChange={(e)=>this.setState({password:e.target.value})}/>
                <LoginButton onClick={()=>this.props.login(this.state.email,this.state.password)}>Login</LoginButton>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps,AuthActions)(Login)
