import React from 'react';

const ListItem = ({talk}) => {
   return (
      <tr>
         <td>{talk.topic}</td>
         <td>{talk.level}</td>
         <td>{talk.speaker}</td>
         <td>{talk.date}</td>
         <td>{talk.duration}</td>
         <td className="topics"><div className="ongoing">{talk.tags.map((topic)=>{return <div key={topic} className="room">{topic}</div>})}</div></td>
      </tr>
   )
};

const TalksNotAvailable = () => {
   return (
      <tr>
         <td colSpan="6">No talks to be listed!</td>
      </tr>
   )
};

class TalkList extends React.Component {

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width">
                     <thead>
                     <tr>
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
                     {this.props.agenda ? this.props.agenda.map((talk)=>{
                        return <ListItem key={talk.id} talk={talk}/>
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