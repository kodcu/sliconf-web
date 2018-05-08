import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as EventActions from '../reducks/modules/event'
import {connect} from 'react-redux';
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import * as Silly from '../reducks/modules/silly'

class Statistics extends Component {

   state = {
      loading:true,
      eventId:this.props.match.eventId,
      users:0,
      usersUnique:0,
      approved:0,
      unapproved:0,
      mostQuestionedSpeech:"",
      mostLikedQuestion:"",
   };

   componentWillReceiveProps(nextProps){
      if(nextProps.event && nextProps.event.statics && nextProps.event.statics !== this.props.event.statics && !nextProps.event.loading){
         //console.log(nextProps.event.statics);
         this.setState({
            loading:false,
            approved:nextProps.event.statics.approvedComments,
            unapproved:nextProps.event.statics.deniedComments,
            users:nextProps.event.statics.totalUsers.allFetched,
            usersUnique:nextProps.event.statics.totalUsers.uniqueCount,
            mostQuestionedSpeech:nextProps.event.statics.mostCommentedSession ? nextProps.event.statics.mostCommentedSession.topic : '-',
            mostLikedQuestion:nextProps.event.statics.mostLikedComment ? nextProps.event.statics.mostLikedComment.commentValue : '-',
         })
      }

   }

   componentWillMount() {
         this.props.getStatics(this.props.match.params.eventId);
         this.props.changeStep(23);
   }


   render() {
      return (
            <div className="container mtop">
               <PageHead where={"/events/"+this.props.match.params.eventId+"/edit"} title="Statistics" {...this.props} />
               <Loading row="3" loading={this.state.loading}>
                  <div className="row">
                     <div className="three columns">
                        <h6>Total Views</h6>
                        <h2 className="code">{this.state.users}</h2>
                     </div>
                     <div className="three columns">
                        <h6>Unique Users</h6>
                        <h2 className="code">{this.state.usersUnique}</h2>
                     </div>
                     <div className="three columns">
                        <h6>Approved Questions</h6>
                        <h2 className="code">{this.state.approved}</h2>
                     </div>
                     <div className="three columns">
                        <h6>Unapproved Questions</h6>
                        <h2 className="code">{this.state.unapproved}</h2>
                     </div>
                  </div>
                  <div className="row">
                     <div className="twelve columns">
                        <h6>Most Questioned Speech</h6>
                        <h2>{this.state.mostQuestionedSpeech}</h2>
                     </div>
                  </div>
                  <div className="row">
                     <div className="twelve columns">
                        <h6>Most Liked Question</h6>
                        <h2>{this.state.mostLikedQuestion}</h2>
                     </div>
                  </div>
               </Loading>
               {/*
                  <div className="row">
                     <div className="twelve columns">
                        <h4>Share</h4>
                        <button>facebook</button>
                        <button>twitter</button>
                        <button>instagram</button>
                     </div>
                  </div>
               */}
            </div>
      );
   }
}
const mapStateToProps = (state, ownProps) => {
   return {
      event: state.event,
      user: state.auth.user,
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...EventActions,...Silly}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)