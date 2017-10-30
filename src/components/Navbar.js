import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthView from './AuthView';
import classNames from 'classnames';

class NavBar extends Component {

   state = {
     isOpen:false
   };

   keke = () => {
      this.setState({isOpen:!this.state.isOpen});
   }

   render() {
      return (
         <nav className={classNames('navbar', {'open': this.state.isOpen})}>
            <div className="container">
               <div className="row">
                  <div className="six columns">
                     <h1 className="logo"><Link to="/">sli<b>Conf</b></Link></h1>
                  </div>
                  <div className="six columns">
                     <li className="menu" onClick={this.keke}/>
                     <ul className="navbar-list">
                        <AuthView out><li className="navbar-item"><Link className="navbar-link" to="/login">Sign In</Link></li></AuthView>
                        <AuthView out><li className="navbar-item"><Link className="navbar-link" to="/register">Register</Link></li></AuthView>
                        <AuthView in><li className="navbar-item"><Link className="navbar-link" to="/events">Events</Link></li></AuthView>
                        <AuthView in><li className="navbar-item"><Link className="navbar-link" to="/settings">Settings</Link></li></AuthView>
                        <AuthView in><li className="navbar-item"><Link className="navbar-link" to="/logout">Sign Out</Link></li></AuthView>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>
      );
   }
}

export default NavBar
