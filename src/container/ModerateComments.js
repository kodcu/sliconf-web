import React, {Component} from 'react';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import Comments from '../components/Comments'
import * as EventActions from '../reducks/modules/event'
import * as CommentActions from '../reducks/modules/comment'

class ModerateComments extends Component {

   state = {
      denied:[],
      pending:[],
      approved:[],
      isSaved:true,
      clearing:false,
      hideTip:false,
      tipText:"You can use arrow keys to approve or deny comments from pending.",
      tipMode:1,
   };

   oneTime = true;
   noPendingInterval;

   componentDidMount() {
      this.props.fetchEvent(this.props.match.params.eventId);
      window.addEventListener("keydown", this.keyPress, false);
   }

   componentWillUnmount(){
      clearInterval(this.noPendingInterval);
      window.removeEventListener("keydown", this.keyPress, false);
   }

   keyPress = (e) => {
      let kc = e.keyCode===37 ? "left" : e.keyCode===39 ? "right" : undefined;
      if(kc && document.querySelector(".commentBox.pending .comment .buttons ."+kc)){
         document.querySelector(".commentBox.pending .comment .buttons ."+kc).click()
         this.setState({
            tipText:"You can use enter to save current state.",
            tipMode:2,
         })
      }
      if(e.keyCode===13){
         this.save();
         if(this.state.tipMode===2){
            this.setState({
               hideTip:true,
            })
         }
      }
   };

   getComments = () => {
      this.props.getComments("recent", "pending", 20, this.state.id);
   };

   componentWillReceiveProps(nextProps) {
      if (((nextProps.event && this.props.event !== nextProps.event) || (this.props.event && nextProps.event && this.props.event.id !== nextProps.event.id)) && this.oneTime) {
         this.oneTime = false;
         if(nextProps.event.deleted===true){
            this.props.history.push("/");
         }
         this.setState({
            id: nextProps.event.id ? nextProps.event.id : '',
            name: nextProps.event.name ? nextProps.event.name : '',
            logoPath: nextProps.event.logoPath ? nextProps.event.logoPath : '',
            agenda: nextProps.event.agenda ? nextProps.event.agenda : [],
            description: nextProps.event.description ? nextProps.event.description : '',
            web: nextProps.event.about ? nextProps.event.about.web ? nextProps.event.about.web : '' : '',
            rooms:nextProps.event.rooms ? nextProps.event.rooms : [],
            sponsorTags: nextProps.event.sponsorTags ? nextProps.event.sponsorTags : {},
            floorPlan : nextProps.event.floorPlan ? nextProps.event.floorPlan : [],
            loading:false,
         }, ()=>{
            this.getComments();
            this.noPendingInterval = setInterval(function () {
               if(this.state.pending.length===0 && this.state.approved.length===0 && this.state.denied.length===0){
                  this.getComments();
               }
            }.bind(this),3000);
         });
      }

      if (nextProps.comment && (nextProps.comment.comment && this.props.comment.comment !== nextProps.comment.comment)) {
         this.setState({
            pending:nextProps.comment.comment,
         }, () => {

         })
      }

      if (nextProps.comment && (nextProps.comment.returnObject && this.props.comment.returnObject !== nextProps.comment.returnObject)) {
         console.log("ey")
         console.log(nextProps.comment.returnObject);
         setTimeout(() => {
            this.setState({
               approved:[],
               denied:[],
               clearing:false,
               isSaved:true,
            })
         },400);
         this.getComments();

      }
   }


   changeState = (type,index,was) => {
      let mark = ["denied", "pending", "approved"];
      let obj = this.state[mark[type]][index];
      let tempState = [
         obj,
         ...this.state[mark[type+was]]
      ];
      this.setState({
         [mark[type+was]]: tempState,
         isSaved: false
      });
      setTimeout(() => {
         this.state[mark[type]].splice(index, 1);
      },300);
   };

   save = () => {

      let approved = this.state.approved.map(function(item) {
         return item['id'];
      });

      let denied = this.state.denied.map(function(item) {
         return item['id'];
      });

      console.log(approved,denied)

      this.setState({
         clearing: true
      });
      this.props.pushComments(this.state.id, this.props.auth.user.id, approved,denied);
   };


   render() {

      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <div className="row">
                     <div className="ten columns">
                        <button className="backButton" onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/edit")}} />
                        <h2 style={{marginRight:"20px",verticalAlign:"middle",display: "inline-block"}}>Moderate Comments</h2>
                        <p style={{display:"inline-block",color:this.state.isSaved ? "gainsboro" : "darkgray"}}>{this.state.isSaved ? "Saved.":"You have unsaved changes."}</p>
                     </div>
                     <div className="two columns">
                        <button style={{marginTop:"8px"}} onClick={this.save}>SAVE</button>
                     </div>
                  </div>
                  <div className={classNames('row mbottom25',{'hidden':(this.state.hideTip)})}>
                     <div className="twelve columns">Little tip: {this.state.tipText}</div>
                  </div>
                  <div className="row">
                     <div className="four columns">
                        <h2 className="mini red">DENIED</h2>
                        <div className={classNames('commentBox unapproved',{'clearing':(this.state.clearing)})}>
                           <Comments comments={this.state.denied} changeState={this.changeState} type={0} {...this.props} />
                        </div>
                     </div>
                     <div className="four columns">
                        <h2 className="mini gray">PENDING</h2>
                        <div className="commentBox pending">
                           <Comments comments={this.state.pending} changeState={this.changeState} type={1} {...this.props} />
                        </div>
                     </div>
                     <div className="four columns">
                        <h2 className="mini green">APPROVED</h2>
                        <div className={classNames('commentBox approved',{'clearing':(this.state.clearing)})}>
                           <Comments comments={this.state.approved} changeState={this.changeState} type={2} {...this.props} />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      auth: state.auth,
      comment: state.comment,
      event: state.event.event,
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...AuthActions, ...EventActions, ...CommentActions}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModerateComments)
