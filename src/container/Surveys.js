import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as SurveyActions from '../reducks/modules/survey'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import SurveyList from "../components/SurveyList";
import * as Silly from '../reducks/modules/silly'

class Surveys extends React.Component {

   state = {
      surveys:[]
   };

   componentWillMount(){
      this.props.fetchEventSurveys(this.props.match.params.eventId);
   }

   componentWillReceiveProps(nextProps){
      if(this.props.survey !== nextProps.survey){
         this.setState({
            surveys: nextProps.surveys ? nextProps.survey.surveys : [],
         })
      }
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead where={"/events/"+this.props.match.params.eventId+"/edit"} title="Surveys" {...this.props} />
                  <Loading row="3" loading={this.props.survey.loading}>
                     <SurveyList eventId={this.props.match.params.eventId} surveys={this.props.survey.surveys} topProps={this.props}/>
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
      auth: state.auth,
      silly: state.silly,
   }
};


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...SurveyActions,...Silly}, dispatch)}
};

export default connect(mapStateToProps, mapDispatchToProps)(Surveys)