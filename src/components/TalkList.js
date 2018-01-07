import React from 'react';
import Ionicon from 'react-ionicons'
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip'

const ListItem = ({talk, removeTalk, editTalk, speaker, room, presentation}) => {
   return (
      <tr data-tip={presentation ? "Click to Show" : "Click to Edit"} data-for="editTooltip">
         {(!presentation) ?
            <td onClick={() => {
            removeTalk(talk.id)
         }} style={{
            width: "10px",
            textAlign: "center",
            padding: "5px",
            lineHeight: "10px"
         }}><Ionicon icon="ios-remove-circle" fontSize="25px" color="#F44336" /></td> : ''
         }
         <td onClick={()=>{editTalk(talk.id)}} style={{width:"400px"}}>{talk.topic}</td>
         <td onClick={()=>{editTalk(talk.id)}} style={{textAlign:"center"}}>

            {talk.level===0 ?
            <svg width={26} data-tip="Beginner" xmlns="http://www.w3.org/2000/svg" fill="#111" version="1" viewBox="0 0 512 512">
               <path d="M452 220c-9-41-26-82-47-117C373 52 331 0 256 0c-34 0-63 10-89 31-21 16-39 38-60 72a395 395 0 0 0-54 233c4 34 15 64 31 89 14 22 32 40 54 54 45 29 93 33 118 33s73-4 118-33c22-14 40-32 54-54 16-25 27-55 31-89 5-36 2-76-7-116zm-26 112c-7 54-31 94-70 119a194 194 0 0 1-200 0c-39-25-63-65-70-119A343 343 0 0 1 188 57c20-16 42-24 68-24s48 8 68 24a343 343 0 0 1 102 275z"/>
               <path d="M352 147l-26 21c31 39 48 135 22 177l28 18c34-56 15-167-24-216z"/>
            </svg> : talk.level===1 ?
            <svg width={26} data-tip="Intermediate" xmlns="http://www.w3.org/2000/svg" fill="#ff9800" version="1" viewBox="0 0 485 485">
               <path d="M454 119c-5-10-10-19-16-27l27-8c10-4 17-15 14-26-4-10-15-17-26-14l-21 7 6-19c3-11-2-22-12-26s-23 2-26 13l-8 24C357 16 315 1 272 1 170 1 122 77 107 123c-17 52-12 111 15 162l5 9-116 58c-15 8-11 22-9 27 102 161 294 94 337 74 173-96 164-250 115-334zM320 416c-36 18-180 68-270-38l115-57c5-3 17-13 7-31-6-8-10-17-14-24-22-43-26-90-12-131 12-35 48-94 126-94 58 0 115 38 145 96 49 85 38 208-97 279z"/>
               <circle cx="303" cy="107" r="21"/>
            </svg> : talk.level===2 ?
            <svg width={26} data-tip="Advanced" xmlns="http://www.w3.org/2000/svg" fill="#f44336" version="1" viewBox="0 0 425 425">
               <path d="M414 100l-23-44-5-10 4-14a13 13 0 0 0-23-8l-2 5-2-1V13a13 13 0 0 0-25-1v10h-3l-5-12a13 13 0 0 0-23 12l3 5-3 1v1l-9-7a12 12 0 1 0-15 20l4 3c-16 19-49 45-95 62-38 14-94 25-154 3a13 13 0 0 0-16 7 183 183 0 0 0 109 237l21 7 31 39h-3a13 13 0 0 0 0 25h55a12 12 0 1 0 0-25h-21l-27-34a182 182 0 0 0 85-18 183 183 0 0 0 99-115c10-33 6-66-9-94l46-22a12 12 0 0 0 6-17zm-70 136c-14 40-44 72-83 90A158 158 0 0 1 41 224l10 4a13 13 0 1 0 8-24c-14-4-21-11-24-15v-8a91 91 0 0 0 23 5 13 13 0 0 0 1-25c-12-1-18-4-22-6l4-18c61 19 122 9 171-11a61 61 0 0 0 58 51 61 61 0 0 0 81 25 105 105 0 0 1-7 34zm-6-114a12 12 0 0 0-5 19c8 10 13 22 16 34l-9 4c-9 5-19 6-29 2-9-3-17-10-21-20v-2c-3-5-8-8-14-7a36 36 0 0 1-40-38c34-17 60-39 74-57 2-3 5-5 9-6a37 37 0 0 1 50 16l17 33-48 22z"/>
               <path d="M338 60a13 13 0 0 0-13 12c0 4 2 7 4 9 2 3 6 4 9 4s6-1 9-4c2-2 3-5 3-9s-1-6-3-8c-3-3-6-4-9-4z"/>
            </svg>
                     : talk.level===-1 ? <Ionicon data-tip="Break" icon="ios-cafe-outline" fontSize="32px" color="#1da1f2"/> : ''}
         </td>
         <td onClick={()=>{editTalk(talk.id)}} style={{width:"200px"}}>{room ? room.label : ''}</td>
         <td onClick={()=>{editTalk(talk.id)}} style={{width:"200px"}}>{speaker ? speaker.name : ''}</td>
         <td onClick={()=>{editTalk(talk.id)}} style={{textAlign:"center"}}>{("0" + new Date(talk.date*1000).getDate()).slice(-2)+"."+("0" + (new Date(talk.date*1000).getMonth()+1)).slice(-2)+"."+new Date(talk.date*1000).getFullYear()+" "+("0" + new Date(talk.date*1000).getHours()).slice(-2)+":"+("0" + new Date(talk.date*1000).getMinutes()).slice(-2)}</td>
         <td onClick={()=>{editTalk(talk.id)}}><div className="circle">{talk.duration} Min</div></td>
         <td onClick={()=>{editTalk(talk.id)}} className="topics" style={{width:"200px",maxWidth:"200px"}}><div className="ongoing">{talk.tags.length>0 ? talk.tags.map((topic)=>{return <div key={topic} className="room">{topic}</div>}) : talk.level===-1 ? 'Break' : "No tags to be listed"}</div></td>

      </tr>
   )
};

