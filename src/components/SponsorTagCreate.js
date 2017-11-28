import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TagActions from '../reducks/modules/tag';
import * as EventActions from '../reducks/modules/event';

class SponsorTagCreate extends React.Component {

   state = {
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
      }
   };

   render() {
      return (
         <div className="row">
            <div className="twelve columns" style={{marginLeft:0}}>
               <div className="nine columns">
                  <label htmlFor="tagname">Tag Name</label>
                  <input className="u-full-width" type="text" id="tagname" value={this.state.label} onChange={(e) => this.setState({label: e.currentTarget.value})}/>
               </div>
               <div className="three columns">
                  <button className='u-full-width' style={{marginTop:21}} onClick={this.create}>Create Tag</button>
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