import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as talkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import TalkList from "../components/TalkList";
import * as Silly from '../reducks/modules/silly'

class Talks extends React.Component {

   state={
      agenda:this.props.speaker.agenda,
      speakers:this.props.speaker,
      rooms:this.props.speaker.rooms,
      loading:true,
   };

   componentWillReceiveProps(nextProps){
      //console.log(nextProps.speaker.rooms)
      if(this.props.speaker !== nextProps.speaker){
         this.setState({
            agenda:nextProps.speaker.agenda,
            speakers:nextProps.speaker.speakers,
            rooms:nextProps.speaker.rooms,
            loading:nextProps.speaker.loading,
         }, ()=>{
            if(this.state.agenda && this.state.agenda.length>0) {
               this.props.changeStep(31);
            }else{
               this.props.changeStep(29);
            }
         });
      }
   }

   componentWillMount(){
      this.props.fetchEventTalks(this.props.match.params.eventId);
   }

   removeTalk = (index) => {
      let cloneAgenda = this.props.speaker.agenda ? this.props.speaker.agenda.slice(0) : [];
      cloneAgenda.splice(Number(cloneAgenda.findIndex((el)=>{return el.id===index})), 1);
      this.props.addTalk(this.props.match.params.eventId, cloneAgenda)
   };

   editTalk = (index) => {
      if(this.state.agenda.find((el)=>{return el.id===index}).level===-1){
         this.props.history.push("/events/"+this.props.match.params.eventId+"/editbreak/"+index);
      }else{
         this.props.history.push("/events/"+this.props.match.params.eventId+"/edittalk/"+index);
      }
   };

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  {(this.props.speaker.startDate===this.props.speaker.endDate) ?
                     <div><h1>Sorry!</h1><p>Events start and end date cannot be same.</p><button onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/edit")}}>GO TO EDIT EVENT</button></div>
                     : <div>
                        <PageHead where={"/events/"+this.props.match.params.eventId+"/edit"} title="Agenda" {...this.props} />
                        <Loading row="3" loading={this.state.loading}>
                           <TalkList editTalk={this.editTalk} agenda={this.state.agenda} removeTalk={this.removeTalk} speakers={this.state.speakers} rooms={this.state.rooms}/>
                           <div className="row mtop25 mbottom100">
                              <div className="twelve columns">
                                 <Link to={"/events/"+this.props.match.params.eventId+"/addtalk"} className="button button-primary">Add Talk</Link>{' '}
                                 <Link to={"/events/"+this.props.match.params.eventId+"/addbreak"} className="button button-primary" disabled={true}>Add Break</Link>
                              </div>
                           </div>
                        </Loading>
                     </div>
                  }
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
};


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...talkActions, ...Silly}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Talks)