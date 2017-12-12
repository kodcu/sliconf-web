import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RoomActions from '../reducks/modules/room';
import * as EventActions from '../reducks/modules/event';
import {findDOMNode} from 'react-dom'
import ReactTooltip from 'react-tooltip'

class RoomCreate extends React.Component {

   state = {
      warning:'',
      label:'',
      floorId:this.props.floorPlan[0] ? this.props.floorPlan[0].id : '',
      dynamicKeys:1,
   };

   getRoomData = () => {
      return {
         label:this.state.label,
         floorId:this.state.floorId
      }
   };

   create = () => {
      //console.log(this.state.floorId);
      if(this.state.floorId){
         if(this.props.canCreateTag(this.getRoomData().label, "rooms")){
            this.props.addRoomToLocal({...this.getRoomData(),id:"newid"+this.state.dynamicKeys});
            this.setState({
               warning:'',
               label:'',
               dynamicKeys:this.state.dynamicKeys+1,
            });
            this.refs.focusAfterCreate.focus();
            //this.props.addRoom(this.props.eventId,this.getRoomData())
            this.props.callback();
         }else if(this.state.label === ''){
            this.setState({
               label:'',
               warning:'Room name cannot be empty!'
            },()=>{
               ReactTooltip.show(findDOMNode(this.refs.focusAfterCreate))
               this.refs.focusAfterCreate.focus();
            });
         }else{
            this.setState({
               label:'',
               warning:'This room already exists!'
            },()=>{
               ReactTooltip.show(findDOMNode(this.refs.focusAfterCreate))
               this.refs.focusAfterCreate.focus();
            });
         }
      }
   };

   componentWillReceiveProps(nextProps){
      if(nextProps.floorPlan && nextProps.floorPlan.length===1){
         this.setState({
            floorId:nextProps.floorPlan[0].id
         });
      }
   }

   render() {
      return (

         <div className="row">
            <div className="twelve columns" style={{marginLeft:0}}>
               <div className="five columns">
                  <label htmlFor="roomname">Room Name</label>
                  <input data-tip data-event='click' data-event-off='dblclick' className="u-full-width" ref={"focusAfterCreate"} type="text" id="roomname" value={this.state.label} onChange={(e) => {this.setState({warning:'',label: e.currentTarget.value});ReactTooltip.hide(findDOMNode(this.refs.focusAfterCreate))}}/>
               </div>
               <div className="four columns">
                  <label htmlFor="floorname">Floor</label>
                  <select className="u-full-width" value={this.state.floorId || ''} onChange={(e) => this.setState({floorId: e.currentTarget.value})}>
                     {this.props.floorPlan.map((floor)=><option key={floor.id} value={floor.id}>{floor.name}</option>)}
                  </select>
               </div>
               <div className="three columns">
                  <button className='u-full-width' style={{marginTop:21}} onClick={this.create}>Create Room</button>
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
   return bindActionCreators({...EventActions,...RoomActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomCreate)