import React, {Component} from 'react';
import classNames from 'classnames';


class Comments extends Component {
   state = {
      id:0,
      alreadyClicked:false,
   };

   swapper = (id,type,index,to,callback) => {
      if(!this.state.alreadyClicked){
         callback(type,index,to)
         this.setState({ id: id , alreadyClicked:true})
         setTimeout(() => {
            //console.log(id);
            this.setState({ id: 0 , alreadyClicked:false })
         }, 300)
      }
   };

   comment = (comment, changeState, index, type) => {
      return (
         <div key={comment.id} className={classNames('comment',{'slideAnimateDown':!(this.state.id===comment.id)},{'slideAnimateUp': this.state.id===comment.id})}>
            <a className="user">{comment.username}</a> commented on <a className="title">{comment.topic} ({comment.roomName})</a><br /><br />
            <div className="rightarrow"/>{comment.commentValue}
            <div className="buttons">
               <div className="lefter" onClick={() => {this.swapper(comment.id, type,index,-2,changeState)}}>{"⟪"}</div>
               <div className="left" onClick={() => {this.swapper(comment.id,type,index,-1,changeState)}}>{"⟨"}</div>
               <div className="righter" onClick={() => {this.swapper(comment.id,type,index,+2,changeState)}}>{"⟫"}</div>
               <div className="right" onClick={() => {this.swapper(comment.id,type,index,+1,changeState)}}>{"⟩"}</div>
            </div>
         </div>
      )
   };

   render() {
      return (
         this.props.comments && this.props.changeState ? this.props.comments.map((comment,index)=>{
            return this.comment(comment,this.props.changeState,index,this.props.type)
         }) : null
      );
   }
}

export default Comments
