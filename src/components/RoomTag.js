import React from 'react';
import randomColor from 'string-to-color'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as RoomActions from '../reducks/modules/room';
import * as EventActions from '../reducks/modules/event';

class RoomTag extends React.Component {

   state = {
      color: '#ffffff'
   }

   remove = () => {
      this.props.removeRoom(this.props.eventId,this.props.room.id)
   }

   componentWillReceivePros(nextProps){
      if(this.props.roomStore.del !== nextProps.roomStore.del){
         this.props.removeRoomFromLocal(this.props.room.id);
      }
   }

   componentWillMount() {
      const {room} = this.props;
      console.log(room)
      this.setState({
         color: '#' + randomColor.generate(room.label)
      })
   }

   render() {
      const {room,remove} = this.props;
      return (
         <div key={room.id} className="room" style={{background: this.state.color}}>
            {room.label} <div className="remove" onClick={this.remove}/>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      roomStore: state.room,
      auth: state.auth,
   }
};


const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({...RoomActions,...EventActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomTag)