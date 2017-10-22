import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import * as EventActions from '../reducks/modules/event'
import {connect} from 'react-redux';

class EventSuccess extends Component {

   state = {
      key:""
   };

   componentWillReceiveProps(nextProps) {
      if ((this.props.event !== nextProps.event)) {
         console.log(nextProps.event.creation.key)
            this.setState({
               key:nextProps.event.creation.key
            });
      }
   }


   render() {
      return (
            <div className="container mtop">
               <div className="row">
                  <div className="twelve columns">
                     <div className="row">
                        <div className="twelve columns">
                           <h2>Congratulations!</h2>
                           <h4>Your event has successfully created.</h4>
                        </div>
                     </div>

                     <div className="row mtop50">
                        <div className="six columns">
                           <p>You can use this code to search your event.</p>
                           <h2 className="code">{this.state.key}</h2>
                        </div>
                     </div>


                     <div className="row mtop100">
                        <div className="six columns">
                           <button className="button button-primary" onClick={() => this.props.history.push('/events/'+this.props.event.creation.key+'/edit')}>Next</button>
                        </div>
                     </div>


                  </div>
               </div>
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
   return {...bindActionCreators(EventActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(EventSuccess)