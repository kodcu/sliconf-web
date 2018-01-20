import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as talkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import TalkList from "../components/TalkList";
import * as Silly from '../reducks/modules/silly'

class PresentationSelect extends React.Component {

   state={
      agenda:this.props.speaker.agenda,
      speakers:this.props.speaker,
      rooms:this.props.speaker.rooms
   };

   componentWillMount(){
      this.props.fetchEventTalks(this.props.match.params.eventId);
      this.props.changeStep(28);
   }

   componentWillReceiveProps(nextProps){
      if(this.props.speaker !== nextProps.speaker){
         this.setState({
            agenda:nextProps.speaker.agenda,
            speakers:nextProps.speaker.speakers,
            rooms:nextProps.speaker.rooms,
         });
      }
   }

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
   return bindActionCreators({...talkActions, ...Silly}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(PresentationSelect)