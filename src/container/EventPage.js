import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import {bindActionCreators} from 'redux';
import * as EventActions from '../reducks/modules/event'
import moment from 'moment';

class EventPage extends Component {

   componentWillReceiveProps(nextProps) {
      if (this.props.event.error !== nextProps.event.error) {
         this.setState({warning: true})
      }

      //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
      if ((this.props.event !== nextProps.event)) {
         if (nextProps.event.status === false) {
            //Yanlis girdi, mesaj bas
            this.setState({warning: true, message: nextProps.event.message})
         } else {
            //Dogru girildi, storela
            console.log("Event name : " + this.state.event_name)
            console.log("Event time : " + this.state.event_time)
            console.log("Event code : " + this.props.event.key)
            this.props.history.push('/addeventsuccess')
         }
      }
   }

   constructor(props) {
      super(props)
      this.state = {
         event_name: "",
         event_time:moment().unix() * 1000
      };
   }

   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]:moment(date).unix() * 1000})
      }
   }

   createEvent = () => {
      var t = moment( this.state.event_time );
      var formatted = t.format("YYYY-MM-DDTHH:mm:ss.000");
      this.props.createEvent(this.props.user.id,this.state.event_name, formatted)
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <div className="row">
                     <div className="twelve columns">
                        <h2 style={{color: '#29b573'}}>Add Event</h2>
                        <h4>Let's create your Event.</h4>
                     </div>
                  </div>
                  <div className="row mtop50">
                     <div className="three columns">
                        <label htmlFor="name">Event Name</label>
                        <input className={"u-full-width"} type="text" placeholder="i.e. Javaday" id="name" value={this.state.event_name}
                               onChange={(e) => this.setState({event_name: e.target.value})}/>
                     </div>
                  </div>
                  <div className="row mtop25">
                     <div className="three columns">
                        <label htmlFor="date">Event date</label>
                        <DatePicker
                           className="u-full-width"
                           selected={moment(this.state.event_time)}
                           onChange={this.changeDateValue('event_time')}
                        />
                     </div>
                  </div>
                  <div className="row mtop50 mbottom100">
                     <div className="six columns">
                        <button className="button-primary" onClick={this.createEvent}>next</button>
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
      user: state.auth.user,
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(EventActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
