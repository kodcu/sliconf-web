import React from 'react';

class PageHead extends React.Component {

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="row">
                  <div className="twelve columns">
                     <h2>{this.props.title || 'Page Name'}</h2>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default PageHead