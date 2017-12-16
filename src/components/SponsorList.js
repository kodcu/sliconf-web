import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EventActions from '../reducks/modules/event';
import Sponsor from "../components/Sponsor";
import classNames from 'classnames'
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'

class SponsorList extends React.Component {

   state = {
      nthChange:'',
      sponsors:{},
      tagId:'',
      tagName:'',
      eventId:'',
      modalCallback:'',
      reRenderer:1,
      editMode:false,
      error:'',
   };

   newCallbackHandler = () => {
      this.state.modalCallback("","","",this.state.tagId);
   };

   componentWillReceiveProps(nextProps){
      if((nextProps.sponsors && (nextProps.sponsors !== this.props.sponsors)) || (this.props.nthChange !== nextProps.nthChange)){
         console.log("bana iletildi");
         this.setState({
            sponsors:nextProps.sponsors,
            reRenderer:this.state.reRenderer+1,
         })
      }
   };

   toggleEdit = () => {
      if(this.state.editMode){
         //check
         if(this.state.tagName){
            let checker = this.props.editCallback(this.state.tagId, this.state.tagName);
            if(checker===0){
               if(this.state.tagName) {
                  this.setState({
                     editMode: !this.state.editMode,
                     error: '',
                  });
               }
            }else {
               if(checker===1){
                  this.setState({
                     error: "This tag already exists!"
                  });
                  ReactTooltip.show(findDOMNode(this.refs.focusAfterCreate))
               }
            }
         }else{
            this.setState({
               error:"Sponsor tag cannot be empty!"
            });
            ReactTooltip.show(findDOMNode(this.refs.focusAfterCreate))
         }
      }else{
         this.setState({
            editMode:!this.state.editMode,
         });
      }
   }

   componentWillMount() {
      const {sponsors,tagName,eventId,modalCallback,tagId} = this.props;
      this.setState({
         sponsors:sponsors,
         tagName,eventId,modalCallback,tagId
      });
   };

   render() {
      return (
         <div>
            <div className="priorityChanger" onClick={()=>{alert("Priority changer is not working for now.")}}>
               <div className="top"/>
               <div className="bottom"/>
            </div>
            <div data-event-off='dblclick' data-event='click' className={classNames('tagEdit', {'check': this.state.editMode})} onClick={this.toggleEdit} />
            <input ref="focusAfterCreate" data-tip type="text" value={this.state.tagName} readOnly={!this.state.editMode} onChange={(e) => {this.setState({tagName: e.currentTarget.value,error:''});}}/>
            <ReactTooltip getContent={() => this.state.error} place="bottom" type="error" effect="solid"/>
            <div className={"sponsorsWithTags"} key={this.state.sponsors}>
               {this.state.sponsors ? this.state.sponsors.map((sponsor)=><Sponsor name={this.state.tagName} remove={this.props.remove} reRenderer={this.state.reRenderer} modalCallback={this.state.modalCallback} key={sponsor.id} sponsor={sponsor} eventId={this.state.eventId}/>) : ''}
               <div className="addSponsor" onClick={this.newCallbackHandler}>+</div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      auth: state.auth,
   }
};
const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({...EventActions}, dispatch)
};
export default connect(mapStateToProps, mapDispatchToProps)(SponsorList)