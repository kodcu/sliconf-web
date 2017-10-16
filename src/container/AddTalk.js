import React from 'react';
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TalkActions from '../reducks/modules/speaker'
import * as ImageActions from '../reducks/modules/image'
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';
import DatePicker from 'react-datepicker';

class AddTalk extends React.Component {

   state = {
      speaker:'',
      topic:'',
      detail:'',
      startsAt:'',
      level:'',
      room:'',
      startDate:moment.now(),
      duration:'',
   }

   getTalkData = () => {
      return {
         speaker: this.state.speaker,
         detail: this.state.detail,
         workingAt: this.state.workingAt,
         linkedin: this.state.linkedin,
         twitter: this.state.twitter
      }
   }

   componentWillReceiveProps(nextProps) {

   }

   addTalk = () => {
      if(this.state.imageId){
         this.props.addTalk(this.props.match.params.eventId, {...this.getTalkData()})
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
                  <PageHead title="Add Talk"/>
                  <div className="row">
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <label>Speaker</label>
                              <select className="u-full-width" value={this.state.speaker} onChange={this.changeValue('speaker')}>
                                 <option value="spe1">Martin Fowler</option>
                                 <option value="spe2">John Smith</option>
                              </select>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="topic">Topic</label>
                              <input className="u-full-width" type="text" placeholder="i.e. microservices"
                                     value={this.state.topic} onChange={this.changeValue('topic')}/>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="pass">Detail</label>
                              <textarea style={{minHeight: 110}} className="u-full-width" value={this.state.detail}
                                        onChange={this.changeValue('detail')}/>
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
                              <label htmlFor="date">talk date</label>
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
                  <div className="row mtop50 mbottom100">
                     <div className="six columns">
                        <input className={classNames('button-primary')} type="submit" onClick={this.addTalk} defaultValue="next"/>
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
      talk: state.talk,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...TalkActions,...ImageActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTalk)