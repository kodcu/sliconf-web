import React, {Component} from 'react';

class EventSuccess extends Component {

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
                           <h2>Congratulations!</h2>
                           <h4>Your event has successfully created.</h4>
                        </div>
                     </div>

                     <div className="row mtop50">
                        <div className="six columns">
                           <p>You can use this code to search your event.</p>
                           <h2 className="code">K512</h2>
                        </div>
                     </div>


                     <div className="row mtop100">
                        <div className="six columns">
                           <button className="button button-primary" onClick={() => this.props.history.push('/events')}>Next</button>
                        </div>
                     </div>


                  </div>
               </div>
            </div>
      );
   }
}


export default EventSuccess
