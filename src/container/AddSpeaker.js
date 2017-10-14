import React from 'react';
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EvensActions from '../reducks/modules/event'
import PageHead from "../components/PageHead";
import DatePicker from 'react-datepicker';
import moment from 'moment';

const ImageInfo = ({image,onCancel}) => {
   return (
      <div className="row">
         <div className="two columns">
            <img src={image.preview} width="100%" alt=""/>
         </div>
         <div className="six columns">
            <p><strong>{image.name}</strong> (<small>{Math.ceil(image.size/1024)} kbs</small>)</p>
            <p><button className="button-primary">Upload</button> <button className="button-primary" onClick={onCancel}>Cancel</button></p>
         </div>
      </div>
   )
}

class AddSpeaker extends React.Component {

   state = {
      fullName:'',
      level:'beginner',
      title:'',
      room:'0',
      detail:'',
      startDate:moment().unix() * 1000,
      duration:'',
      image:null
   }

   getSpeakerData = () => {
      return {
         fullName:this.state.fullName,
         level:this.state.level,
         title:this.state.title,
         room:this.state.room,
         detail:this.state.detail,
         startDate:this.state.startDate,
         duration:this.state.duration
      }
   }

   addSpeaker = () => {
      this.props.addSpeaker(this.props.match.eventId,{...this.getSpeakerData()})
   }

   changeValue = (name) => {
      return (e) => {
         this.setState({[name]:e.target.value})
      }
   }
   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]:moment(date).unix() * 1000})
      }
   }

   onDropFiles = (acceptedFiles, rejectedFiles) => {
      if(acceptedFiles.length){
         this.setState({image:acceptedFiles[0]})
      }
   }

   imageUploadView = () => {
      if(this.state.image){
         return <ImageInfo image={this.state.image} onCancel={()=>this.setState({image:null})}/>
      }else{
         return <Dropzone
            accept="image/jpeg, image/png"
            onDrop={this.onDropFiles}
         >
            <p><small>Try dropping speaker photo here, or click to select files to upload.</small></p>
            <p><small>Only *.jpeg and *.png images will be accepted</small></p>
         </Dropzone>
      }
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead title="Add Speaker"/>
                  <div className="row">
                     <div className="twelve columns">
                        {this.imageUploadView()}
                     </div>
                  </div>
                  <div className="row">
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="email">Full Name</label>
                              <input className="u-full-width" type="email" placeholder="i.e. martin fowler" value={this.state.fullName} onChange={this.changeValue('fullName')} />
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="username">Title</label>
                              <input className="u-full-width" type="text" placeholder="i.e. microservices" value={this.state.title} onChange={this.changeValue('title')} />
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="pass">Detail</label>
                              <textarea style={{minHeight: 110}} className="u-full-width" value={this.state.detail} onChange={this.changeValue('detail')} />
                           </div>
                        </div>
                     </div>
                     <div className="six columns">
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
                     </div>
                  </div>
                  <div className="row mtop50">
                     <div className="six columns">
                        <input className="button-primary" type="submit" defaultValue="next" />
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
      event: state.event,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(EvensActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpeaker)