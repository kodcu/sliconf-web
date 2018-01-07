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
                        <Link to={(this.props.event && this.props.event.active && this.props.event.passive) && (this.props.event.active.length > 0 || this.props.event.passive.length > 0)
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
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(EventActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Events)

