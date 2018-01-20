import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EventActions from '../reducks/modules/event'
import EventList from "../components/EventList";
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import * as Silly from '../reducks/modules/silly'

class Events extends Component {

   componentWillMount(){
      this.props.fetchEvents(this.props.auth.user.id);
   }

   componentWillReceiveProps(nextProps){
      if(nextProps.event && !nextProps.event.loading && this.props.event !== nextProps.event){
         if(!((nextProps.event && nextProps.event.active && nextProps.event.passive) && (nextProps.event.active.length > 0 || nextProps.event.passive.length > 0))){
            this.props.changeStep(1);
         }else{
            this.props.changeStep(24);
         }
      }
   }

   render() {
      return (

         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead where={"nowhere"} title="Events" {...this.props} />
                  <Loading row="3" loading={this.props.event.loading}>
                     {(this.props.event && this.props.event.active && this.props.event.passive) && (this.props.event.active.length > 0 || this.props.event.passive.length > 0) ?
                        <div>
                           {this.props.event.active.length > 0 ? <EventList title="Upcoming Events" events={this.props.event.active} {...this.props}/> : ''}
                           {this.props.event.passive.length > 0 ? <EventList title="Finished Events" events={this.props.event.passive} {...this.props}/> : ''}
                        </div>
                     :<div className="twelve columns"><div><h4>Let's create your first event!</h4></div></div>}
                  </Loading>
                  <div className="row mtop25 mbottom100">
                     <div className="twelve columns">
                        <Link onClick={()=>{this.props.changeStep(3, "eventName", false)}} to={(this.props.event && this.props.event.active && this.props.event.passive) && (this.props.event.active.length > 0 || this.props.event.passive.length > 0)
                           ? "/addevent" : "/addevent/first"} className="button button-primary">Create An Event</Link>
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
      silly: state.silly,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...EventActions, ...Silly}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)

