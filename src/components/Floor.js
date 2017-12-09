import React from 'react';
import randomColor from 'string-to-color'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//import * as SponsorActions from '../reducks/modules/sponsor';
import * as EventActions from '../reducks/modules/event';
import classNames from 'classnames';

class Floor extends React.Component {

   state = {
      logo:'',
      name:'',
      reRenderer:'',
   };

   edit = () => {
      this.props.modalCallback(this.props.floor.id, this.props.floor.image, this.props.floor.name);
      //console.log(this.props.floor);
   };

   componentWillReceiveProps(nextProps){
      if(this.props.reRenderer !== nextProps.nthChange){
         this.setState({
            logo:this.props.floor.image,
            reRenderer:nextProps.nthChange,
         })
      }
   }

   componentWillMount() {
      const {floor,nthChange} = this.props;
      this.setState({
         logo:floor.image,
         name:floor.name,
         reRenderer:nthChange,
      });
      //console.log(this.props);
      this.setState({
         color: '#' + randomColor.generate(floor.name)
      })
   }

   remove = () => {
      this.props.remove(this.props.floor.id)
   }

   render() {
      const {tagId,floor} = this.props;
      return (
         <div key={floor.id} className={classNames({ "sponsor":true, "noImage": !this.state.logo })} data-id={floor.id} data-name={this.state.name} data-tag={tagId} style={{backgroundImage: "url(\"http://app.sliconf.com:8090/service/image/get/"+this.state.logo+"\")"}}>
            <div className="overModal">
               <div className="remove" onClick={this.remove}/>
               <div className="edit" onClick={this.edit}/>
            </div>
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
   return bindActionCreators({...EventActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Floor)