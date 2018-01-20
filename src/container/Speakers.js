import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as SpeakerActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import SpeakerList from "../components/SpeakerList";
import * as Silly from '../reducks/modules/silly'

class Speakers extends React.Component {

   state = {
     speakers:[]
   };

   componentWillMount(){
      this.props.fetchEventSpeakers(this.props.match.params.eventId);
   }

   componentWillReceiveProps(nextProps){
      if(this.props.speaker !== nextProps.speaker){
         this.setState({
            speakers: nextProps.speaker ? nextProps.speaker.speakers : [],
         },()=>{
            if(this.state.speakers && this.state.speakers.length>0) {
               this.props.changeStep(30);
            }else{
               this.props.changeStep(19);
            }
         })
      }
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead where={"/events/"+this.props.match.params.eventId+"/edit"} title="Speakers" {...this.props} />
                  <Loading row="3" loading={this.props.speaker.loading}>
                     <SpeakerList eventId={this.props.match.params.eventId} speakers={this.props.speaker.speakers} topProps={this.props}/>
                     <div className="row mtop25 mbottom100">
                        <div className="twelve columns">
                           <Link to={"/events/"+this.props.match.params.eventId+"/addspeaker"} className="button button-primary">Add Speaker</Link>
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
      silly: state.silly,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...SpeakerActions,...Silly}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers)