import React from 'react';
import ReactTooltip from 'react-tooltip'
import Ionicon from 'react-ionicons'

const ListItem = ({survey,index,eventId,props}) => {
   return (
      <tr data-tip={"Click to View"} data-for="editTooltip" onClick={()=>{props.topProps.history.push('/events/'+eventId+'/survey/'+index)}}>
         <td>{survey.name}</td>
      </tr>
   )
};

const SurveysNotAvailable = () => {
   return (
      <tr>
         <td colSpan="1" style={{marginBottom:"10px"}}>No surveys to be listed!</td>
      </tr>
   )
};

class SurveyList extends React.Component {

   state = {
      surveys: this.props.surveys,
      active:"",
      mode:0,
   };

   sortTable = (what,type) => {
      let cloneTable = this.props.surveys ? this.props.surveys.slice(0) : [];
      if(type){
         return cloneTable.sort(function(a, b) {
            if(type===1){
               return a[what].toString().localeCompare(b[what].toString())
            }else if(type===2){
               return b[what].toString().localeCompare(a[what].toString())
            }else{
               return 0
            }
         })
      }else{
         return this.props.surveys;
      }
   };

   changeOrder = (which) => {
      if(which===this.state.active){
         if(this.state.mode===1){
            this.setState({
               mode:2,
               surveys:this.sortTable(which, 2),
            });
         }else if(this.state.mode===2){
            this.setState({
               mode:0,
               active:"",
               surveys:this.sortTable(which, 0),
            });
         }
      }else{
         this.setState({
            mode:1,
            active:which,
            surveys:this.sortTable(which, 1),
         });
      }
   };

   returnIcons = (what) => {
      return this.state.active===what ? this.state.mode===1
         ? <Ionicon icon={"ios-arrow-up"} style={{verticalAlign:"top"}} />
         : <Ionicon icon={"ios-arrow-down"} style={{verticalAlign:"top"}} />
         : <Ionicon icon={"ios-remove"} style={{verticalAlign:"top"}} />
   };

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width events surveys">
                     <thead>
                     <tr>
                        <th onClick={()=>{this.changeOrder("name")}}>Full Name {this.returnIcons("name")}</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.state.surveys && this.state.surveys.length) ? null : <SurveysNotAvailable/> }
                     {this.state.surveys ? this.state.surveys.map((survey, index)=>{
                        return <ListItem key={survey.name} survey={survey} index={survey.id} eventId={this.props.eventId} props={this.props}/>
                     }) : null}
                     </tbody>
                  </table>
                  <ReactTooltip id="editTooltip" place="bottom" type="dark"  effect="solid"/>
               </div>
            </div>
         </div>

      );
   }
}

export default SurveyList