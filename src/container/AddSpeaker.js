import React from 'react';
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SpeakerActions from '../reducks/modules/speaker'
import * as ImageActions from '../reducks/modules/image'
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';

class AddSpeaker extends React.Component {

   state = {
      fullName: '',
      detail: '',
      workingAt: '',
      imageId: null,
      linkedin: '',
      twitter: '',
   }

   getSpeakerData = () => {
      return {
         imageId: this.state.imageId,
         fullName: this.state.fullName,
         detail: this.state.detail,
         workingAt: this.state.workingAt,
         linkedin: this.state.linkedin,
         twitter: this.state.twitter
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.image.id && this.props.image.id !== nextProps.image.id) {
         this.setState({imageId: nextProps.image.id})
      }
      if (nextProps.speaker && this.props.speaker !== nextProps.speaker) {
         setTimeout(()=>{
            // yüklendi bildirimi çıkarılabilir
            //this.props.history.push('/events/'+this.props.match.params.eventId+'/speakers')
         },2000)
      }
   }

   addSpeaker = () => {
      if(this.state.imageId){
         this.props.addSpeaker(this.props.match.params.eventId, {...this.getSpeakerData()})
      }
   }

   changeValue = (name) => {
      return (e) => {
         this.setState({[name]: e.target.value})
      }
   }

   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]: moment(date).unix() * 1000})
      }
   }

   onDropFiles = (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length) {
         //this.setState({image: acceptedFiles[0]})
         this.props.uploadImage(acceptedFiles[0])
      }
   }

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
                              <input className="u-full-width" type="email" placeholder="i.e. martin fowler"
                                     value={this.state.fullName} onChange={this.changeValue('fullName')}/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="username">Works At</label>
                              <input className="u-full-width" type="text" placeholder="i.e. microservices"
                                     value={this.state.title} onChange={this.changeValue('title')}/>
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
                     </div>
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <Dropzone
                                 accept="image/jpeg, image/png"
                                 onDrop={this.onDropFiles}
                                 style={{}}
                                 className={"resimHolder"}
                              >
                                 {this.state.imageId ? <div className="row">
                                    <div className="twelve columns">
                                       {/* img url mocktur */}
                                       <div className="resim" style={{backgroundImage: 'url("http://i.pravatar.cc/150?img=' + this.state.imageId + '")'}} width="100%" alt=""></div>
                                    </div>
                                 </div>: ''}
                              </Dropzone>
                           </div>
                        </div>
                        {/*
                        <div className="row">
                           <div className="six columns">
                              <label htmlFor="exampleRecipientInput">Level</label>
                              <select className="u-full-width" value={this.state.level} onChange={this.changeValue('level')}>
                                 <option value="beginner">Beginner</option>
                                 <option value="intermediate">Intermediate</option>
                                 <option value="advanced">Advanced</option>
                              </select>
                           </div>
                        </div>
                        <div className="row">
                           <div className="six columns">
                              <label htmlFor="exampleRecipientInput">Room</label>
                              <select className="u-full-width" value={this.state.room} onChange={this.changeValue('room')}>
                                 <option value="0">Room 1</option>
                                 <option value="1">Room 2</option>
                                 <option value="2">Room 3</option>
                              </select>
                           </div>
                        </div>
                        <div className="row">
                           <div className="six columns">
                              <label htmlFor="date">Event date</label>
                              <DatePicker
                                 showTimeSelect
                                 timeIntervals={5}
                                 className="u-full-width"
                                 dateFormat="LLL"
                                 selected={moment(this.state.startDate)}
                                 onChange={this.changeDateValue('startDate')}
                              />
                           </div>
                        </div>

                        <div className="row">
                           <div className="six columns">
                              <label>Duration(<small>minutes</small>)</label>
                              <input type="number" className="u-full-width" value={this.state.duration} onChange={this.changeValue('duration')} placeholder="i.e. 50"/>
                           </div>
                        </div>
                        */}
                     </div>
                  </div>
                  <div className="row mtop50">
                     <div className="six columns">
                        <input className={classNames('button-primary',{disabled:!this.state.imageId})} type="submit" onClick={this.addSpeaker} defaultValue="next"/>
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
      speaker: state.speaker,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...SpeakerActions,...ImageActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpeaker)