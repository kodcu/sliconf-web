import React from 'react';
import Ionicon from 'react-ionicons'
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip'

const ListItem = ({talk, removeTalk, index}) => {
   return (
      <tr>
         <td onClick={()=>{removeTalk(index)}} style={{width:"10px", textAlign:"center",padding: "5px", lineHeight: "10px"}}><Ionicon icon="ios-remove-circle" fontSize="25px" color="#F44336" /></td>
         <td style={{width:"400px"}}>{talk.topic}</td>
         <td style={{textAlign:"center"}}><Ionicon data-tip={talk.level===0 ? "Beginner" : talk.level===1 ? "Intermediate" : talk.level===2 ? "Advanced" : 'Not Specified'} icon={talk.level===0 ? "ios-arrow-down" : talk.level===1 ? "ios-remove" : talk.level===2 ? "ios-arrow-up" : 'ios-help'} fontSize="25px" color={talk.level===0 ? "#29b573" : talk.level===1 ? "orange" : talk.level===2 ? "#F44336" : 'black'}/></td>
         <td style={{width:"200px"}}>{talk.speaker}</td>
         <td style={{textAlign:"center"}}>{("0" + new Date(talk.date*1000).getDate()).slice(-2)+"."+("0" + (new Date(talk.date*1000).getMonth()+1)).slice(-2)+"."+new Date(talk.date*1000).getFullYear()+" "+("0" + new Date(talk.date*1000).getHours()).slice(-2)+":"+("0" + new Date(talk.date*1000).getMinutes()).slice(-2)}</td>
         <td>{talk.duration}</td>
         <td className="topics" style={{width:"200px",maxWidth:"200px"}}><div className="ongoing">{talk.tags.map((topic)=>{return <div key={topic} className="room">{topic}</div>})}</div></td>
         <ReactTooltip place="bottom" type="dark" effect="solid"/>
      </tr>
   )
};

const TalksNotAvailable = () => {
   return (
      <tr className="noBefore">
         <td colSpan="7">No talks to be listed!</td>
      </tr>
   )
};

class TalkList extends React.Component {

   state = {
      isModalOpen:false,
      whatIndex:-1,
   };

   removeTalk = (index) => {
      this.setState({
         isModalOpen:true,
         whatIndex:index,
      });
   };

   render() {
      return (
         <div className="row">
            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.isModalOpen}
               onRequestClose={()=>{this.setState({isModalOpen:false})}}
               contentLabel="Are you sure?"
               style={{content : {width:400,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Remove Talk?</h2>
                     <p>You CANNOT undo this action.</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={()=>{this.setState({isModalOpen:false})}}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <button onClick={()=>{this.props.removeTalk(this.state.whatIndex);}} className={"button-primary"}>REMOVE</button>
                     </div>
                  </div>
               </div>
            </Modal>
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width events agenda">
                     <thead>
                     <tr>
                        <th/>
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