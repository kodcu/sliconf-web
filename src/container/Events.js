import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EventActions from '../reducks/modules/event'
import EventList from "../components/EventList";
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";

class Events extends Component {

   componentWillMount(){
      this.props.fetchEvents(this.props.auth.user.id);
   }

   render() {
      return (

         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead title="Events"/>
                  <Loading row="3" loading={this.props.event.loading}>
                        <EventList title="Upcoming Events" events={this.props.event.active} {...this.props}/>
                        <EventList title="Finished Events" events={this.props.event.passive} {...this.props}/>
                  </Loading>
                  <div className="row mtop25 mbottom100">
                     <div className="twelve columns">
                        <Link to="/addevent" className="button button-primary">Create An Event</Link>
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
   return {...bindActionCreators(EventActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)

