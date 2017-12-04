import React, {Component} from 'react';
import {connect} from 'react-redux';

class NotFound extends Component {
   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="nine columns">
                  <h1 className="code green">404</h1>
                  <h5>We sincerely apologize.</h5>
                  <p>The page you are looking for is no longer here. Maybe it was never here in the first place.</p>
                  <button onClick={()=>{this.props.history.push("/")}}>GO TO HOME</button>
               </div>
            </div>
         </div>
      );
   }
}

export default connect()(NotFound)