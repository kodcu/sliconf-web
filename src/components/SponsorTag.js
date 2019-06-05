import React from 'react';
import randomColor from 'string-to-color'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TagActions from '../reducks/modules/tag';
import * as EventActions from '../reducks/modules/event';

class SponsorTag extends React.Component {

   state = {
      color: '#ffffff'
   };


   componentWillReceiveProps(nextProps){
      //console.log(this.props.tagStore)
      //if(this.props.tagStore.del !== nextProps.tagStore.del){
      //   this.props.removeTagFromLocal(this.props.tag.id);
      //}
   }

   componentWillMount() {
      const {tag} = this.props;
      this.setState({
         color: '#' + randomColor(tag.label)
      })
   }

   render() {
      const {tag} = this.props;
      return (
         <div key={tag.id} className="room" style={{background: this.state.color}}>
            {tag.label} <div className="remove" onClick={()=>{this.props.remove(this.props.tag.id)}}/>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      tagStore: state.tag,
      auth: state.auth,
   }
};


const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({...TagActions,...EventActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(SponsorTag)