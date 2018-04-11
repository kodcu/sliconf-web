import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AdminActions from '../reducks/modules/admin'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import * as Silly from '../reducks/modules/silly'
import AdminEventList from "../components/admin/AdminEventList";
import AdminUserList from "../components/admin/AdminUserList";

class AdminPage extends React.Component {

    state = {
        users: [],
        events: []
    };

    componentWillMount() {
        this.props.getUsersForAdmin();
        this.props.getEventsForAdmin();
    }//ase

    componentWillReceiveProps(nextProps) {
        if (this.props.speaker !== nextProps.speaker) {
            this.setState({
                // speakers: nextProps.speaker ? nextProps.speaker.speakers : [],
            }, () => {
                /*
                if (this.state.speakers && this.state.speakers.length > 0) {
                    this.props.changeStep(30);
                } else {
                    this.props.changeStep(19);
                }
                */
            })
        }
    }

    render() {
        return (
            <div className="container mtop">
                <div className="row">
                    <div className="twelve columns">
                        <PageHead where={"/"}
                                  title="Admin Page" {...this.props} />
                        <Loading row="3" loading={this.props.admin.eventLoading}>
                            <AdminEventList title="Events" events={this.props.admin.events.returnObject} {...this.props}/>
                        </Loading>
                        <Loading row="3" loading={this.props.admin.userLoading}>
                            <AdminUserList title="Users" users={this.props.admin.users.returnObject} {...this.props}/>
                        </Loading>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        admin: state.admin,
        auth: state.auth,
        silly: state.silly,
    }
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {...bindActionCreators({...AdminActions, ...Silly}, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)