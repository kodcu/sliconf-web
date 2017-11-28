import React from 'react';

const ListItem = ({speaker,index,eventId,props}) => {
   return (
      <tr onClick={()=>{props.topProps.history.push('/events/'+eventId+'/speaker/'+index)}}>
         <td><div className="eventimage" style={{backgroundImage: 'url("http://app.sliconf.com:8090/service/image/get/'+speaker.profilePicture+'")'}}/></td>
         <td>{speaker.name}</td>
         <td>{speaker.workingAt}</td>
         <td className="topics"><div className="ongoing">{speaker.topics.map((topic)=>{return <div key={topic} className="room">{topic}</div>})}</div></td>
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

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width events speakers">
                     <thead>
                     <tr>
                        <th style={{width: 40}}>Photo</th>
                        <th>Full Name</th>
                        <th>Working At</th>
                        <th>Topics</th>
                     </tr>
                     </thead>
                     <tbody>
                     {console.log(this.props)}
                     {(this.props.speakers && this.props.speakers.length) ? null : <SpeakersNotAvailable/> }
                     {this.props.speakers ? this.props.speakers.map((speaker, index)=>{
                        return <ListItem key={speaker.name} speaker={speaker} index={index} eventId={this.props.eventId} props={this.props}/>
                     }) : null}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

      );
   }
}

export default SpeakerList