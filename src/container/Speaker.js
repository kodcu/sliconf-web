import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as EventActions from '../reducks/modules/event'
import * as SpeakerActions from '../reducks/modules/speaker'
import {connect} from 'react-redux';
import Ionicon from 'react-ionicons'

class Speaker extends Component {

   state = {
      eventId:'',
      id:"",
      image:"",
      name: "",
      workingat: "",
      about: "",
      topic: "",
      twitter: "",
      linkedin: "",
   };

   search = (nameKey, myArray) => {
      for (let i = 0; i < myArray.length; i++) {
         if (myArray[i].id === nameKey) {
            return myArray[i];
         }
      }
   };

   componentDidMount(){
      if(this.search(this.props.match.params.speakerId,this.props.speaker.speakers)) {
         //console.log(this.props.match.params.eventId, this.props.match.params.speakerId)
         //console.log(this.search(this.props.match.params.speakerId,this.props.speaker.speakers));
         //console.log(this.search(this.props.match.params.speakerId,this.props.speaker.speakers).topics);
         this.setState({
            eventId: this.props.match.params.eventId,
            id: this.props.match.params.speakerId,
            image: this.search(this.props.match.params.speakerId,this.props.speaker.speakers).profilePicture,
            name: this.search(this.props.match.params.speakerId,this.props.speaker.speakers).name,
            workingat: this.search(this.props.match.params.speakerId,this.props.speaker.speakers).workingAt,
            about: this.search(this.props.match.params.speakerId,this.props.speaker.speakers).about,
            topic: this.search(this.props.match.params.speakerId,this.props.speaker.speakers).topics,
            twitter: this.search(this.props.match.params.speakerId,this.props.speaker.speakers).twitter,
            linkedin: this.search(this.props.match.params.speakerId,this.props.speaker.speakers).linkedin,
         })
      }else{
         //konusmacilar serverdan cekilmediyse onceki sayfaya at ki ceksin
         this.props.history.push("/events/"+this.props.match.params.eventId+"/speakers");
      }
   }

   deleteSpeaker = () => {
      let cloneSpeakers = this.props.speaker.speakers ? this.props.speaker.speakers.slice(0) : [];

      cloneSpeakers.splice(Number(this.props.speaker.speakers.findIndex((el)=>{return el.id === this.props.match.params.speakerId})), 1);

      this.props.addSpeaker(this.props.match.params.eventId, cloneSpeakers)
   };

   componentWillReceiveProps(nextProps){
      //console.log(nextProps);
      if(nextProps.speaker !== this.props.speaker){
         if(!nextProps.speaker.loading){
            this.props.history.push("/events/"+this.props.match.params.eventId+"/speakers");
         }
      }
   }

   render() {
      return (
            <div className="container mtop">
               <div className="row">
                  {this.props.history.length > 1 ? <button className="backButton" onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/speakers")}} /> : ''}
               </div>
               <div className="row">
                  {this.state.image ?<div className="four columns">
                      <div className="resim noTouch" width="100%" style={{backgroundImage: "url('http://app.sliconf.com:8090/service/image/get/"+this.state.image+"')", float:"left"}}/>
                  </div>:''}
                  <div className="six columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2>{this.state.name}</h2>
                        </div>
                     </div>
                     { this.state.about ?
                        <div className="row">
                           <div className="twelve columns">
                              <h4>Description</h4>
                              <p>{this.state.about}</p>
                           </div>
                        </div>: ''
                     }
                     {this.state.workingat ?
                        <div className="row">
                           <div className="twelve columns">
                              <h4>Working At</h4>
                              <p>{this.state.workingat}</p>
                           </div>
                        </div> : ''
                     }
                     {this.state.topic ?
                        <div className="row" style={{marginBottom:"10px"}}>
                           <div className="twelve columns">
                              <h4>Topics</h4>
                              {this.state.topic.map((topic) =>
                                 <div key={topic} onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/talks")}} className="room" style={{background: "gainsboro",margin:'0 5px 5px 0'}}>{topic}</div>
                              )}
                           </div>
                        </div> : ''
                     }
                     {this.state.twitter || this.state.linkedin ?
                        <div className="row">
                           <div className="twelve columns">
                              <h4>Links</h4>
                              <p>
                                 {this.state.twitter ? <a onClick={() => {
                                    window.open(this.state.twitter, "_blank")
                                 }}><Ionicon icon="logo-twitter" fontSize="32px" color="#1da1f2"/></a> : ''}
                                 {" "}
                                 {this.state.linkedin ? <a onClick={() => {
                                    window.open(this.state.linkedin, "_blank")
                                 }}><Ionicon icon="logo-linkedin" fontSize="32px" color="#0077b5"/></a> : ''}
                              </p>
                           </div>
                        </div> : ''
                     }
                     <div className="row">
                        <div className="twelve columns">
                           <h4>Advanced</h4>
                           <button className="button-green" onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/editspeaker/"+this.props.match.params.speakerId);}}>EDIT SPEAKER</button>{' '}
                           <button className="button-red" onClick={()=>{this.deleteSpeaker()}}>DELETE SPEAKER</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      speaker: state.speaker,
      event: state.event,
      user: state.auth.user,
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...EventActions,...SpeakerActions}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Speaker)