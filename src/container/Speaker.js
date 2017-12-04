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

   componentDidMount(){
      if(this.props.speaker.speakers[this.props.match.params.speakerId]) {
         //console.log(this.props.match.params.eventId, this.props.match.params.speakerId)
         //console.log(this.props.speaker.speakers[this.props.match.params.speakerId]);
         this.setState({
            eventId: this.props.match.params.eventId,
            id: this.props.match.params.speakerId,
            image: this.props.speaker.speakers[this.props.match.params.speakerId].profilePicture,
            name: this.props.speaker.speakers[this.props.match.params.speakerId].name,
            workingat: this.props.speaker.speakers[this.props.match.params.speakerId].workingAt,
            about: this.props.speaker.speakers[this.props.match.params.speakerId].about,
            topic: this.props.speaker.speakers[this.props.match.params.speakerId].topics,
            twitter: this.props.speaker.speakers[this.props.match.params.speakerId].twitter,
            linkedin: this.props.speaker.speakers[this.props.match.params.speakerId].linkedin,
         })
      }else{
         //konusmacilar serverdan cekilmediyse onceki sayfaya at ki ceksin
         this.props.history.push("/events/"+this.props.match.params.eventId+"/speakers");
      }
   }

   deleteSpeaker = () => {
      let cloneSpeakers = this.props.speaker.speakers ? this.props.speaker.speakers.slice(0) : [];

      cloneSpeakers.splice(Number(this.props.match.params.speakerId), 1);

      this.props.addSpeaker(this.props.match.params.eventId, cloneSpeakers)
   };

   componentWillReceiveProps(nextProps){
      console.log("bisi olduuuuu");
      console.log(nextProps);
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
                  <div className="four columns">
                     {this.state.image ? <div className="resim noTouch" width="100%" style={{backgroundImage: "url('http://app.sliconf.com:8090/service/image/get/"+this.state.image+"')", float:"left"}}/>:''}

                  </div>
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
                                 <div key={topic} className="room" style={{background: "gainsboro",margin:'0 5px 5px 0'}}>{topic}</div>
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