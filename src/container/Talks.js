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
   };

   componentWillReceiveProps(nextProps){
      if(this.props.speaker.agenda !== nextProps.speaker.agenda){
         this.setState({
            agenda:nextProps.speaker.agenda
         });
      }
   }

   componentWillMount(){
      this.props.fetchEventTalks(this.props.match.params.eventId);
   }

   removeTalk = (index) => {
      let cloneAgenda = this.props.speaker.agenda ? this.props.speaker.agenda.slice(0) : [];
      cloneAgenda.splice(Number(index), 1);
      this.props.addTalk(this.props.match.params.eventId, cloneAgenda)
   };

   editTalk = (index) => {
      this.props.history.push("/events/"+this.props.match.params.eventId+"/edittalk/"+index);
   };

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead title="Agenda"/>
                  <Loading row="3" loading={this.props.speaker.loading}>
                     {console.log(this.props.speaker)}
                     <TalkList editTalk={this.editTalk} agenda={this.state.agenda} removeTalk={this.removeTalk}/>
                     <div className="row mtop25 mbottom100">
                        <div className="twelve columns">
                           <Link to="./addtalk" className="button button-primary">Add Talk</Link>{' '}
                           <Link to="./addbreak" className="button button-primary" disabled={true}>Add Break</Link>
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
};


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...talkActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Talks)