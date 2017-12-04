import React, {Component} from 'react';
import {connect} from 'react-redux';

class Unauthorized extends Component {
    render() {
        return (
            <div className="container mtop">
               <div className="row">
                  <div className="nine columns">
                     <h1 className="code green">401</h1>
                     <h5>Hey, I don't know you.</h5>
                     <p>You cannot view this page. Maybe you are not logged in, maybe you want to access somebody else's event.</p>
                     <button onClick={()=>{this.props.history.push("/")}}>GO TO HOME</button>
                  </div>
               </div>
           </div>
       );
    }
}

export default connect()(Unauthorized)