import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as EventActions from '../reducks/modules/event'
import { connect } from 'react-redux';
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import * as Silly from '../reducks/modules/silly'
import Ionicon from 'react-ionicons'
import SpeakerListVote from "../components/SpeakerListVote";

class SpeakersVote extends Component {

      state = {
            loading: false,
            eventId: this.props.match.eventId,
            active:"",
            mode: 0,
            votes:[],
      };

      componentWillReceiveProps(nextProps) {
            if (this.props.statics !== nextProps.statics) {
               console.log(nextProps.statics);
                  this.setState({
                     votes: nextProps.statics ? nextProps.statics : [],
                  }, () => {

                  })
            }

      }

      componentWillMount() {
            this.props.getVotes(this.props.match.params.eventId);
            this.props.changeStep(23);
      }


      returnIcons = (what) => {
            return this.state.active === what ? this.state.mode === 1
                  ? <Ionicon icon={"ios-arrow-up"} style={{ verticalAlign: "top" }} />
                  : <Ionicon icon={"ios-arrow-down"} style={{ verticalAlign: "top" }} />
                  : <Ionicon icon={"ios-remove"} style={{ verticalAlign: "top" }} />
      };

      render() {
            return (

                  <div className="container mtop">
                        <PageHead where={"/events/" + this.props.match.params.eventId + "/statistics"} title="Speakers Vote" {...this.props} />
                        <Loading row="3" loading={this.state.loading}>
                              <SpeakerListVote eventId={this.props.match.params.eventId} speakers={this.state.votes} topProps={this.props} />
                        </Loading>
                  </div>
            );
      }
}
const mapStateToProps = (state, ownProps) => {
      return {
            event: state.event,
            user: state.auth.user,
            statics: state.event.statics,
            auth: state.auth,
            silly: state.silly,
      }
}

const mapDispatchToProps = (dispatch, ownProps) => {
      return { ...bindActionCreators({ ...EventActions, ...Silly }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpeakersVote)