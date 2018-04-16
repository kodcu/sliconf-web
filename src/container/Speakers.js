import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as SpeakerActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import SpeakerList from "../components/SpeakerList";
import * as Silly from '../reducks/modules/silly'

class Speakers extends React.Component {

   state = {
     speakers:[]
   };

   componentWillMount(){
      this.props.fetchEventSpeakers(this.props.match.params.eventId);
   }

   componentWillReceiveProps(nextProps){
      if(this.props.speaker !== nextProps.speaker){
         this.setState({
            speakers: nextProps.speaker ? nextProps.speaker.speakers : [],
         },()=>{
            if(this.state.speakers && this.state.speakers.length>0) {
               this.props.changeStep(30);
            }else{
               this.props.changeStep(19);
            }
         })
      }
   }

   JSONcsv = (objArray) => {
      let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      for (let i = 0; i < array.length; i++) {
         let line = '';
         for (let index in array[i]) {
            if (line !== '') line += ',';
            line += array[i][index];
         }
         str += line+"," + '\r\n';
      }
      return str.substring(0, str.lastIndexOf("\r\n"));
   };

   csvJSON = (csv) => {
      let lines=csv.split("\n");
      let result = [];
      let headers=(lines[0]).split(",");
      console.log(headers);
      for(let i=1;i<lines.length;i++){
         let obj = {};
         let currentLine=lines[i].split(",");
         for(let j=0;j<headers.length;j++){
            console.log(typeof(headers[j]), headers[j].toString());
            obj[headers[j]] = currentLine[j];
            //sasa
         }
         result.push(obj);
      }
      return JSON.stringify(result);
   };

   exportJSON = () => {
      const items = this.state.speakers;
      const header = items[0] ? Object.keys(items[0]) : "id,name,profilePicture,workingAt,about,twitter,linkedin".split(",");
      console.log(header);
      let text = header+",safeCol"+"\n"+this.JSONcsv(items);
      let fileBlob = new Blob([text], {type: "application/octet-binary"});
      let link = document.createElement("a");
      link.setAttribute("href", URL.createObjectURL(fileBlob));
      link.setAttribute("download", "sliconf-export.csv");
      link.appendChild(document.createTextNode("Save file"));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   importJSON = () => {
      console.log(this.props);
      let element = document.createElement('div');
      element.innerHTML = '<input type="file">';
      let fileInput = element.firstChild;

      fileInput.addEventListener('change', function() {
         let file = fileInput.files[0];

         if (file.name.match(/\.(csv)$/)) {
            let reader = new FileReader();

            reader.onload = function() {
               console.log(JSON.parse(this.csvJSON(reader.result)));
               this.props.addSpeaker(this.props.match.params.eventId, JSON.parse(this.csvJSON(reader.result)));
            }.bind(this);

            reader.readAsText(file);
         } else {
            alert("File not supported, .csv files only");
         }
      }.bind(this));

      fileInput.click();
   };

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead where={"/events/"+this.props.match.params.eventId+"/edit"} title="Speakers" {...this.props} />
                  <Loading row="3" loading={this.props.speaker.loading}>
                     <SpeakerList eventId={this.props.match.params.eventId} speakers={this.props.speaker.speakers} topProps={this.props}/>
                     <div className="row mtop25 mbottom100">
                        <div className="twelve columns">
                           <Link to={"/events/"+this.props.match.params.eventId+"/addspeaker"} className="button button-primary">Add Speaker</Link>
                           <div className="button button-primary" onClick={this.exportJSON} style={{marginLeft:5}}>Export</div>
                           <div className="button button-primary" onClick={this.importJSON} style={{marginLeft:5}}>Import</div>
                        </div>
                     </div>
                  </Loading>
               </div>
            </div>
         </div>
      );
   }
}


const mapStateToProps = (state, ownProps) => {
   return {
      speaker: state.speaker,
      auth: state.auth,
      silly: state.silly,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return {...bindActionCreators({...SpeakerActions,...Silly}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers)