import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TagActions from '../reducks/modules/tag';
import * as EventActions from '../reducks/modules/event';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'

class SponsorTagCreate extends React.Component {

   state = {
      warning:'',
      label:'',
      dynamicKeys:1,
   };

   getTagData = () => {
      return {
         label:this.state.label,
      }
   };

   create = () => {
      if(this.props.canCreateTag(this.getTagData().label, "sponsors")){

         this.props.addTagToLocal({...this.getTagData(),id:"newid"+this.state.dynamicKeys});
         this.setState({
            label:'',
            dynamicKeys:this.state.dynamicKeys+1,
         });
         this.props.callback();
      }else if(this.state.label === ''){
         this.setState({
            label:'',
            warning:'Sponsor tag cannot be empty!'
         },()=>{
            ReactTooltip.show(findDOMNode(this.refs.focusAfterCreate))
            this.refs.focusAfterCreate.focus();
         });
      }else{
         this.setState({
            label:'',
            warning:'This tag already exists!'
         },()=>{
            ReactTooltip.show(findDOMNode(this.refs.focusAfterCreate))
            this.refs.focusAfterCreate.focus();
         });
      }
   };

   render() {
      return (
         <div className="row">
            <div className="twelve columns" style={{marginLeft:0}}>
               <div className="nine columns">
                  <label htmlFor="tagname">Tag Name</label>
                  <input data-tip data-event='click' data-event-off='dblclick' ref={"focusAfterCreate"} className="u-full-width" type="text" id="tagname" value={this.state.label} onChange={(e) => {this.setState({warning:'',label: e.currentTarget.value});ReactTooltip.hide(findDOMNode(this.refs.focusAfterCreate))}}/>
               </div>
               <div className="three columns">
                  <button className='u-full-width' style={{marginTop:21}} onClick={this.create}>Create Tag</button>
                  <ReactTooltip getContent={() => this.state.warning} place="top" type="error" effect="solid"/>
               </div>
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
   return bindActionCreators({...EventActions,...TagActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsorTagCreate)