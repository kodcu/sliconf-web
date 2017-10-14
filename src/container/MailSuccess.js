import React, {Component} from 'react';

class MailSuccess extends Component {

   state = {
      event_name: "",
      event_time: ""
   }

   render() {
      return (
            <div className="container mtop">
               <div className="row">
                  <div className="twelve columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2>Sent!</h2>
                           <h4>Your recovery mail has successfully sent.</h4>
                        </div>
                     </div>

                     <div className="row mtop100">
                        <div className="six columns">
                           <button className="button button-primary" onClick={() => this.props.history.push('/')}>Go Home</button>
                        </div>
                     </div>


                  </div>
               </div>
            </div>
      );
   }
}


export default MailSuccess
