import React from 'react';
import {connect} from 'react-redux';

class AuthView extends React.Component {

   render() {
      if(this.props.in && this.props.user!==undefined && this.props.user.id!==undefined && this.props.user!==null){
         return this.props.children
      }else if(this.props.out && (this.props.user===null || (this.props.user===undefined || this.props.user.id===undefined))){
         return this.props.children
      }else{
         return null
      }
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      user: state.auth.user
   }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView)
