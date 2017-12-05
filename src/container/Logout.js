import {Component} from 'react';

class Logout extends Component {

   componentDidMount(){
      localStorage.clear();
      window.location = "/";
   }

   render() {return ""}
}

export default Logout
