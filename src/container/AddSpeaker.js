import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EvensActions from '../reducks/modules/event'
import PageHead from "../components/PageHead";
import DatePicker from 'react-datepicker';
import moment from 'moment';

class AddSpeaker extends React.Component {

   state = {
      fullName:'',
      level:'beginner',
      title:'',
      room:'0',
      detail:'',
      startDate:moment().unix() * 1000,
      duration:''
   }

   addSpeaker = () => {
      this.props.addSpeaker(this.props.match.eventId,{...this.state})
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