import React, {Component} from 'react';
import {connect} from 'react-redux';

class Error extends Component {

   state = {
      code:'',
      message:'',
      detail:'',
      link:'',
      button:'',
   };

   kodlar = {
      "401":{
         "message":"Hey, I don't know you.",
         "detail":"You cannot view this page. Maybe you are not logged in, maybe you want to access somebody else's event.",
         "link":"/",
         "button":"GO TO HOME",
      },
      "404":{
         "message":"We sincerely apologize.",
         "detail":"The page you are looking for is no longer here. Maybe it was never here in the first place.",
         "link":"/",
         "button":"GO TO HOME",
      },
      "410":{
         "message":"This link is expired.",
         "detail":"The page you are looking for is expired. You may want to use a different link.",
         "link":"/",
         "button":"GO TO HOME",
      }
   };

   componentWillMount(){
      console.log()
   }

   render() {
       return (
           <div className="container mtop">
              <div className="row">
                 <div className="nine columns">
                    <h1 className="code green">{this.props.error}</h1>
                    <h5>{this.kodlar[this.props.error].message}</h5>
                    <p>{this.kodlar[this.props.error].detail}</p>
                    <button onClick={()=>{this.props.history.push(this.kodlar[this.props.error].link)}}>{this.kodlar[this.props.error].button}</button>
                 </div>
              </div>
          </div>
      );
   }
}

export default connect()(Error)