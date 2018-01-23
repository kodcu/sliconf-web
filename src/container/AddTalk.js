import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as TalkActions from '../reducks/modules/speaker'
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';
import * as EventActions from '../reducks/modules/event';
import DatePicker from '../components/DatePicker';
import Loading from "../components/Loading";
import ReactTooltip from 'react-tooltip'
import * as Silly from '../reducks/modules/silly'

class AddTalk extends React.Component {

   state = {
      id:'',
      speaker:'',
      topic:'',
      detail:'',
      level:'',
      room:'',
      startDate:moment.now(),
      duration:'0',
      speakers:[],
      rooms:[],
      topicsRaw:'',
      topics:[],
      loading:true,
      edit:false,
      agenda:[],
      collided:true,
      noAlert:'Please fill the fields.',
      firstStartDate:moment.now(),
      endDate:moment.now(),
   };

   getTalkData = () => {
      return {
         id: this.state.id,
         speaker: this.state.speaker ? this.state.speaker : this.state.speakers[0].id,
         detail: this.state.detail,
         topic: this.state.topic,
         date: Math.floor(this.state.startDate/1000),
         duration: Number(this.state.duration),
         room: this.state.room ? this.state.room : this.state.rooms[0].id,
         level: this.state.level ? this.state.level : 0,
         tags: this.state.topics,
      }
   };

   componentWillMount(){
      this.props.fetchEvent(this.props.match.params.eventId);
   }

   componentDidMount(){
      //console.log(tasdhis.props.event.agenda);
      this.props.changeStep(27);
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.event && this.props.event !== nextProps.event) {
         this.setState({
            speakers: nextProps.event.speakers,
            rooms: nextProps.event.rooms,
            agenda: nextProps.event.agenda,
            startDate:nextProps.event.startDate,
            firstStartDate:nextProps.event.startDate,
            endDate:nextProps.event.endDate,
            loading: false,
         },()=>{
            if(this.props.match.params.talkId){
               let getter = this.state.agenda.filter(agendaItem => agendaItem.id === this.props.match.params.talkId)[0];
               //console.log(getter);
               if(getter){
                  this.setState({
                     edit:true,
                     noAlert:'',
                     collided:false,
                     id:getter.id,
                     speaker:getter.speaker,
                     topic:getter.topic,
                     detail:getter.detail,
                     level:getter.level,
                     room:getter.room,
                     startDate:moment(getter.date*1000),
                     firstStartDate:moment(getter.date*1000),
                     duration:getter.duration,
                     topicsRaw:getter.tags.join(", "),
                     topics:getter.tags,
                  })
               }
            }

         });
      }

