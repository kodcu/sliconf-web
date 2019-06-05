import React from 'react';
import ReactTooltip from 'react-tooltip'
import IosCheckmark from 'react-ionicons/lib/IosCheckmark'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import IosArrowUp from 'react-ionicons/lib/IosArrowUp'
import IosRemove from 'react-ionicons/lib/IosRemove'

const ListItem = ({speaker,index,eventId,props}) => {
   return (
      <tr>
         <td><div className="eventimage" style={{backgroundImage: 'url("https://app.sliconf.com/api/image/get/'+speaker.photo+'")'}}/></td>
         <td>{speaker.speaker}</td>
         <td>{speaker.workingAt}</td>
         <td>{speaker.topic}</td>
         <td>{speaker.voteCount}</td>
         <td>{Math.round(speaker.average*100)/100}</td>
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
   };

   componentWillReceiveProps(nextProps) {
      if (this.props.speakers !== nextProps.speakers) {
         this.setState({
            speakers: nextProps.speakers,
         })
      }
   }

   sortTable = (what,type) => {
        let cloneTable = this.props.speakers ? this.props.speakers.slice(0) : [];
        if(type){
            return cloneTable.sort(function(a, b) {
                if(type===1){
                    // Normal sıralama yap. a=a, b=b
                }else if(type===2){
                    // Tam tersi sıralama. a=b, b=a
                    let temp = a;
                    a = b;
                    b = temp;
                }else{
                    // Sıralama yapma, işlem yapmadan çık
                    return 0
                }
                if(!isNaN(parseFloat(a[what])) && !isNaN(parseFloat(b[what]))){
                    // Değerler sayı ise string compare işe yaramaz. 
                    // String compare: 1, 22, 3, 4 gibi sıralar.
                    // Bizim istediğimiz, 1, 3, 4, 22 gibi sıralaması.
                    return a[what] - b[what];
                }else{
                    // Değerler string ise string compare yap
                    return a[what].toString().localeCompare(b[what].toString())
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
         ? <IosArrowUp style={{verticalAlign:"top"}} />
         : <IosArrowDown style={{verticalAlign:"top"}} />
         : <IosRemove rotate={false} style={{verticalAlign:"top"}} />
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
                        <th style={{width:100}} onClick={()=>{this.changeOrder("voteCount")}}>Number of votes {this.returnIcons("voteCount")}</th>
                        <th style={{width:100}} onClick={()=>{this.changeOrder("average")}}>Average of votes {this.returnIcons("average")}</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.state.speakers && this.state.speakers.length) ? null : <SpeakersNotAvailable/> }
                     {this.state.speakers ? this.state.speakers.map((speaker)=>{
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