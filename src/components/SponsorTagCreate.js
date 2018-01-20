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
      tagLen:this.props.sponsorTagLength,
      dynamicKeys:1,
   };

   getTagData = () => {
      return {
         label:this.state.label,
      }
   };
   //sa


   componentWillReceiveProps(nextProps){
      //console.log(nextProps)
      //console.log(nextProps.speaker.rooms)
      if(this.props.sponsorTagLength !== nextProps.sponsorTagLength){
         this.setState({
            tagLen:nextProps.sponsorTagLength
         });
      }
   }

   create = () => {
      if(this.props.canCreateTag(this.getTagData().label, "sponsors")){

         let uniqueTagId = this.state.tagLen+"|newid"+this.state.dynamicKeys;
         this.props.createNewTag(uniqueTagId,this.getTagData());

         this.setState({
            label:'',
            dynamicKeys:this.state.dynamicKeys+1,
         });
         this.refs.focusAfterCreate.focus();
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
                  <input data-tip data-event='click' data-event-off='dblclick' ref={"focusAfterCreate"} className="moving u-full-width" type="text" id="tagname" value={this.state.label} onChange={(e) => {this.setState({warning:'',label: e.currentTarget.value});}}/>
                  <label htmlFor="tagname">Sponsorship Packages</label>
               </div>
               <div className="three columns">
                  <button className='u-full-width' style={{marginTop:21}} onClick={this.create}>Create Package</button>
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