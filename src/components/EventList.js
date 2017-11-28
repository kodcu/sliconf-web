import React from 'react';
import Ionicon from 'react-ionicons'
import ReactTooltip from 'react-tooltip'

const EventsNotAvailable = () => {
   return (
      <tr>
         <td colSpan="6" style={{marginBottom:"10px"}}>No events to be listed!</td>
      </tr>
   )
};

class EventList extends React.Component {

   render() {
      return (
         <div>
            <div className="row">
               <div className="twelve columns">
                  <h3>{this.props.title || 'Events'}</h3>
               </div>
            </div>
            <div className="row events">
               <div className="twelve columns">
                  <div className="docs-example">

                     <table className="u-full-width">
                        <thead>
                        <tr>
                           <th>Logo</th>
                           <th>Title</th>
                           <th style={{textAlign: "center"}}>Key</th>
                           <th style={{textAlign: "center"}}>Date</th>
                           <th style={{textAlign: "center"}}>Status</th>
                           <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.props.events && this.props.events.length) ? null : <EventsNotAvailable/> }
                        {this.props.events ? this.props.events.map((event)=>{
                           return <tr key={event.id}>
                              <td><div className='eventimage' style={{backgroundImage:'url('+event.logo+')'}}/></td>
                              <td>{event.name}</td>
                              <td style={{textAlign: "center"}}>{event.key}</td>
                              <td style={{textAlign: "center"}}>{new Date(event.startDate).getDate()+"."+(new Date(event.startDate).getMonth()+1)+"."+new Date(event.startDate).getFullYear()}</td>
                              <td style={{textAlign: "center"}}>{(event.status===true) ?
                                 <Ionicon icon="ios-checkmark-circle-outline" fontSize="20px" color="black"/> :
                                 <div data-for='global' data-tip><Ionicon icon="ios-warning-outline" fontSize="20px" color="black"/></div> }</td>

                              <td style={{textAlign: "center", width:"250px"}}>
                                 <button data-tip="Edit Event" onClick={() => this.props.history.push('/events/'+event.key+'/edit')}><Ionicon icon="ios-build-outline" fontSize="20px" color="black"/></button>

                                 <button data-tip="Moderate Comments" onClick={() => this.props.history.push('/events/'+event.key+'/moderate')}><Ionicon icon="ios-chatbubbles-outline" fontSize="20px" color="black"/></button>

                                 <button data-tip="Show Statics" onClick={() => this.props.history.push('/events/'+event.key+'/statics')}><Ionicon icon="ios-stats-outline" fontSize="20px" color="black"/></button>

                                 <button data-tip="List Speakers" onClick={() => this.props.history.push('/events/'+event.key+'/speakers')}><Ionicon icon="ios-people-outline" fontSize="20px" color="black"/></button>

                                 <button data-tip="List Talks" onClick={() => this.props.history.push('/events/'+event.key+'/talks')}><Ionicon icon="ios-microphone-outline" fontSize="20px" color="black"/></button>
                                 <ReactTooltip place="bottom" type="dark" effect="solid"/>
                              </td>
                           </tr>
                        }) : null}
                        </tbody>
                     </table>
                     <ReactTooltip id='global' place="bottom" type="dark" effect="solid">This event will not show up on Mobile Devices.<br /> Please add more info about your Event</ReactTooltip>
                  </div>
               </div>

            </div>
         </div>
      );
   }
}

export default EventList