import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as talkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import talkList from "../components/TalkList";

class Talks extends React.Component {

   componentWillMount(){
      console.log("ye")
      this.props.fetchEventTalks(this.props.match.params.eventId);
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead title="All Talks"/>
                  <Loading row="3" loading={this.props.talk.loading}>
                     <talkList talks={this.props.talk.talks}/>
                  </Loading>
               </div>
            </div>
         </div>
      );
   }
}


const mapStateToProps = (state, ownProps) => {
   return {
      talk: state.talk,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(talkActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Talks)