import React, { Component } from 'react';
export default class NavBar extends Component{


  render()
  {
      return(
        <nav className="navbar">
          <div className="container">
            <div className="row">
              <div className="six columns">
                <h1 className="logo">sli<b>Conf</b></h1>
              </div>
              <div className="six columns">
                <ul className="navbar-list">
                  <li className="navbar-item"><a className="navbar-link" href="/">Search</a></li>
                  <li className="navbar-item"><a className="navbar-link" href="/Login">Sign In</a></li>
                  <li className="navbar-item"><a className="navbar-link" href="/Register">Register</a></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      );
  }
}
