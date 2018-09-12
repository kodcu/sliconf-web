import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as EventActions from '../reducks/modules/event'
import { connect } from 'react-redux';
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import * as Silly from '../reducks/modules/silly';
import Bar from "../components/Bar";

class StatisticsSurvey extends Component {

    state = {
        loading: false,
        eventId: this.props.match.eventId,
        surveys:[
            {
                id:"surveyId1",
                name:'Survey 1',
                description:"Survey Desc",
                participants:6,
                viewers:12,
                questions:[
                    {
                        text: 'Hello World?',
                        totalVoters:100,
                        options:[
                            {
                                id:"fidan",
                                text:'Answer 1',
                                voters:62,
                            },
                            {
                                id:"zilan",
                                text:'Answer 2',
                                voters:12,
                            },
                            {
                                id:"filan",
                                text:'Answer 3',
                                voters:2,
                            },
                            {
                                id:"falan",
                                text:'Answer 4',
                                voters:24,
                            },                        
                        ]
                    },
                ]
            },
            {
                id:"surveyId2",
                name:'Survey 2',
                description:"Survey 2 Desc",
                participants:4,
                viewers:22,
                questions:[
                    {
                        text: 'Hello World 2?',
                        totalVoters:100,
                        options:[
                            {
                                id:"fidan",
                                text:'Answer 1',
                                voters:62,
                            },
                            {
                                id:"zilan",
                                text:'Answer 2',
                                voters:12,
                            },
                            {
                                id:"filan",
                                text:'Answer 3',
                                voters:2,
                            },
                            {
                                id:"falan",
                                text:'Answer 4',
                                voters:24,
                            },                        
                        ]
                    },
                    {
                        text: 'Hello World 3?',
                        totalVoters:74,
                        options:[
                            {
                                id:"fidan",
                                text:'Answer 1',
                                voters:62,
                            },
                            {
                                id:"zilan",
                                text:'Answer 2',
                                voters:12,
                            }                
                        ]
                    },
                ]
            },
        ]
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.event && nextProps.event.statics && nextProps.event.statics !== this.props.event.statics && !nextProps.event.loading) {
            //console.log(nextProps.event.statics);
            this.setState({
                loading: false,
            })
        }

    }

    componentWillMount() {
        //this.props.getStatics(this.props.match.params.eventId);
        this.props.changeStep(23);
    }


    render() {

        let viewers = this.state.surveys.reduce(function(acc, val) { return acc + val.viewers; }, 0);
        let participants = this.state.surveys.reduce(function(acc, val) { return acc + val.participants; }, 0);
        let percentage = Math.round(participants/viewers*10000)/100

        return (
            <div className="container mtop">
                <PageHead where={"/events/" + this.props.match.params.eventId + "/statistics"} title="Survey Statistics" {...this.props} />
                <Loading row="3" loading={this.state.loading}>
                    <div className="row">
                        <div className="three columns">
                            <h6>Total Views</h6>
                            <h2 className="code">{viewers}</h2>
                        </div>
                        <div className="three columns">
                            <h6>Unique Participants</h6>
                            <h2 className="code">{participants}</h2>
                        </div>
                        <div className="three columns">
                            <h6>Percentage</h6>
                            <h2 className="code">%{percentage}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="twelve columns mtop100">
                            <h2>Surveys</h2>
                        </div>
                    </div>
                    {this.state.surveys.map(survey=>{
                        return (
                            <div className="mtop50">
                                <h3>{survey.name}</h3>
                                    {survey.questions.map(question=>{
                                        let most = Math.round(Math.max.apply(Math, question.options.map(a=>a.voters))/question.totalVoters*10000)/100;
                                        return (
                                            <div className="mtop25">
                                                <div className="row">
                                                    <div className="twelve columns">
                                                        <h5>{question.text}</h5> 
                                                    </div>
                                                </div>
                                                {question.options.map(answer=>{   
                                                    let percentage = Math.round(answer.voters/question.totalVoters*10000)/100;
                                                    let shownPercentage = (100*percentage)/most;
                                                    return (
                                                        <div className="row">
                                                            <div className="twelve columns">
                                                            <h4><Bar percentage={shownPercentage}>{answer.text} %{percentage}</Bar></h4>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ) 
                                    })}
                            </div>
                        )
                    })}
                    <br /><br /><br /><br /><br />
                </Loading>
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
    return { ...bindActionCreators({ ...EventActions, ...Silly }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsSurvey)