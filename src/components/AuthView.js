import React from 'react';
import {connect} from 'react-redux';

class AuthView extends React.Component {

   render() {
      if(this.props.in && this.props.user){
         return this.props.children
      }else if(this.props.out && !this.props.user){
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
