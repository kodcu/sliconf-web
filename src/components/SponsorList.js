import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EventActions from '../reducks/modules/event';
import Sponsor from "../components/Sponsor";

class SponsorList extends React.Component {

   state = {
      nthChange:'',
      sponsors:{},
      tagId:'',
      tagName:'',
      eventId:'',
      modalCallback:'',
      reRenderer:1,
   };

   newCallbackHandler = () => {
      this.state.modalCallback("","","",this.state.tagId);
   };

   componentWillReceiveProps(nextProps){
      if((nextProps.sponsors && (nextProps.sponsors !== this.props.sponsors)) || (this.props.nthChange !== nextProps.nthChange)){
         this.setState({
            sponsors:nextProps.sponsors,
            reRenderer:this.state.reRenderer+1,
         })
      }
   };

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
            <h1>{this.state.tagName}</h1>
            <div className={"sponsorsWithTags"} key={this.state.sponsors}>
               {this.state.sponsors ? this.state.sponsors.map((sponsor)=><Sponsor remove={this.props.remove} reRenderer={this.state.reRenderer} modalCallback={this.state.modalCallback} key={sponsor.id} sponsor={sponsor} eventId={this.state.eventId}/>) : ''}
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