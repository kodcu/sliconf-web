import React, {Component} from 'react';
import {connect} from 'react-redux';
import DatePicker from 'react-datepicker';
import {bindActionCreators} from 'redux';
import * as EventActions from '../reducks/modules/event'
import moment from 'moment';
import classNames from 'classnames'
import PageHead from "../components/PageHead";

class EventPage extends Component {

   state = {
      isFirst:"",
      warning: true,
      message: "",
      type:'',
      checkBox:false,
   };

   componentWillReceiveProps(nextProps) {
      //console.log(this.props.event);
      if (this.props.event.error !== nextProps.event.error) {
         this.setState({warning: true})
      }

      //Birden fazla componentWillReceiveProps cagirilmasin diye bu sekilde sarmalaniyor
      if ((this.props.event !== nextProps.event)) {
         //console.log(nextProps.event.status)
         if (nextProps.event.status === false) {
            //Yanlis girdi, mesaj bas
            this.setState({warning: true, message: nextProps.event.message, type:nextProps.event.status ? "info" : "error"})
         } else if (nextProps.event.status === true){
            if(nextProps.event.creation !== this.props.event.creation){
               //Dogru girildi, storela
               //console.log("Event name : " + this.state.event_name)
               //console.log("Event time : " + this.state.event_time)
               //console.log("Event code : " + this.props.event.key)
               this.props.history.push('/addeventsuccess')
            }
         }
      }
   }

   constructor(props) {
      super(props)
      this.state = {
         event_name: "",
         event_time:(Math.floor(moment().unix()/3600)+1)*3600 * 1000,
         event_duration:0,
         event_duration_days:1,
      };
   }

   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]:moment(date).unix() * 1000})
      }
   };
   //sasasasasasas
   createEvent = () => {
      if(this.state.event_duration<=0 && this.state.event_duration>24) {
         this.setState({warning: true, message: "You must enter a valid duration.", type:"error"})
      }else if(this.state.event_duration_days<1) {
         this.setState({warning: true, message: "You must enter a valid day.", type:"error"})
      }else{
         let t = moment( this.state.event_time ).unix()*1000;
         let et = moment(  this.state.event_time + (24*60*60*(this.state.event_duration_days-1)*1000) + (this.state.event_duration*60*60*1000)).unix()*1000;
         this.props.createEvent(this.props.user.id,this.state.event_name, t, et)
      }
   };

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <div className="row">
                     <PageHead where={"/events"} title="Add Event" {...this.props} />
                     <h4>Let's create {this.props.match.params.isFirst==="first" ? 'your first' : 'an'} event.</h4>
                  </div>
                  <div className={classNames('row warning', {'show': this.state.warning})}>
                     <div className="twelve columns">
                        <h4 className={this.state.type}>{this.state.message}</h4>
                     </div>
                  </div>
                  <div className="row mtop50">
                     <div className="six columns">
                        <input autoFocus className={"moving u-full-width"} type="text" id="name" value={this.state.event_name}
                               onChange={(e) => this.setState({event_name: e.target.value})}/>
                        <label htmlFor="name">Event Name</label>
                     </div>
                  </div>
                  <div className="row mtop25">
                     <div className="six columns">
                        <label htmlFor="date">Event date</label>
                        <DatePicker
                           dateFormat="DD MMMM YYYY, dddd, HH:mm"
                           locale={"en"}
                           showTimeSelect
                           timeIntervals={60}
                           className="u-full-width"
                           minDate={moment()}
                           maxDate={moment().add(5, "years")}
                           selected={moment(this.state.event_time)}
                           selectsStart
                           onChange={this.changeDateValue('event_time')}
                           popperPlacement="bottom-end"
                           readOnly={true}
                        />
                     </div>
                  </div>
                  <div className="row mtop25">
                     <div className="six columns">
                        <input className={"moving u-full-width"} type="text" id="duration" value={this.state.event_duration}
                               onChange={(e) => this.setState({event_duration: e.target.value})}/>
                        <label htmlFor="duration">Event Duration (Hours)</label>
                     </div>
                  </div>
                  <div className="row mtop25">
                     <div className="six columns">
                        <input type="checkbox" className="customInput" id={"askCheck"} onChange={(e)=>{
                           this.setState({checkBox:e.currentTarget.checked});
                        }}/><label htmlFor="askCheck" id={"askCheckLabel"} className="betterCheck">This event will take more than one day. </label>
                     </div>
                  </div>
                  <div className={classNames('row mtop25', {'hidden': !this.state.checkBox})}>
                     <div className="six columns">
                        <input className={"moving u-full-width"} type="text" id="duration" value={this.state.event_duration_days}
                               onChange={(e) => this.setState({event_duration_days: e.target.value})}/>
                        <label htmlFor="duration">Event Duration (Days)</label>
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
