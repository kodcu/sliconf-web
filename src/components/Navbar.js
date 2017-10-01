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
                     <Link to="/"><h1 className="logo">sli<b>Conf</b></h1></Link>
                  </div>
                  <div className="six columns">
                     <ul className="navbar-list">
                        <AuthView out><li className="navbar-item"><Link className="navbar-link" to="/login">Sign In</Link></li></AuthView>
                        <AuthView out><li className="navbar-item"><Link className="navbar-link" to="/register">Register</Link></li></AuthView>
                        <AuthView in><li className="navbar-item"><Link className="navbar-link" to="/event">Event</Link></li></AuthView>
                     </ul>
                  </div>
               </div>
            </div>
         </nav>
      );
   }
}

export default NavBar
