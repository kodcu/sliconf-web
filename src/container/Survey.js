import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as talkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import TalkList from "../components/TalkList";
import * as Silly from '../reducks/modules/silly'

class Survey extends React.Component {

    state = {
        agenda: this.props.speaker.agenda,
        speakers: this.props.speaker,
        rooms: this.props.speaker.rooms,

        question: '',
        option1: '',
        option2: '',
    };

    componentWillMount() {
        this.props.fetchEventTalks(this.props.match.params.eventId);
        this.props.changeStep(28);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.speaker !== nextProps.speaker) {
            this.setState({
                agenda: nextProps.speaker.agenda,
                speakers: nextProps.speaker.speakers,
                rooms: nextProps.speaker.rooms,
            });
        }
    }

    render() {
        return (
            <div className="container mtop">
                <div className="row">
                    <div className="twelve columns">

                        <PageHead where={"/events/" + this.props.match.params.eventId + "/edit"} title="Survey" {...this.props} />
                        <Loading row="3" loading={this.props.speaker.loading}>

                            <div className="row">
                                <div className="seven columns">
                                    <input maxLength="50" autoFocus className="moving u-full-width" type="text" id="question" value={this.state.question} onChange={(e) => this.setState({ question: e.currentTarget.value, changed: true })} />
                                    <label htmlFor="question">Question</label>
                                </div>
                            </div>

                            <div className="nine columns">
                                <div className="four columns">
                                    <input maxLength="50" className="moving u-full-width" type="text" id="option1" value={this.state.option1} onChange={(e) => this.setState({ option1: e.currentTarget.value, changed: true })} />
                                    <label htmlFor="option1">Option 1</label>
                                </div>
                            </div>

                            <div className="nine columns">
                                <div className="four columns">
                                    <input maxLength="50" className="moving u-full-width" type="text" id="option2" value={this.state.option2} onChange={(e) => this.setState({ option2: e.currentTarget.value, changed: true })} />
                                    <label htmlFor="option2">Option 2</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="column mtop50">
                                    <div className="twelwe columns">
                                        <input className="button button-primary" type="submit" defaultValue="Save" />
                                    </div>
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
    return bindActionCreators({ ...talkActions, ...Silly }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey)