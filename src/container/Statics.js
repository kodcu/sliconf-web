import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as EventActions from '../reducks/modules/event'
import {connect} from 'react-redux';

class EventSuccess extends Component {

   state = {
      eventId:this.props.match.eventId,
      users:839,
      approved:94,
      unapproved:26,
      mostQuestionedSpeech:"Microservices and Future",
      mostLikedQuestion:"What will change with Java 9?",
   };

   componentWillMount() {
         /*this.setState({
            key:this.props.event.statics.key
         });*/
   }


   render() {
      return (
            <div className="container mtop">
               <div className="row">
                  <div className="twelve columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2>Statics</h2>
                        </div>
                     </div>

                  </div>
               </div>
               <div className="row">
                  <div className="four columns">
                     <h4>Total Users</h4>
                     <h2 className="code">{this.state.users}</h2>
                  </div>
                  <div className="four columns">
                     <h4>Approved Questions</h4>
                     <h2 className="code">{this.state.approved}</h2>
                  </div>
                  <div className="four columns">
                     <h4>Unapproved Questions</h4>
                     <h2 className="code">{this.state.unapproved}</h2>
                  </div>
               </div>
               <div className="row">
                  <div className="twelve columns">
                     <h4>Most Questioned Speech</h4>
                     <h2>{this.state.mostQuestionedSpeech}</h2>
                  </div>
               </div>
               <div className="row">
                  <div className="twelve columns">
                     <h4>Most Liked Question</h4>
                     <h2>{this.state.mostLikedQuestion}</h2>
                  </div>
               </div>
               <div className="row">
                  <div className="twelve columns">
                     <h4>Share</h4>
                     <button>facebook</button> <button>twitter</button> <button>instagram</button>
                  </div>
               </div>
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
   return {...bindActionCreators(EventActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSuccess)