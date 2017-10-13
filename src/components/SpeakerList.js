import React from 'react';

const ListItem = ({speaker}) => {
   return (
      <tr>
         <td><div className="level l1" /></td>
         <td><div className="image rounded mini" style={{backgroundImage: 'url(http://www.maxfm.com.tr/files/artists/rick-astley/images/ricast1006.jpg)'}}/></td>
         <td>{speaker.name}</td>
         <td>{speaker.topic}</td>
         <td>Room 2</td>
         <td>12.12.2017</td>
         <td>12.00</td>
         <td>50 Min</td>
      </tr>
   )
}

const SpeakersNotAvailable = () => {
   return (
      <tr>
         <td colSpan="2">No speakers to be listed!</td>
      </tr>
   )
}


class SpeakerList extends React.Component {

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width">
                     <thead>
                     <tr>
                        <th>Level</th>
                        <th>Photo</th>
                        <th style={{width: 120}}>Full Name</th>
                        <th>Title</th>
                        <th style={{width: 100}}>Room</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Duration</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.props.speakers && this.props.speakers.length) ? null : <SpeakersNotAvailable/> }
                     {this.props.speakers ? this.props.speakers.map((speaker)=>{
                        return <ListItem key={speaker.id} speaker={speaker}/>
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