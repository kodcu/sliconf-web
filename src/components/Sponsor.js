import React from 'react';
import randomColor from 'string-to-color'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SponsorActions from '../reducks/modules/sponsor';
import * as EventActions from '../reducks/modules/event';
import classNames from 'classnames';

class Sponsor extends React.Component {

   state = {
      logo:'',
      name:'',
   };

   edit = () => {
      this.props.modalCallback(this.props.sponsor.id, this.props.sponsor.logo, this.props.sponsor.name);
      //console.log(this.props.sponsor);
   };

   componentWillReceiveProps(nextProps){
      if(this.props.reRenderer !== nextProps.reRenderer){
         console.log("bana da iletildi !");
         this.setState({
            logo:this.props.sponsor.logo,
            name:this.props.sponsor.name,
         })
      }
   }

   componentWillMount() {
      const {sponsor} = this.props;
      this.setState({
         logo:sponsor.logo,
         name:sponsor.name,
      });
      //console.log(this.props);
      this.setState({
         color: '#' + randomColor.generate(sponsor.name)
      })
   }

   render() {
      const {tagId,sponsor} = this.props;
      return (
         <div key={sponsor.id} className={classNames({ "sponsor":true, "noImage": !this.state.logo })} data-id={sponsor.id} data-name={this.state.name} data-tag={tagId} style={{backgroundImage: "url(\"https://app.sliconf.com/api/image/get/"+this.state.logo+"\")"}}>
            <div className="overModal">
               <div className="remove" onClick={()=>{this.props.remove(this.props.sponsor.id)}}/>
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
   return bindActionCreators({...SponsorActions,...EventActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Sponsor)