const TalksNotAvailable = () => {
   return (
      <tr className="noBefore">
         <td colSpan="8">No talks to be listed!</td>
      </tr>
   )
};

class TalkList extends React.Component {

   state = {
      isModalOpen:false,
      whatIndex:-1,
      agenda:this.props.agenda,
      active:"",
      mode:0,
   };

   componentWillMount(){
      Modal.setAppElement('body');
   }

   search = (nameKey, myArray) => {
      for (let i = 0; i < myArray.length; i++) {
         if (myArray[i].id === nameKey) {
            return myArray[i];
         }
      }
   };

   removeTalk = (index) => {
      this.setState({
         isModalOpen:true,
         whatIndex:index,
      });
   };

   editTalk = (talkId) => {
      if(this.props.presentation){
         this.props.presente(talkId);
      }else{
         this.props.editTalk(talkId);
      }
   };

   sortTable = (what,type) => {
      let cloneTable = this.props.agenda ? this.props.agenda.slice(0) : [];
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
         return this.props.agenda;
      }
   };

   changeOrder = (which) => {
      if(which===this.state.active){
         if(this.state.mode===1){
            this.setState({
               mode:2,
               agenda:this.sortTable(which, 2),
            });
         }else if(this.state.mode===2){
            this.setState({
               mode:0,
               active:"",
               agenda:this.sortTable(which, 0),
            });
         }
      }else{
         this.setState({
            mode:1,
            active:which,
            agenda:this.sortTable(which, 1),
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
                     <h2>Remove {
                        this.state.agenda && this.state.agenda.find((el)=>{return el.id===this.state.whatIndex}) && this.state.agenda.find((el)=>{return el.id===this.state.whatIndex}).level===-1 ? "Break" : "Talk"
                     }?</h2>
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
                        {!this.props.presentation?<th/>:''}
                        <th onClick={()=>{this.changeOrder("topic")}} style={{width: 40}}>Topic {this.returnIcons("topic")}</th>
                        <th onClick={()=>{this.changeOrder("level")}} style={{width: 195}}>Level {this.returnIcons("level")}</th>
                        <th onClick={()=>{this.changeOrder("room")}}>Room {this.returnIcons("room")}</th>
                        <th onClick={()=>{this.changeOrder("speaker")}} style={{width: 220}}>Speaker {this.returnIcons("speaker")}</th>
                        <th onClick={()=>{this.changeOrder("date")}}>Date {this.returnIcons("date")}</th>
                        <th onClick={()=>{this.changeOrder("duration")}} style={{width: 180}}>Time {this.returnIcons("duration")}</th>
                        <th>Tags</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.state.agenda && this.state.agenda.length) ? null : <TalksNotAvailable/> }
                     {this.state.agenda ? this.state.agenda.map((talk, index)=>{
                        return <ListItem presentation={this.props.presentation} key={talk.id} talk={talk} room={this.search(talk.room,this.props.rooms)} speaker={this.search(talk.speaker,this.props.speakers)} removeTalk={this.removeTalk} editTalk={this.editTalk}/>
                     }) : null}
                     </tbody>
                  </table>
                  <ReactTooltip place="bottom" type="dark" effect="solid"/>
                  <ReactTooltip id="editTooltip" place="bottom" type="dark"  effect="solid"/>
               </div>
            </div>
         </div>

      );
   }
}

export default TalkList