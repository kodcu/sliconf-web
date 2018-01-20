import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SpeakerActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import ImageUpload from '../components/ImageUpload'
import * as Silly from '../reducks/modules/silly'

class AddSpeaker extends React.Component {

   state = {
      id:null,
      fullName: '',
      image:'',
      detail: '',
      workingAt: '',
      linkedin: '',
      twitter: '',
      edit:false,
   };

   search = (nameKey, myArray) => {
      for (let i = 0; i < myArray.length; i++) {
         if (myArray[i].id === nameKey) {
            return myArray[i];
         }
      }
   };

   getSpeakerData = () => {
      return {
         id:this.state.id ? this.state.id : null,
         name: this.state.fullName,
         profilePicture: this.state.image,
         about: this.state.detail,
         workingAt: this.state.workingAt,
         linkedin: this.state.linkedin,
         twitter: this.state.twitter,
      }
   };

   componentWillMount(){
      if(this.props.match.params.redirected === "redirected"){
         this.props.fetchEventSpeakers(this.props.match.params.eventId);
      }
      this.props.changeStep(26);
   }

   componentDidMount(){
      if(this.props.match.params.speakerId){
         //console.log(this.props.speakers.speakers);
         this.setState({
            edit:true,
            id:this.search(this.props.match.params.speakerId,this.props.speakers.speakers).id,
            fullName:this.search(this.props.match.params.speakerId,this.props.speakers.speakers).name,
            image:this.search(this.props.match.params.speakerId,this.props.speakers.speakers).profilePicture,
            detail:this.search(this.props.match.params.speakerId,this.props.speakers.speakers).about,
            workingAt:this.search(this.props.match.params.speakerId,this.props.speakers.speakers).workingAt,
            linkedin:this.search(this.props.match.params.speakerId,this.props.speakers.speakers).linkedin,
            twitter:this.search(this.props.match.params.speakerId,this.props.speakers.speakers).twitter,
         })
      }
   }

   componentWillReceiveProps(nextProps) {
      //console.log("new", nextProps);
      if (nextProps.speakers && this.props.speakers !== nextProps.speakers) {
         if(!nextProps.speakers.loading){
            if(nextProps.speakers.added){
               this.props.history.push("/events/"+this.props.match.params.eventId+"/speakers");
            }
         }
      }
   }

   addSpeaker = () => {
      if(this.state.fullName) {
         let cloneSpeakers = this.props.speakers.speakers ? this.props.speakers.speakers.slice(0) : [];
         if(this.state.edit){
            //console.log(this.props);
            cloneSpeakers.map((key, index) => {
               //console.log(key.name);
               if (key.id === this.props.match.params.speakerId) {
                  cloneSpeakers[index] = this.getSpeakerData();
               }
               return true;
            });
         }else{
            cloneSpeakers.push({...this.getSpeakerData()});
         }
         this.props.addSpeaker(this.props.match.params.eventId, cloneSpeakers)
      }
   };

   changeValue = (name) => {
      return (e) => {
         this.setState({[name]: e.target.value})
      }
   };

   onImageLoaded = (image) => {
      this.setState({image})
   };

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead where={"/events/"+this.props.match.params.eventId+"/speakers"} title={this.state.edit ? "Edit Speaker" : "Add Speaker"} {...this.props} />
                  <div className="row">
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <input autoFocus className="moving u-full-width" type="text" id="fullname"
                                     value={this.state.fullName} onChange={this.changeValue('fullName')}/>
                              <label htmlFor="fullname">Full Name</label>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <input className="moving u-full-width" type="text" id="worksat"
                                     value={this.state.workingAt} onChange={this.changeValue('workingAt')}/>
                              <label htmlFor="worksat">Works At</label>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="pass">Detail</label>
                              <textarea style={{minHeight: 110}} className="u-full-width" value={this.state.detail}
                                        onChange={this.changeValue('detail')}/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="six columns">
                              <input type="text" className="moving u-full-width" value={this.state.linkedin} id="linkedin"
                                     onChange={this.changeValue('linkedin')}/>
                              <label htmlFor="linkedin">linkedin</label>
                           </div>
                           <div className="six columns">
                              <input type="text" className="moving u-full-width" value={this.state.twitter} id="twitter"
                                     onChange={this.changeValue('twitter')}/>
                              <label htmlFor="twitter">twitter</label>
                           </div>
                        </div>
                     </div>
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <ImageUpload onLoad={this.onImageLoaded} logo={"https://app.sliconf.com/api/image/get/"+this.state.image}>
                                 {this.state.image ?
                                    <div className="row">
                                       <div className="twelve columns">
                                          <div className="resim" style={{backgroundImage: 'url("https://app.sliconf.com/api/image/get/' + this.state.image + '")'}} width="100%" alt=""/>
                                       </div>
                                    </div>: ''}
                              </ImageUpload>
                           </div>
                        </div>

                     </div>
                  </div>
                  <div className="row mtop50">
                     <div className="six columns">
                        <input className={'button-primary'} disabled={!this.state.fullName} type="submit" onClick={this.addSpeaker} defaultValue="Save"/>
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
      image: state.image,
      speakers: state.speaker,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...SpeakerActions,...Silly}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpeaker)