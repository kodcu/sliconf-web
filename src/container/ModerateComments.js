import React, {Component} from 'react';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as AuthActions from '../reducks/modules/auth'
import Comments from '../components/Comments'

class ModerateComments extends Component {

   state = {
      denied:[
         {
            topic:"Hibernate",
            commentId:"11",
            commentMessage:"kotu kotu seyler",
            roomId:"r2",
            roomTag:"Room 2",
            userId:"1513284871292358192831902",
            userName:"xavaneo",
            fullName:"Ata Gülalan"
         },
         {
            topic:"Hibernate",
            commentId:"12",
            commentMessage:"pis pis seyler",
            roomId:"r2",
            roomTag:"Room 2",
            userId:"1513284871292358192831902",
            userName:"xavaneo",
            fullName:"Ata Gülalan"
         }
      ],
      pending:[
         {
            topic:"Hibernate",
            commentId:"13",
            commentMessage:"guzel soru",
            roomId:"r2",
            roomTag:"Room 2",
            userId:"1513284871292358192831902",
            userName:"xavaneo",
            fullName:"Ata Gülalan"
         },
         {
            topic:"Hibernate",
            commentId:"14",
            commentMessage:"kotu seyler",
            roomId:"r2",
            roomTag:"Room 2",
            userId:"1513284871292358192831902",
            userName:"xavaneo",
            fullName:"Ata Gülalan"
         },
         {
            topic:"Hibernate",
            commentId:"15",
            commentMessage:"tuvalet nerede",
            roomId:"r2",
            roomTag:"Room 2",
            userId:"1513284871292358192831902",
            userName:"xavaneo",
            fullName:"Ata Gülalan"
         }
      ],
      approved:[
         {
            topic:"Hibernate",
            commentId:"16",
            commentMessage:"cok super soru",
            roomId:"r2",
            roomTag:"Room 2",
            userId:"1513284871292358192831902",
            userName:"xavaneo",
            fullName:"Ata Gülalan"
         }
      ],
      isSaved:true,
      clearing:false,
   };

   goEverywhere = (type,index,was) => {
      let mark = ["denied", "pending", "approved"];
      console.log(mark, index, mark[index], was , index);
      let obj = this.state[mark[type]][index];
      let keke = [
         obj,
         ...this.state[mark[type+was]]
      ];
      this.setState({
         [mark[type+was]]: keke,
         isSaved: false
      })
      setTimeout(() => {
         this.state[mark[type]].splice(index, 1);
      },300);
   };

   save = () => {
      console.log("clearing");
      this.setState({
         clearing: true
      });
      setTimeout(() => {
         this.setState({
            approved:[],
            denied:[],
            clearing:false,
            isSaved:true,
         })
      },400);
   };

   render() {

      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <div className="row">
                     <div className="ten columns">
                        <h2 style={{marginRight:15,display:"inline-block"}}>Moderate Comments</h2>
                        <p style={{display:"inline-block",color:this.state.isSaved ? "gainsboro" : "darkgray"}}>{this.state.isSaved ? "Saved.":"You have unsaved changes."}</p>
                     </div>
                     <div className="two columns">
                        <button onClick={this.save}>SAVE</button>
                     </div>
                  </div>
                  <div className="row">
                     <div className="four columns">
                        <h2 className="mini red">DENIED</h2>
                        <div className={classNames('commentBox unapproved',{'clearing':(this.state.clearing)})}>
                           <Comments comments={this.state.denied} goEverywhere={this.goEverywhere} type={0} {...this.props} />
                        </div>
                     </div>
                     <div className="four columns">
                        <h2 className="mini gray">PENDING</h2>
                        <div className="commentBox pending">
                           <Comments comments={this.state.pending} goEverywhere={this.goEverywhere} type={1} {...this.props} />
                        </div>
                     </div>
                     <div className="four columns">
                        <h2 className="mini green">APPROVED</h2>
                        <div className={classNames('commentBox approved',{'clearing':(this.state.clearing)})}>
                           <Comments comments={this.state.approved} goEverywhere={this.goEverywhere} type={2} {...this.props} />
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
      auth: state.auth
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators(AuthActions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModerateComments)
