import React from 'react';
import ReactTooltip from 'react-tooltip'
import Ionicon from 'react-ionicons'

const ListItem = ({speaker,index,eventId,props}) => {
   return (
      <tr data-tip={"Click to View"} data-for="editTooltip" onClick={()=>{props.topProps.history.push('/events/'+eventId+'/speaker/'+index)}}>
         <td><div className="eventimage" style={{backgroundImage: 'url("http://app.sliconf.com:8090/service/image/get/'+speaker.profilePicture+'")'}}/></td>
         <td>{speaker.name}</td>
         <td>{speaker.workingAt}</td>
         <td className="topics"><div className="ongoing">{speaker.topics ? speaker.topics.map((topic)=>{return <div key={topic} className="room">{topic}</div>}):''}</div></td>
      </tr>
   )
};

const SpeakersNotAvailable = () => {
   return (
      <tr>
         <td colSpan="4" style={{marginBottom:"10px"}}>No speakers to be listed!</td>
      </tr>
   )
};

class SpeakerList extends React.Component {

   state = {
      speakers: this.props.speakers,
      active:"",
      mode:0,
   }

   sortTable = (what,type) => {
      let cloneTable = this.props.speakers ? this.props.speakers.slice(0) : [];
      if(type){
         return cloneTable.sort(function(a, b) {
            if(type===1){
               return a[what].toString().localeCompare(b[what].toString())
            }else if(type===2){
               return b[what].toString().localeCompare(a[what].toString())
            }else{
               return 0
            }
         })
      }else{
         return this.props.speakers;
      }
   };

   changeOrder = (which) => {
      if(which===this.state.active){
         if(this.state.mode===1){
            this.setState({
               mode:2,
               speakers:this.sortTable(which, 2),
            });
         }else if(this.state.mode===2){
            this.setState({
               mode:0,
               active:"",
               speakers:this.sortTable(which, 0),
            });
         }
      }else{
         this.setState({
            mode:1,
            active:which,
            speakers:this.sortTable(which, 1),
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
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width events speakers">
                     <thead>
                     <tr>
                        <th style={{width: 40}}>Photo</th>
                        <th onClick={()=>{this.changeOrder("name")}}>Full Name {this.returnIcons("name")}</th>
                        <th onClick={()=>{this.changeOrder("workingAt")}}>Working At {this.returnIcons("workingAt")}</th>
                        <th>Topics</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.state.speakers && this.state.speakers.length) ? null : <SpeakersNotAvailable/> }
                     {this.state.speakers ? this.state.speakers.map((speaker, index)=>{
                        return <ListItem key={speaker.name} speaker={speaker} index={speaker.id} eventId={this.props.eventId} props={this.props}/>
                     }) : null}
                     </tbody>
                  </table>
                  <ReactTooltip id="editTooltip" place="bottom" type="dark"  effect="solid"/>
               </div>
            </div>
         </div>

      );
   }
}

export default SpeakerList