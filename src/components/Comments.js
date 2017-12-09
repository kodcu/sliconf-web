import React, {Component} from 'react';
import classNames from 'classnames';


class Comments extends Component {
   state = {
      commentId:0
   };

   swapper = (id) => {
      this.setState({ commentId: id })
      setTimeout(() => {
         //console.log(id);
         this.setState({ commentId: 0 })
      }, 300)
   };

   comment = (comment, changeState, index, type) => {
      return (
         <div key={comment.commentId} className={classNames('comment',{'slideAnimateDown':!(this.state.commentId===comment.commentId)},{'slideAnimateUp': this.state.commentId===comment.commentId})}>
            <a className="user">{comment.userName}</a> commented on <a className="title">{comment.topic} ({comment.roomTag})</a><br /><br />
            <div className="rightarrow"/>{comment.commentMessage}
            <div className="buttons">
               <div className="lefter" onClick={() => {changeState(type,index,-2);this.swapper(comment.commentId)}}>{"⟪"}</div>
               <div className="left" onClick={() => {changeState(type,index, -1);this.swapper(comment.commentId)}}>{"⟨"}</div>
               <div className="righter" onClick={() => {changeState(type,index, +2);this.swapper(comment.commentId)}}>{"⟫"}</div>
               <div className="right" onClick={() => {changeState(type,index, +1);this.swapper(comment.commentId)}}>{"⟩"}</div>
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
