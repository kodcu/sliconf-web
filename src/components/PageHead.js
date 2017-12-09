import React from 'react';

class PageHead extends React.Component {

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="row">
                  <div className="twelve columns">
                     {this.props.history.length > 1 ? <button className="backButton" onClick={this.props.history.goBack} /> : ''}
                     <h2 style={{verticalAlign:"top", display: "inline-block"}}>{this.props.title || 'Page Name'}</h2>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default PageHead