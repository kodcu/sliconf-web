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
        console.log();
        return statusDetails ? (
            <div className="row">
                <div className="twelve columns" style={{ marginLeft: 0 }}>
                    <div className="percentageBar">
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