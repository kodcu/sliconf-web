import React from 'react';
import Ionicon from 'react-ionicons'

const ListItem = ({talk, removeTalk, index}) => {
   return (
      <tr>
         <td onClick={()=>{removeTalk(index)}} style={{width:"10px", textAlign:"center",padding: "5px", lineHeight: "10px"}}><Ionicon icon="ios-remove-circle" fontSize="25px" color="#F44336" /></td>
         <td style={{width:"400px"}}>{talk.topic}</td>
         <td style={{textAlign:"center"}}><Ionicon icon="ios-podium" fontSize="25px" color={talk.level===0 ? "#29b573" : talk.level===1 ? "orange" : talk.level===2 ? "#F44336" : 'black'}/></td>
         <td style={{width:"200px"}}>{talk.speaker}</td>
         <td style={{textAlign:"center"}}>{new Date(talk.date*1000).getDate()+"."+(new Date(talk.date*1000).getMonth()+1)+"."+new Date(talk.date*1000).getFullYear()+" "+new Date(talk.date*1000).getHours()+":"+new Date(talk.date*1000).getMinutes()}</td>
         <td>{talk.duration}</td>
         <td className="topics" style={{width:"200px",maxWidth:"200px"}}><div className="ongoing">{talk.tags.map((topic)=>{return <div key={topic} className="room">{topic}</div>})}</div></td>
      </tr>
   )
};

const TalksNotAvailable = () => {
   return (
      <tr>
         <td colSpan="7">No talks to be listed!</td>
      </tr>
   )
};
//sasasasa
class TalkList extends React.Component {

   removeTalk = (index) => {
      this.props.removeTalk(index);
   };

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width">
                     <thead>
                     <tr>
                        <th></th>
                        <th style={{width: 40}}>Topic</th>
                        <th>Level</th>
                        <th>Speaker</th>
                        <th>Date</th>
                        <th>Duration</th>
                        <th>Tags</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.props.agenda && this.props.agenda.length) ? null : <TalksNotAvailable/> }
                     {this.props.agenda ? this.props.agenda.map((talk, index)=>{
                        return <ListItem key={talk.id} talk={talk} removeTalk={this.removeTalk} index={index}/>
                     }) : null}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

      );
   }
}

export default TalkList