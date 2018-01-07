import React from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as talkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import TalkList from "../components/TalkList";

class Talks extends React.Component {

   state={
      agenda:this.props.speaker.agenda,
      speakers:this.props.speaker,
      rooms:this.props.speaker.rooms
   };

   componentWillReceiveProps(nextProps){
      //console.log(nextProps.speaker.rooms)
      if(this.props.speaker !== nextProps.speaker){
         this.setState({
            agenda:nextProps.speaker.agenda,
            speakers:nextProps.speaker.speakers,
            rooms:nextProps.speaker.rooms,
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

   presente = (item) => {
      //zero one two ... (ayni karakter varsa bir sonraki harfi alir)
      let numberToText = "ZOTHFISEGN";
      let number = this.state.agenda.findIndex((el)=>{return el.id===item});
      let text = "";
      for(let i=0;i<number.toString().length;i++){
         text += numberToText[number.toString()[i]];
      }
      this.props.history.push("/p/"+this.props.match.params.eventId+""+text);
   };



   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  {(this.props.speaker.startDate===this.props.speaker.endDate) ?
                     <div><h1>Sorry!</h1><p>Events start and end date cannot be same.</p><button onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/edit")}}>GO TO EDIT EVENT</button></div>
                     : <div>
                        <PageHead where={"/events/"+this.props.match.params.eventId+"/edit"} title="Select a Talk to Present" {...this.props} />
                        <Loading row="3" loading={this.props.speaker.loading}>
                           <TalkList presentation={true} presente={this.presente} agenda={this.state.agenda} removeTalk={this.removeTalk} speakers={this.state.speakers} rooms={this.state.rooms}/>
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
   return bindActionCreators({...talkActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Talks)