import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AuthView from './AuthView'

class NavBar extends Component {

   render() {
      return (
         <nav className="navbar">
            <div className="container">
               <div className="row">
                  <div className="six columns">
                     <h1 className="logo"><Link to="/">sli<b>Conf</b></Link></h1>
                  </div>
                  <div className="six columns">
                     <ul className="navbar-list">
                        <AuthView out><li className="navbar-item"><Link className="navbar-link" to="/login">Sign In</Link></li></AuthView>
                        <AuthView out><li className="navbar-item"><Link className="navbar-link" to="/register">Register</Link></li></AuthView>
                        <AuthView in><li className="navbar-item"><Link className="navbar-link" to="/events">Event</Link></li></AuthView>
                        <AuthView in><li className="navbar-item"><Link className="navbar-link" to="/settings">Settings</Link></li></AuthView>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>
      );
   }
}

export default NavBar
