import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RoomActions from '../reducks/modules/room';
import * as EventActions from '../reducks/modules/event';

class ProgressBar extends React.Component {

    state = {
        status: this.props.status,
        statusDetails: this.props.statusDetails,
    };

    locations = {
        //required
        "At least one floor must be added": "floorplan",
        "At least one room must be added": "rooms",
        "At least one speaker must be added": "speakers",
        "At least one agenda must be added": "agenda",
        "Event location must be filled correctly": "contact",
        //optional
        "Event description can be added": "general",
        "Event logo can be added": "general",
        "Web site address can be added": "contact",
        "E-mail address can be added": "contact",
        //fallback for undefined
        undefined: "general"
    };

    componentWillReceiveProps(nextProps) {
        console.log("eventGuncellendi");
        if (nextProps.statusDetails && nextProps.statusDetails !== this.props.statusDetails) {
            this.setState({
                statusDetails: nextProps.statusDetails
            });
        }
    }

    render() {
        let { statusDetails, status } = this.state;
        let errorMsg = statusDetails.failed[0];
        errorMsg = errorMsg ? errorMsg : statusDetails.optionalFailed[0];
        console.log(errorMsg);
        return statusDetails ? (
            <div className="row">
                <div className="twelve columns" style={{ marginLeft: 0 }}>
                    <div className="percentageBar" onClick={()=>{this.props.changeTab(this.locations[errorMsg])}}>
                        <div className="innerPercentageBar" style={{backgroundColor:statusDetails.failed.length>0?"#f44336":statusDetails.optionalFailed.length>0?"#ffc107":"#2ab573",minWidth: (statusDetails ? statusDetails.percentage : 0)+"%"}}>
                            {
                                statusDetails.failed.length>0 ? statusDetails.failed[0] : 
                                statusDetails.optionalFailed.length>0 ? statusDetails.optionalFailed[0] : 
                                statusDetails.percentage===100 ? "Your event is successfully created and can be viewed on mobile!":""
                            } ({statusDetails.percentage}%)
                        </div>
                    </div>
                </div>
            </div>
        ) : "";
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    }
};


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ ...EventActions, ...RoomActions }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)