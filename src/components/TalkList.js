import React from 'react';

const ListItem = ({talk}) => {
   return (
      <tr>
         <td><div className="image rounded mini" style={{backgroundImage: 'url(http://www.maxfm.com.tr/files/artists/rick-astley/images/ricast1006.jpg)'}}/></td>
         <td>{talk.name}</td>
         <td>{talk.workingat}</td>
         <td><a href="" className="button">Linkedin</a> <a href="" className="button">Twitter</a> <a href="" className="button">About</a></td>
      </tr>
   )
}

const talksNotAvailable = () => {
   return (
      <tr>
         <td colSpan="2">No talks to be listed!</td>
      </tr>
   )
}


class TalkList extends React.Component {

   render() {
      return (
         <div className="row">
            <div className="twelve columns">
               <div className="docs-example">
                  <table className="u-full-width">
                     <thead>
                     <tr>
                        <th style={{width: 40}}>Photo</th>
                        <th>Full Name</th>
                        <th>Working At</th>
                        <th>Actions</th>
                     </tr>
                     </thead>
                     <tbody>
                     {(this.props.talks && this.props.talks.length) ? null : <talksNotAvailable/> }
                     {this.props.talks ? this.props.talks.map((talk)=>{
                        return <ListItem key={talk.id} talk={talk}/>
                     }) : null}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

      );
   }
}

export default TalkList