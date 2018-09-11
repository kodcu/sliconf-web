import React from 'react';
import ReactTooltip from 'react-tooltip'
import Ionicon from 'react-ionicons'

const ListItem = ({speaker,index,eventId,props}) => {
   return (
      <tr>
         <td><div className="eventimage" style={{backgroundImage: 'url("https://app.sliconf.com/api/image/get/'+speaker.photo+'")'}}/></td>
         <td>{speaker.speaker}</td>
         <td>{speaker.workingAt}</td>
         <td>{speaker.topic}</td>
         <td>{speaker.count}</td>
         <td>{speaker.average}</td>
      </tr>
   )
};

const SpeakersNotAvailable = () => {
   return (
      <tr>
         <td colSpan="6" style={{marginBottom:"10px"}}>No speakers to be listed!</td>
      </tr>
   )
};

class SpeakerListVote extends React.Component {

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
                        <th style={{minWidth:150}} onClick={()=>{this.changeOrder("speaker")}}>Full Name {this.returnIcons("speaker")}</th>
                        <th style={{minWidth:170}} onClick={()=>{this.changeOrder("workingAt")}}>Working At {this.returnIcons("workingAt")}</th>
                        <th style={{width:"100%"}}>Topic</th>
                        <th style={{width:100}}>Number of votes</th>
                        <th style={{width:100}}>Average of votes</th>
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

export default SpeakerListVote