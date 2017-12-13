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

   state = {
      active:"",
      mode:0,
      events:this.props.events,
   };

   sortTable = (what,type) => {
      let cloneEvents = this.props.events ? this.props.events.slice(0) : [];
      if(type){
         return cloneEvents.sort(function(a, b) {
            if(type===1){
               return a[what].toString().localeCompare(b[what].toString())
            }else if(type===2){
               return b[what].toString().localeCompare(a[what].toString())
            }else{
               return 0
            }
         })
      }else{
         return this.props.events
      }
   };

   changeOrder = (which) => {
      if(which===this.state.active){
         if(this.state.mode===1){
            this.setState({
               mode:2,
               events:this.sortTable(which, 2),
            });
         }else if(this.state.mode===2){
            this.setState({
               mode:0,
               active:"",
               events:this.sortTable(which, 0),
            });
         }
      }else{
         this.setState({
            mode:1,
            active:which,
            events:this.sortTable(which, 1),
         });
      }
   };

   returnIcons = (what) => {
      return this.state.active===what ? this.state.mode===1
         ? <Ionicon icon={"ios-arrow-up"} style={{verticalAlign:"top"}} />
         : <Ionicon icon={"ios-arrow-down"} style={{verticalAlign:"top"}} />
         : <Ionicon icon={"ios-remove"} style={{verticalAlign:"top"}} />
   };

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
                           <th onClick={()=>{this.changeOrder("name")}}>Title {this.returnIcons("name")}</th>
                           <th onClick={()=>{this.changeOrder("key")}} style={{textAlign: "center"}}>Key {this.returnIcons("key")}</th>
                           <th onClick={()=>{this.changeOrder("startDate")}} style={{textAlign: "center"}}>Date {this.returnIcons("startDate")}</th>
                           <th style={{textAlign: "center"}}>Status</th>
                           <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.events && this.state.events.length) ? null : <EventsNotAvailable/> }
                        {this.state.events ? this.state.events.map((event)=>{
                           return <tr key={event.id}>
                              <td><div className='eventimage' style={{backgroundImage:'url(http://app.sliconf.com:8090/service/image/get/'+event.logoPath+')'}}/></td>
                              <td>{event.name}</td>
                              <td style={{textAlign: "center"}} className="miniCode">{event.key}</td>
                              <td style={{textAlign: "center"}}>{("0" + new Date(event.startDate).getDate()).slice(-2)+"."+("0" + (new Date(event.startDate).getMonth()+1)).slice(-2)+"."+new Date(event.startDate).getFullYear()}</td>
                              <td style={{textAlign: "center"}}>{(event.status===true) ?
                                 <Ionicon icon="ios-checkmark-circle-outline" fontSize="20px" color="black"/> :
                                 <div data-for='global' data-tip><Ionicon icon="ios-warning-outline" fontSize="20px" color="black"/></div> }</td>

                              <td style={{textAlign: "center", width:"250px"}}>
                                 <button data-tip="Edit Event" onClick={() => this.props.history.push('/events/'+event.key+'/edit')}><Ionicon icon="ios-build-outline" fontSize="20px" color="black"/></button>
                                 {
                                 /*<button data-tip="Moderate Comments" onClick={() => this.props.history.push('/events/'+event.key+'/moderate')}><Ionicon icon="ios-chatbubbles-outline" fontSize="20px" color="black"/></button>

                                 <button data-tip="Show Statics" onClick={() => this.props.history.push('/events/'+event.key+'/statics')}><Ionicon icon="ios-stats-outline" fontSize="20px" color="black"/></button>
                                 */}
                                 <button data-tip="List Speakers" onClick={() => this.props.history.push('/events/'+event.key+'/speakers')}><Ionicon icon="ios-people-outline" fontSize="20px" color="black"/></button>

                                 <button data-tip="Show Agenda" onClick={() => this.props.history.push('/events/'+event.key+'/talks')}><Ionicon icon="ios-microphone-outline" fontSize="20px" color="black"/></button>
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