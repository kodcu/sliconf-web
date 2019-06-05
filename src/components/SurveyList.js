import React from 'react';
import ReactTooltip from 'react-tooltip'
import IosRemoveCircle from 'react-ionicons/lib/IosRemoveCircle'
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import IosArrowUp from 'react-ionicons/lib/IosArrowUp'
import IosRemove from 'react-ionicons/lib/IosRemove'
import Modal from 'react-modal';

const ListItem = ({survey,index,eventId,props}) => {
   let removeSurvey = (sId) => {
      props.removeSurvey(eventId, sId);
   };

   return (
      <tr>
         <td data-tip={"Click to Delete"} data-for="editTooltip" onClick={() => {
            removeSurvey(survey.id)
         }} style={{
            width: "10px",
            textAlign: "center",
            padding: "5px",
            lineHeight: "10px"
         }}><IosRemoveCircle fontSize="25px" color="#F44336" /></td>
         <td data-tip={"Click to View"} data-for="editTooltip" onClick={()=>{props.topProps.history.push('/events/'+eventId+'/editsurvey/'+index)}}>{survey.name}</td>
      </tr>
   )
};

const SurveysNotAvailable = () => {
   return (
      <tr>
         <td colSpan="2" style={{marginBottom:"10px"}}>No surveys to be listed!</td>
      </tr>
   )
};

class SurveyList extends React.Component {

   state = {
      surveys: this.props.surveys,
      active:"",
      mode:0,
      isModalOpen:false,
   };

   sortTable = (what,type) => {
      let cloneTable = this.state.surveys ? this.state.surveys.slice(0) : [];
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
         return this.state.surveys;
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
         ? <IosArrowUp style={{verticalAlign:"top"}} />
         : <IosArrowDown style={{verticalAlign:"top"}} />
         : <IosRemove rotate={false} style={{verticalAlign:"top"}} />
   };

   render() {
      return (
         <div className="row">
            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.isModalOpen}
               onRequestClose={()=>{this.setState({isModalOpen:false})}}
               contentLabel="Are you sure?"
               style={{content : {width:400,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Remove Survey?</h2>
                     <p>You CANNOT undo this action.</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={()=>{this.setState({isModalOpen:false})}}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <button onClick={()=>{this.props.removeTalk(this.state.whatIndex);}} className={"button-primary"}>REMOVE</button>
                     </div>
                  </div>
               </div>
            </Modal>
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width events surveys">
                     <thead>
                        <tr>
                           <th/>
                           <th onClick={()=>{this.changeOrder("name")}}>Survey Name {this.returnIcons("name")}</th>
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