import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SpeakerActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import ImageUpload from '../components/ImageUpload'

class AddSpeaker extends React.Component {

   state = {
      fullName: '',
      image:'',
      detail: '',
      workingAt: '',
      linkedin: '',
      twitter: '',
      topicsRaw:'',
      topics:[],
   };

   getSpeakerData = () => {
      return {
         name: this.state.fullName,
         profilePicture: this.state.image,
         detail: this.state.detail,
         workingAt: this.state.workingAt,
         linkedin: this.state.linkedin,
         twitter: this.state.twitter,
         topics:  this.state.topics,
      }
   };

   componentWillReceiveProps(nextProps) {
      if (nextProps.speakers && this.props.speakers !== nextProps.speakers) {
         if(!nextProps.speakers.loading){
            this.props.history.push("/events/"+this.props.match.params.eventId+"/speakers");
         }
      }
   }
   //sasasasasasasasasasasasasasasasasasas
   addSpeaker = () => {
      if(this.state.fullName){
         console.log(this.props);
         let keke = this.props.speakers.speakers.slice(0);
         keke.push({...this.getSpeakerData()});
         this.props.addSpeaker(this.props.match.params.eventId, keke)
      }
   };

   cleanArray = (actual) => {
      let newArray = [];
      for (let i = 0; i < actual.length; i++) {
         if (actual[i] && actual[i].trim()) {
            newArray.push(actual[i]);
         }
      }
      let uniqueArray = [];
      uniqueArray = newArray.filter(function(item, pos, self) {
         return self.indexOf(item) === pos;
      })

      return uniqueArray;
   };

   changeValue = (name) => {
      return (e) => {
         if(name==="topicsRaw"){
            this.setState({
               topics:this.cleanArray(e.target.value.split(","))
            });
         }
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
                  <PageHead title="Add Speaker"/>
                  <div className="row">
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="email">Full Name</label>
                              <input className="u-full-width" type="email"
                                     value={this.state.fullName} onChange={this.changeValue('fullName')}/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="username">Works At</label>
                              <input className="u-full-width" type="text"
                                     value={this.state.workingAt} onChange={this.changeValue('workingAt')}/>
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
                              <label htmlFor="pass">linkedin</label>
                              <input type="text" className="u-full-width" value={this.state.linkedin}
                                     onChange={this.changeValue('linkedin')}/>
                           </div>
                           <div className="six columns">
                              <label htmlFor="pass">twitter</label>
                              <input type="text" className="u-full-width" value={this.state.twitter}
                                     onChange={this.changeValue('twitter')}/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="username">Topics</label>
                              <input className="u-full-width" type="text"
                                     value={this.state.topicsRaw} onChange={this.changeValue('topicsRaw')}/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              {this.state.topics.map((value,index)=>{
                                 return <div className={"room"} key={index} style={{background:"gainsboro"}}>{value}</div>
                              })}
                           </div>
                        </div>
                     </div>
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <ImageUpload onLoad={this.onImageLoaded} logo={"http://app.sliconf.com:8090/service/image/get/"+this.state.image}>
                                 {this.state.image ?
                                    <div className="row">
                                       <div className="twelve columns">
                                          <div className="resim" style={{backgroundImage: 'url("http://app.sliconf.com:8090/service/image/get/' + this.state.image + '")'}} width="100%" alt=""/>
                                       </div>
                                    </div>: ''}
                                 }
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
   return bindActionCreators({...SpeakerActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpeaker)