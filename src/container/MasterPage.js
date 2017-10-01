import React from 'react';
import NavBar from '../components/Navbar';

class MasterPage extends React.Component {

   render() {
      return (
         <div>
            <NavBar/>
            {this.props.children}
         </div>
      );
   }
}

export default MasterPage