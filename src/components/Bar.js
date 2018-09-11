import React, {Component} from 'react';
import RealDatePicker from 'react-datepicker';
import moment from 'moment';

class DatePicker extends Component {
    state = {
        perc:this.props.percentage || 0,
    };

    componentDidMount(){
        
    }

    componentWillReceiveProps(nextProps){
        console.log("Bar", nextProps);
    }


    render() {
        return (
            <div className="bar">
                {this.props.children}
                <div className="inner-bar" style={{width:this.state.perc+"%"}}>
                    <div className="notInterrupt">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default DatePicker