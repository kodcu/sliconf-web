import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TalkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';
import * as EventActions from '../reducks/modules/event';
import DatePicker from 'react-datepicker';
import Loading from "../components/Loading";

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
      speakers:[],
      rooms:[],
      loading:true,
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

   componentWillMount(){
      this.props.fetchEvent("K123");
   }


   componentWillReceiveProps(nextProps) {
      if (nextProps.event && this.props.event !== nextProps.event) {
         this.setState({
            speakers:nextProps.event.speakers,
            rooms:nextProps.event.rooms,
            loading:false,
         });
      }
   }

   addTalk = () => {
      this.props.addTalk(this.props.match.params.eventId, {...this.getTalkData()})
   };

   changeValue = (name) => {
      return (e) => {
         this.setState({[name]: e.target.value})
      }
   };

   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]: moment(date).unix() * 1000})
      }
   };

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <Loading row="3" loading={this.state.loading}>
                  <PageHead title="Add Talk"/>
                  <div className="row">
                     <div className="six columns">
                        <div className="row">
                           <div className="twelve columns">
                              <label>Speaker</label>
                              <select className="u-full-width" value={this.state.speaker} onChange={this.changeValue('speaker')}>
                                 {this.state.speakers.map((sponsor)=><option key={sponsor.id} value={sponsor.id}>{sponsor.name}</option>)}
                              </select>
                           </div>
                        </div>
                        <div className="row">
                           <div className="twelve columns">
                              <label htmlFor="topic">Topic</label>
                              <input className="u-full-width" type="text"
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
                                 {this.state.rooms.map((room)=><option key={room.id} value={room.id}>{room.label}</option>)}
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
                              <input type="number" className="u-full-width" value={this.state.duration} onChange={this.changeValue('duration')}/>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="row mtop50 mbottom100">
                     <div className="six columns">
                        <input className={classNames('button-primary')} type="submit" onClick={this.addTalk} defaultValue="ADD SPEAKER"/>
                     </div>
                  </div>
                  </Loading>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      event: state.event.event,
      talk: state.talk,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...EventActions,...TalkActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTalk)