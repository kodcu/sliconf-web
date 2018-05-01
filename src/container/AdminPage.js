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
        users: {
            returnObject:[]
        },
        events: {
            returnObject:[]
        }
    };

    componentWillMount() {
        this.props.getUsersForAdmin();
        this.props.getEventsForAdmin();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.admin && nextProps.admin.events && this.props.admin.events !== nextProps.admin.events) {
            this.setState({
                events: nextProps.admin.events
            });
        }

        if (nextProps.admin && nextProps.admin.users && this.props.admin.users !== nextProps.admin.users) {
            this.setState({
                users: nextProps.admin.users
            });
        }
    }

    addUserInfoToEvents = () => {
        if(this.state.events &&
            this.state.events.returnObject && this.state.events.returnObject.length >0 &&
            this.state.users &&
            this.state.users.returnObject && this.state.users.returnObject.length >0) {


            let events = this.state.events.returnObject;

            for(let i =0; i<this.state.events.returnObject.length; i++) {
                for(let j=0; j<this.state.users.returnObject.length; j++) {
                    if(this.state.events.returnObject[i].executiveUser === this.state.users.returnObject[j].id) {
                        events[i]["userObject"] = {
                            username : this.state.users.returnObject[j].username,
                            fullname : this.state.users.returnObject[j].fullname,
                            email : this.state.users.returnObject[j].email,
                        };
                    }
                }
            }
            return events;
        }

        return this.state.events.returnObject;
    };

    render() {
        return (
            <div className="container mtop">
                <div className="row">
                    <div className="twelve columns">
                        <PageHead where={"/"}
                                  title="Admin Page" {...this.props} />
                        <Loading row="3" loading={this.props.admin.eventLoading}>
                            <AdminEventList title="Events" events={this.addUserInfoToEvents()} {...this.props}/>
                        </Loading>
                        <Loading row="3" loading={this.props.admin.userLoading}>
                            <AdminUserList title="Users" users={this.state.users.returnObject} {...this.props}/>
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