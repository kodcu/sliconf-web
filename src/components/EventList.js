import React from 'react';

const ListItem = ({event}) => {
   return (
      <tr>
         <td><img src={event.logo} alt="" style={{height:'3em'}}/></td>
         <td>{event.name}</td>
         <td>{event.date.toString()}</td>
      </tr>
   )
}

const EventsNotAvailable = () => {
   return (
      <tr>
         <td colSpan="2">No events to be listed!</td>
      </tr>
   )
}

class EventList extends React.Component {

   render() {
      return (
         <div>
            <div className="row">
               <div className="twelve columns">
                  <h3>{this.props.title || 'Events'}</h3>
               </div>
            </div>
            <div className="row">
               <div className="twelve columns">
                  <div className="docs-example">
                     <table className="u-full-width">
                        <thead>
                        <tr>
                           <th>Logo</th>
                           <th>Title</th>
                           <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.props.events && this.props.events.length) ? null : <EventsNotAvailable/> }
                        {this.props.events ? this.props.events.map((event)=>{
                           return <ListItem key={event.id} event={event}/>
                        }) : null}
                        </tbody>
                     </table>
                  </div>
               </div>

            </div>
         </div>
      );
   }
}

export default EventList