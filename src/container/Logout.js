import {Component} from 'react';

class Logout extends Component {

   componentDidMount(){
      localStorage.clear()
      this.props.history.push('/')
      window.location.reload()
      this.forceUpdate()
   }

   render() {
      return "";
   }
}

export default Logout
