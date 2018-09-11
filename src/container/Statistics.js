import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as EventActions from '../reducks/modules/event'
import { connect } from 'react-redux';
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import * as Silly from '../reducks/modules/silly'
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip'
import Ionicon from 'react-ionicons'

class Statistics extends Component {

      state = {
            loading: true,
            eventId: this.props.match.eventId,
            users: 0,
            usersUnique: 0,
            approved: 0,
            unapproved: 0,
            mostQuestionedSpeech: "",
            mostLikedQuestion: "",
            active: "",
            mode: 0,
            speakers: [],
            activeTab: "statistics",
      };

      componentWillReceiveProps(nextProps) {
            if (nextProps.event && nextProps.event.statics && nextProps.event.statics !== this.props.event.statics && !nextProps.event.loading) {
                  //console.log(nextProps.event.statics);
                  this.setState({
                        loading: false,
                        approved: nextProps.event.statics.approvedComments,
                        unapproved: nextProps.event.statics.deniedComments,
                        users: nextProps.event.statics.totalUsers.allFetched,
                        usersUnique: nextProps.event.statics.totalUsers.uniqueCount,
                        mostQuestionedSpeech: nextProps.event.statics.mostCommentedSession ? nextProps.event.statics.mostCommentedSession.topic : '-',
                        mostLikedQuestion: nextProps.event.statics.mostLikedComment ? nextProps.event.statics.mostLikedComment.commentValue : '-',
                  })
            }

            if (this.props.speaker !== nextProps.speaker) {
                  this.setState({
                        speakers: nextProps.speaker ? nextProps.speaker.speakers : [],
                  }, () => {
                        if (this.state.speakers && this.state.speakers.length > 0) {
                              this.props.changeStep(30);
                        } else {
                              this.props.changeStep(19);
                        }
                  })
            }

      }

      componentWillMount() {
            this.props.getStatics(this.props.match.params.eventId);
            this.props.changeStep(23);
      }


      returnIcons = (what) => {
            return this.state.active === what ? this.state.mode === 1
                  ? <Ionicon icon={"ios-arrow-up"} style={{ verticalAlign: "top" }} />
                  : <Ionicon icon={"ios-arrow-down"} style={{ verticalAlign: "top" }} />
                  : <Ionicon icon={"ios-remove"} style={{ verticalAlign: "top" }} />
      };

      instantGratification = (fn, delay) => {
            if (fn()) {
                  return setInterval(fn, delay);
            }
      };

      changeTab = (tab) => {

            this.setState({
                  nextTab: tab,
            });
            this.setState({activeTab:tab});
            this.props.history.push("/events/"+this.props.match.params.eventId+"/"+tab);

      };

      render() {
            return (

                  <div className="container mtop">
                        <PageHead where={"/events/" + this.props.match.params.eventId + "/edit"} title="Statistics" {...this.props} />
                        <Loading row="3" loading={this.state.loading}>
                              <div className="container u-full-width tabs">
                                          <li className={classNames('navbar-item', { 'active': this.state.activeTab === "statistics" })}
                                                onClick={(e) => this.changeTab('statistics')}><a className="navbar-link">General</a></li>
                                          <li className={classNames('navbar-item', { 'active': this.state.activeTab === "statisticsSurvey" })}
                                                onClick={(e) => this.changeTab('statisticsSurvey')}><a className="navbar-link">Survey Statistics</a></li>
                                          <li className={classNames('navbar-item', { 'active': this.state.activeTab === "speakersVote" })}
                                                onClick={(e) => this.changeTab('speakersVote')}><a className="navbar-link">Speakers Vote</a></li>
                              </div>

                              <div className="row mtop50">
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

                        </Loading>
                  </div>
            );
      }
}
const mapStateToProps = (state, ownProps) => {
      return {
            event: state.event,
            user: state.auth.user,
            speaker: state.speaker,
            auth: state.auth,
            silly: state.silly,
      }
}

const mapDispatchToProps = (dispatch, ownProps) => {
      return { ...bindActionCreators({ ...EventActions, ...Silly }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statistics)