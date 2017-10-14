import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class EventPage extends Component {

   constructor(props) {
      super(props)
      this.state = {
         startDate: moment()
      };
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(date) {
      this.setState({
         startDate: date
      });
   }

   createEvent() {
      console.log("Event name : " + this.state.event_name)
      console.log("Event time : " + this.state.startDate)
      //TODO send event_name & time as props
      this.props.history.push('/addeventsuccess')
   }

   state = {
      event_name: "",
      event_time: ""
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <div className="row">
                     <div className="twelve columns">
                        <h2 style={{color: '#29b573'}}>
                           Add Event</h2>
                        <h4>Let's create your Event.</h4>
                     </div>
                  </div>
                  <div className="row mtop50">
                     <div className="six columns">
                        <label htmlFor="name">Event Name</label>
                        <input type="text" placeholder="i.e. Javaday" id="name" value={this.state.event_name}
                               onChange={(e) => this.setState({event_name: e.target.value})}/>
                     </div>
                  </div>
                  <div className="row mtop25">
                     <div className="six columns">
                        <label htmlFor="date">Event date</label>
                        <DatePicker
                           selected={this.state.startDate}
                           onChange={this.handleChange}
                        />
                     </div>
                  </div>
                  <div className="row mtop50 mbottom100">
                     <div className="six columns">
                        <input className="button-primary" type="submit" defaultValue="next"
                               onClick={() => this.createEvent()}/>
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
      user: state.auth.user,
      loggingIn: state.auth.loggingIn
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventPage)
