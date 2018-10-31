import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as SpeakerActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import Loading from "../components/Loading";
import SpeakerList from "../components/SpeakerList";
import * as Silly from '../reducks/modules/silly'
import Modal from 'react-modal';

class Speakers extends React.Component {

   state = {
      speakers: [],
      errModal: false,
   };

   componentWillMount() {
      this.props.fetchEventSpeakers(this.props.match.params.eventId);
   }

   componentWillReceiveProps(nextProps) {
      if (this.props.speaker !== nextProps.speaker) {
         this.setState({
            speakers: nextProps.speaker ? nextProps.speaker.speakers : [],
         }, () => {
            if (this.state.speakers && this.state.speakers.length > 0) {
               this.props.changeStep(30);
            } else {
               this.props.changeStep(19);
            }
         })
      }
   }

   JSONcsv = (objArray) => {
      let array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
      let str = '';
      for (let i = 0; i < array.length; i++) {
         let line = '';
         for (let index in array[i]) {
            if (line !== '') line += ',';
            line += "\"" + array[i][index].replace(/"/g, '""') + "\"";
         }
         str += line + ',""\r\n';
      }
      return str.substring(0, str.lastIndexOf("\r\n"));
   };

   satirBul = (tt) => {
      let satirlar = [];
      let eskiSatirlar = tt.split("\n");
      let elde = 0;
      let toplamSTR = "";
      for (let i = 0; i < eskiSatirlar.length; i++) {
         elde += eskiSatirlar[i].split("\"").length - 1;
         if (eskiSatirlar[i].split("\"").length % 2 === 0 || elde % 2 === 1) {
            toplamSTR += eskiSatirlar[i] + "\n";
            if (elde % 2 === 0) {
               satirlar.push(toplamSTR.replace(/\n$/, ""));
            }
         } else {
            satirlar.push(eskiSatirlar[i]);
         }
      }
      console.log(toplamSTR);
      return satirlar;
   };

   CSVToArray = (text) => {
      let p = '', row = [''], ret = [row], i = 0, r = 0, s = !0, l;
      for (l of text) {
         if ('"' === l) {
            if (s && l === p) row[i] += l;
            s = !s;
         } else if (',' === l && s) l = row[++i] = '';
         else if ('\n' === l && s) {
            if ('\r' === p) row[i] = row[i].slice(0, -1);
            row = ret[++r] = [l = ''];
            i = 0;
         } else row[i] += l;
         p = l;
      }
      return ret;
   };

   csvJSON = (csv) => {
      let lines = this.satirBul(csv);
      let result = [];
      let headers = (lines[0]).split(",");
      for (let i = 1; i < lines.length; i++) {
         let obj = {};
         let currentLine = this.CSVToArray(lines[i])[0];
         for (let j = 0; j < headers.length; j++) {
            console.log(typeof(headers[j]), headers[j].toString());
            obj[headers[j]] = currentLine[j];
         }
         result.push(obj);
      }
      return JSON.stringify(result);
   };

   exportJSON = () => {
      const items = this.state.speakers;
      const header = "id,name,profilePicture,workingAt,about,twitter,linkedin".split(",");
      console.log(header);
      items.forEach(function (v) {
         delete v.topics
      });
      let text = header + ",safeCol\n" + this.JSONcsv(items);
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
      let that = this;
      fileInput.addEventListener('change', function () {
         let file = fileInput.files[0];

         if (file.name.match(/\.(csv)$/)) {
            let reader = new FileReader();

            reader.onload = function () {
               console.log(JSON.parse(that.csvJSON(reader.result)));
               this.props.addSpeaker(this.props.match.params.eventId, JSON.parse(this.csvJSON(reader.result)));
            }.bind(this);

            reader.readAsText(file);
         } else {

            this.setState({errModal:true});
         }
      }.bind(this));

      fileInput.click();
   };

   render() {
      return ([<Modal
            className="Modal"
            overlayClassName="Overlay"
            isOpen={this.state.errModal}
            contentLabel="Not Supported"
            style={{content: {width: 500, textAlign: "center", overflow: "hidden"}}}
         >
            <div className="row">
               <div className="twelve columns">
                  <h2>Not Supported</h2>
                  <p>File not supported, .csv files only.</p>
               </div>
            </div>
            <div className="row">
               <div className="twelve columns">
                  <div className="span">
                     <button onClick={()=>{this.setState({errModal:false})}} className={"button-primary"}>Close</button>
                  </div>
               </div>
            </div>
         </Modal>,
            <div className="container mtop">
               <div className="row">
                  <div className="twelve columns">
                     <PageHead where={"/events/" + this.props.match.params.eventId + "/edit"}
                               title="Speakers" {...this.props} />
                     <Loading row="3" loading={this.props.speaker.loading}>
                        <SpeakerList eventId={this.props.match.params.eventId} speakers={this.props.speaker.speakers}
                                     topProps={this.props}/>
                        <div className="row mtop25 mbottom100">
                           <div className="twelve columns">
                              <Link to={"/events/" + this.props.match.params.eventId + "/addspeaker"}
                                    className="button button-primary">Add Speaker</Link>
                              <div className="button button-primary" onClick={this.exportJSON}
                                   style={{marginLeft: 5}}>Export
                              </div>
                              <div className="button button-primary" onClick={this.importJSON}
                                   style={{marginLeft: 5}}>Import
                              </div>
                           </div>
                        </div>
                     </Loading>
                  </div>
               </div>
            </div>]
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
   return {...bindActionCreators({...SpeakerActions, ...Silly}, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Speakers)