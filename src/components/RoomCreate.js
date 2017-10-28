import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RoomActions from '../reducks/modules/room';
import * as EventActions from '../reducks/modules/event';

class RoomCreate extends React.Component {

   state = {
      label:'',
      floorId:null
   }

   getRoomData = () => {
      return {
         label:this.state.label,
         floorId:this.state.floorId
      }
   }

   create = () => {
      this.props.addRoomToLocal({...this.getRoomData(),id:125});
      //this.props.addRoom(this.props.eventId,this.getRoomData())
   }

   componentWillReceivePros(nextProps){
      if(this.props.roomStore.create !== nextProps.roomStore.create){
         this.props.addRoomToLocal(nextProps.roomStore.create);
      }
   }

   render() {
      return (
         <div className="row">
            <div className="twelve columns" style={{marginLeft:0}}>
               <div className="five columns">
                  <label htmlFor="roomname">Room Name</label>
                  <input className="u-full-width" type="text" placeholder="i.e. Room 1" id="roomname" value={this.state.label} onChange={(e) => this.setState({label: e.currentTarget.value})}/>
               </div>
               <div className="four columns">
                  <label htmlFor="floorname">Floor</label>
                  <select className="u-full-width" value={this.state.floorId || ''} onChange={(e) => this.setState({floorId: e.currentTarget.value})}>
                     <option value="f1">Floor 1</option>
                     <option value="f2">Floor 2</option>
                  </select>
               </div>
               <div className="three columns">
                  <button className='u-full-width' style={{marginTop:21}} onClick={this.create}>Create Room</button>
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