      if(nextProps.speaker && this.props.speaker !== nextProps.speaker){
         if(!nextProps.speaker.loading){
            this.props.history.push("/events/"+this.props.match.params.eventId+"/talks");
         }
      }
   }

   newVersion = () => {
      if(this.state.topic){
         if(this.state.duration>0 && this.state.duration!=='') {
            if(this.props.match.params.talkId){
               let cloneTalks = this.props.event ? this.props.event.agenda.slice(0) : [];
               cloneTalks.map((key,index) => {
                  //console.log(key.name);
                  if(key.id===this.state.id){
                     cloneTalks[index] = this.getTalkData();
                  }
                  return true;
               });
               this.setState({noAlert:""});
               return cloneTalks;
            }else{
               let cloneAgenda = this.props.event.agenda ? this.props.event.agenda.slice(0) : [];
               cloneAgenda.push({...this.getTalkData()});
               this.setState({noAlert:""});
               return cloneAgenda;
            }
         }else{
            this.setState({
               noAlert:"Please enter a valid duration for this talk",
            });
         }
      }else{
         this.setState({
            noAlert:"Please enter a topic for this talk",
         });
      }
      return null;
   };

   addTalk = () => {
      let nV = this.newVersion();
      if(nV!==null){
         this.props.addTalk(this.props.match.params.eventId, nV);
      }
      /*
      else{
         //Bu kisim zaten artik calismiyor. Tooltip olarak gosteriyoruz.
         //alert(this.state.noAlert);
      }
      */

   };

   cleanArray = (actual) => {
      let newArray = [];
      for (let i = 0; i < actual.length; i++) {
         if (actual[i] && actual[i].trim()) {
            newArray.push(actual[i]);
         }
      }
      let uniqueArray = [];
      uniqueArray = newArray.filter(function(item, pos, self) {
         return self.indexOf(item) === pos;
      });

      return uniqueArray;
   };

   changeValue = (name) => {
      return (e) => {
         if(name==="topicsRaw"){
            this.setState({
               topics:this.cleanArray(e.target.value.split(","))
            });
         }
         this.setState({
            [name]: e.target.value,
         },()=>{this.setState({
            collided: this.isCollided()
         })})
      }
   };

   changeDateValue = (name) => {
      return (date) => {
         this.setState({
            [name]: Math.floor(moment(date).unix()/60)*60*1000,
         },()=>{this.setState({
            collided: this.isCollided()
         })})
      }
   };
   isCollided = () => {
      let i,j,d=false;
      let collItem = null;
      let ts = this.newVersion();
      console.log(ts);
      if(ts){
         //dogru islem yapabilmemiz icin siralamamiz gerekiyor
         ts.sort(function(a, b) {
            return a.date.toString().localeCompare(b.date.toString())
         });
         //console.log("yeni versiyon", ts);
         for(i=0;i<ts.length;i++){
            for(j=0;j<i;j++){
               //new bugfix - tam ust uste gelirse
               if(ts[i].date===ts[j].date && ts[i].room === ts[j].room){
                  console.log(ts[i], ts[j]);
                  collItem = ts[i].id===this.state.id ? ts[j] : ts[i];
                  this.setState({noAlert:"There is a collusion! (With "+collItem.topic+" at "+moment(collItem.date*1000).format('HH:mm')+")"});
                  return true;
               }
               if(ts[i].room===ts[j].room || ts[i].room===""){
                  //console.log("start>=end", ts[i].date>=ts[j].date+ts[j].duration);
                  //console.log("start>start", ts[i].date>ts[j].date);
                  if(!(ts[i].date>=ts[j].date+(ts[j].duration*60) && ts[i].date>ts[j].date)){
                     d = true;
                     //end-begin collusion bug fix
                     collItem = ts[i].id===this.state.id ? ts[j] : ts[i];
                  }
               }
            }
         }
         if(d){this.setState({noAlert:"There is a collusion! (With "+collItem.topic+" at "+moment(collItem.date*1000).format('HH:mm')+")"})}
         return d;
      }else{
         return true;
      }
   };

   render(){
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <Loading row="3" loading={this.state.loading}>
                     {this.state.speakers && this.state.speakers.length>0 ? this.state.rooms && this.state.rooms.length>0 ? <div className="yea">
                        <PageHead where={'/events/'+this.props.match.params.eventId+'/talks'} title={this.props.match.params.talkId ? "Edit Talk" : "Add Talk"} {...this.props} />
                           <div className="row">
                              <div className="seven columns">
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label>Speaker</label>
                                       <select className="u-full-width" value={this.state.speaker} onChange={this.changeValue('speaker')}>
                                          {this.state.speakers.map((speaker)=><option key={speaker.id} value={speaker.id}>{speaker.name}</option>)}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <input autoFocus className="moving u-full-width" type="text" id={"topic"}
                                              value={this.state.topic} onChange={this.changeValue('topic')}/>
                                       <label htmlFor="topic">Topic</label>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="pass">Detail</label>
                                       <textarea style={{minHeight: 110}} className="u-full-width" value={this.state.detail}
                                                 onChange={this.changeValue('detail')}/>
                                    </div>
                                 </div>

                              </div>
                              <div className="five columns">
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="exampleRecipientInput">Level</label>
                                       <select className="u-full-width" value={this.state.level} onChange={this.changeValue('level')}>
                                          <option value="0">Beginner</option>
                                          <option value="1">Intermediate</option>
                                          <option value="2">Advanced</option>
                                       </select>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="exampleRecipientInput">Room</label>
                                       <select className="u-full-width" value={this.state.room} onChange={this.changeValue('room')}>
                                          {this.state.rooms.map((room)=><option key={room.id} value={room.id}>{room.label}</option>)}
                                       </select>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="date">TALK DATE and TIME</label>
                                       <DatePicker
                                          showTimeSelect
                                          minDate={moment(this.state.firstStartDate)}
                                          maxDate={moment(this.state.endDate)}
                                          timeIntervals={5}
                                          className="u-full-width"
                                          dateFormat="DD MMM YYYY, ddd"
                                          locale={"en"}
                                          selected={moment(this.state.startDate)}
                                          onChange={this.changeDateValue('startDate')}
                                          popperPlacement="bottom-end"
                                          readOnly={true}
                                       />
                                    </div>
                                 </div>

                                 <div className="row">
                                    <div className="twelve columns">
                                       <label>Duration(<small>minutes</small>)</label>
                                       <input type="number" className="u-full-width" value={this.state.duration} onChange={this.changeValue('duration')}/>
                                    </div>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="twelve columns">
                                    <input className="moving u-full-width" type="text" id={"tags"}
                                           value={this.state.topicsRaw} onChange={this.changeValue('topicsRaw')}/>
                                    <label htmlFor="tags">Tags (seperate with comma)</label>
                                 </div>
                              </div>
                              <div className="row">
                                 <div className="twelve columns">
                                    {this.state.topics.map((value,index)=>{
                                       return <div className={"room"} key={index} style={{background:"gainsboro"}}>{value}</div>
                                    })}
                                 </div>
                              </div>
                           </div>
                           <div className="row mtop50 mbottom100">
                              <div className="six columns">
                                 <div data-for='global' data-tip style={{display:"inline-block",height:38}}>
                                    <input disabled={this.state.collided} className={classNames('button-primary')} type="submit" onClick={this.addTalk} defaultValue={this.props.match.params.talkId ? "Save" : "Add Talk"}/>
                                 </div>
                                 {this.state.noAlert!=="" ? <ReactTooltip id="global" place="right" type="dark" effect="solid">{this.state.noAlert}</ReactTooltip>:''}
                              </div>
                           </div>
                        </div> : <div><h1>Sorry!</h1><p>You can't {this.props.match.params.talkId ? "edit Talk" : "add talk"} before you add a room.</p><button onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/edit/rooms")}}>GO TO EVENT SETTINGS</button></div>
                        : <div><h1>Sorry!</h1><p>You can't {this.props.match.params.talkId ? "edit Talk" : "add talk"} before you add a speaker.</p><button onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/addspeaker/redirected")}}>GO TO ADD SPEAKER</button></div>}
                  </Loading>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      event: state.event.event,
      speaker : state.speaker,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...EventActions,...TalkActions,...Silly}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTalk)