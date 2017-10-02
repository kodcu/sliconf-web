import React, {Component} from 'react';
import MasterPage from './MasterPage'

class EventList extends Component {

   state = {
      event_name: "",
      event_time: ""
   }

   render() {
      return (
         <MasterPage>
            <div className="container mtop">
               <div className="row">
                  <div className="twelve columns">
                     <div className="row">
                        <div className="twelve columns">
                           <div className="row">
                              <div className="twelve columns">
                                 <h2>Events</h2>
                              </div>
                           </div>

                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <h3>Upcoming Events</h3>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <div className="docs-example">
                              <table className="u-full-width">
                                 <thead>
                                 <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 <tr>
                                    <td>Designing Autonomous Teams and Services</td>
                                    <td>12.12.2017</td>
                                 </tr>
                                 <tr>
                                    <td>Designing Autonomous Teams and Services</td>
                                    <td>12.12.2017</td>
                                 </tr>
                                 <tr>
                                    <td>Designing Autonomous Teams and Services</td>
                                    <td>12.12.2017</td>
                                 </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <h3>Finished Events</h3>
                        </div>
                     </div>
                     <div className="row">
                        <div className="twelve columns">
                           <div className="docs-example">
                              <table className="u-full-width">
                                 <thead>
                                 <tr>
                                    <th>Title</th>
                                    <th>Date</th>
                                 </tr>
                                 </thead>
                                 <tbody>
                                 <tr>
                                    <td>Designing Autonomous Teams and Services</td>
                                    <td>12.12.2017</td>
                                 </tr>
                                 <tr>
                                    <td>Designing Autonomous Teams and Services</td>
                                    <td>12.12.2017</td>
                                 </tr>
                                 <tr>
                                    <td>Designing Autonomous Teams and Services</td>
                                    <td>12.12.2017</td>
                                 </tr>
                                 </tbody>
                              </table>
                           </div>
                        </div>

                     </div>
                     <div className="row mtop25 mbottom100">
                        <div className="twelve columns">
                           <button className="button button-primary" onClick={() => this.props.history.push('/addevent')}>Create An Event</button>
                        </div>
                     </div>


                  </div>
               </div>
            </div>
         </MasterPage>
      );
   }
}


export default EventList
