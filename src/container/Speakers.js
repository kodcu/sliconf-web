import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as SpeakerActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import SpeakerList from "../components/SpeakerList";

class Speakers extends React.Component {

   componentWillMount(){
      this.props.fetchEventSpeakers(this.props.match.params.eventId);
   }


   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead title="All Speakers"/>
                  <Loading row="3" loading={this.props.speaker.loading}>
                     <SpeakerList eventId={this.props.match.params.eventId} speakers={this.props.speaker.speakers} topProps={this.props}/>
                     <div className="row mtop25 mbottom100">
                        <div className="twelve columns">
                           <Link to="./addspeaker" className="button button-primary">Add Speaker</Link>
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
      speaker: state.speaker,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(SpeakerActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers)