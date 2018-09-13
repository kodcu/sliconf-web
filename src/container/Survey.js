import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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
      survey: [
         ["","",""]
      ],
      lastFocus:false,
   };

   componentWillMount() {
      this.props.changeStep(-1);
   }

   componentWillReceiveProps(nextProps) {

   }

   //feels like a hack but it works, just remember that a CPU is literally a rock that we tricked into thinking
   dontStealFocus = (e) => {
      if(this.state.lastFocus){
         e.target.focus();
      }
   };

   render() {
      let cloneSurvey = this.state.survey.slice(0);
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">

                  <PageHead where={"/events/" + this.props.match.params.eventId + "/edit"}
                            title="Survey" {...this.props} />
                  <Loading row="3" loading={this.props.speaker.loading}>
                     {this.state.survey.map((question, nthQuestion) => {
                        return (
                           <div>
                              <div className="row">
                                 <div className="twelve columns">
                                    <input key={"q" + nthQuestion} maxLength="50" autoFocus className="moving u-full-width" type="text"
                                           id={"q" + nthQuestion}
                                           value={question[0]}
                                           onBlur={this.dontStealFocus}
                                           onChange={(e) => {
                                              cloneSurvey[nthQuestion][0] = e.currentTarget.value;
                                              this.setState({
                                                 survey: cloneSurvey,
                                              }, ()=>{
                                                 if (cloneSurvey[cloneSurvey.length - 1][0] !== "") {
                                                    cloneSurvey.push(["", "", ""]);
                                                    this.setState({
                                                       lastFocus:true,
                                                       survey: cloneSurvey,
                                                    },()=>{
                                                       this.setState({
                                                          lastFocus: false,
                                                       });
                                                    });
                                                 }
                                              })
                                           }}/>
                                    <label htmlFor={"q" + nthQuestion}>{"Question " + (nthQuestion + 1)}</label>
                                 </div>
                              </div>
                              {question.map((answer, nthAnswer) => {
                                 return nthAnswer !== 0 && (
                                    <div className="nine columns">
                                       <div className="eight columns">
                                          <input maxLength="50" className="moving u-full-width" type="text"
                                                 id={"q" + nthQuestion + "a" + nthAnswer}
                                                 value={answer}
                                                 onChange={(e) => {
                                                    cloneSurvey[nthQuestion][nthAnswer] = e.currentTarget.value;
                                                    this.setState({
                                                       survey: cloneSurvey,
                                                    },()=>{
                                                       if (cloneSurvey[nthQuestion][cloneSurvey[nthQuestion].length-1] !== "") {
                                                          cloneSurvey[nthQuestion].push("");
                                                          this.setState({
                                                             survey: cloneSurvey
                                                          });
                                                       }
                                                    })
                                                 }}/>
                                          <label
                                             htmlFor={"q" + nthQuestion + "a" + nthAnswer}>{"Option " + (nthAnswer)}</label>
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>
                        )
                     })}


                     <div className="row">
                        <div className="column mtop50">
                           <div className="twelwe columns">
                              <input className="button button-primary" type="submit" defaultValue="Save"/>
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
   return bindActionCreators({...talkActions, ...Silly}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey)