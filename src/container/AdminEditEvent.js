import React from 'react';
import classNames from "classnames";
import * as Silly from "../reducks/modules/silly";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as AdminActions from "../reducks/modules/admin";
import * as EventActions from "../reducks/modules/event";
import Loading from "../components/Loading"


class AdminEditEvent extends React.Component {

    state = {
        active: "",
        eventId: this.props.match.eventId,
        mode: 0,
        event: {},
        activeTab: "general",
        name: "",
        changed: false,
        eventPackages: this.props.eventPackages,
        eventStateResponse: this.props.eventStateResponse,
        eventState: {},
        loading:true,
    };

    componentDidMount() {
        this.props.fetchEvent(this.props.match.params.eventId);
        this.props.getEventPackagesForAdmin();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.event !== this.props.event) {
            this.setState({
               event: nextProps.event,
               eventState: nextProps.event.eventState ? nextProps.event.eventState : null,
               loading: false,
            },()=>{
               this.props.getUserInfoForAdmin(this.state.event.executiveUser);
            });
        }

        if (nextProps.eventPackages !== this.props.eventPackages) {
            this.setState((prevState, props) => ({
                eventPackages: nextProps.eventPackages,
                eventState: prevState.eventState ? prevState.eventState : nextProps.eventPackages.returnObject[0],
            }));
        }

       if (nextProps.userInfo !== this.props.userInfo) {
          this.setState({
             userInfo: nextProps.userInfo,
          });
       }

        if (nextProps.eventStateResponse !== this.props.eventStateResponse) {
            this.setState({
                eventStateResponse: nextProps.eventStateResponse,
                event: nextProps.eventStateResponse.status ? nextProps.eventStateResponse.returnObject : this.state.event,
                changed: false
            });
        }
    }

    save = () => {
        this.props.changeEventPackage(this.state.event.id, this.state.eventState.id);
    };

    changeValue = (event) => {
        let eventState = this.state.eventPackages.filter(state => state.id === event.target.value)[0];

        this.setState({
            eventState: eventState,
            changed: true
        });
    };

    render() {
        return (
            <div className="container mtop">
                <div className="row">
                    <div className="twelve columns">
                        <Loading row="3" loading={this.state.loading}>
                            <div className="row">
                                <div className="twelve columns">
                                    <div className="row">
                                        <div className="twelve columns">
                                            <button data-tip className="backButton" disabled={this.state.changed}
                                                    onClick={() => {
                                                        this.props.history.push("/admin/")
                                                    }}/>
                                            <h2 style={{verticalAlign: "top", display: "inline-block"}}>Edit Event</h2>
                                            <button style={{margin: "10px 30px"}}
                                                   className={classNames('button-primary', {disabled: !this.state.changed})}
                                                   onClick={() => {
                                                if (this.state.changed) {
                                                    this.save()
                                                }
                                                   }} defaultValue={this.state.saveText}>SAVE</button>
                                            <a className={classNames({hidden: !this.state.changed})}
                                               onClick={this.openReset}>Reset</a>
                                            <span
                                                className={classNames("text italic", {hidden: this.state.changed || (this.state.saveText !== "SAVED!" && this.state.saveText !== "SAVE")})}>All changes are saved!</span>
                                            <div className="toRight code">
                                                <small className={"eCodeIndicator"}>Event Code:</small>
                                                {this.props.match.params.eventId}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="tabContainer">
                                <div className={classNames('tab', {'active': this.state.activeTab === "general"})}>
                                    <div className="row mtop50">
                                        <div className="six columns">
                                           <div className="twelve columns">
                                              <h2>Event Info</h2>
                                           </div>
                                            <div className="twelve columns mtop25">
                                                <label htmlFor="event-state-selection">Event Package</label>
                                                <select id="event-state-selection"
                                                        name="packageSelection"
                                                        key="packageSelectionKey"
                                                        onChange={this.changeValue}
                                                        value={this.state.eventState ? this.state.eventState.id : ""}>
                                                    {
                                                        this.state.eventPackages.map((ePackage) => <option
                                                            key={ePackage.id}
                                                            value={ePackage.id}>{ePackage.name}</option>)
                                                    }
                                                </select>
                                            </div>
                                           <div className="twelve columns mtop25">
                                              <label htmlFor="event-state-selection">Event Mail</label>
                                              {this.state.event && this.state.event.about && (this.state.event.about.email || "Not specified")}
                                           </div>



                                        </div>
                                       <div className="six columns">
                                          <div className="twelve columns">
                                             <h2>User Info</h2>
                                          </div>

                                          <div className="twelve columns mtop25">
                                             <label htmlFor="event-state-selection">User Mail</label>
                                             {this.state.userInfo && (this.state.userInfo.email || "Not specified")}
                                          </div>

                                          <div className="twelve columns mtop25">
                                             <label htmlFor="event-state-selection">Username</label>
                                             {this.state.userInfo && (this.state.userInfo.username || "Not specified")}
                                          </div>

                                          <div className="twelve columns mtop25">
                                             <label htmlFor="event-state-selection">User Full Name</label>
                                             {this.state.userInfo && (this.state.userInfo.fullname || "Not specified")}
                                          </div>

                                          <div className="twelve columns mtop25">
                                             <label htmlFor="event-state-selection">User Role</label>
                                             {this.state.userInfo && (this.state.userInfo.role || "Not specified")}
                                          </div>
                                       </div>
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


const mapStateToProps = (state) => {
    console.log(state);
    return {
        fetch: state.event,
        event: state.event.event,
        auth: state.auth,
        silly: state.silly,
        eventPackages: state.admin.eventPackages,
        eventStateResponse: state.admin.eventStateResponse,
        userInfo: state.admin.userInfo,
    }
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({...EventActions, ...AdminActions, ...Silly}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditEvent)