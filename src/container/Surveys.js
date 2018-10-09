import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as SurveyActions from '../reducks/modules/survey'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import SurveyList from "../components/SurveyList";
import * as Silly from '../reducks/modules/silly'
import moment from "moment/moment";

class Surveys extends React.Component {

   state = {
      surveys:[]
   };

   componentWillMount(){
      this.props.fetchEventSurveys(this.props.match.params.eventId);
   }

   componentWillReceiveProps(nextProps){
      console.log("mock geldi", nextProps);
      if(this.props.survey !== nextProps.survey && nextProps.survey.type!=="remove  "){
         this.setState({
            surveys: nextProps.survey ? nextProps.survey.surveys : [],
         })
      }
   }

   removeSurvey = (eId, sId) => {
      console.log("removing",eId,sId);
      this.props.removeEventSurvey(eId,sId);
   };

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead where={"/events/"+this.props.match.params.eventId+"/edit"} title="Surveys" {...this.props} />
                  {this.props.event && this.props.event.event && this.props.event.event.startDate ?
                     <div className="row mtop25 mbottom50"
                          style={{display: (this.props.event.event.startDate - moment()) / 86400000 < 1 ? "block" : "none"}}>
                        <div className="twelve columns">
                           <div className="row">
                              <div className="twelve columns">
                                 <Link className="bigGreenButton" to="../statisticsSurvey"
                                       style={{height: 100, padding: "20px 0"}}>
                                    Go Survey Statistics
                                 </Link>
                              </div>
                           </div>
                        </div>
                     </div>
                  : ""}
                  <Loading row="3" loading={this.props.survey.loading}>
                     <SurveyList removeSurvey={this.removeSurvey} eventId={this.props.match.params.eventId} surveys={this.state.surveys} topProps={this.props}/>
                     <div className="row mtop25 mbottom100">
                        <div className="twelve columns">
                           <Link to={"/events/"+this.props.match.params.eventId+"/addsurvey"} className="button button-primary">Add Survey</Link>
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
      survey: state.survey,
      event: state.event,
      auth: state.auth,
      silly: state.silly,
   }
};


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...SurveyActions,...Silly}, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys)