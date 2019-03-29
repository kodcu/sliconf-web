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
      topic:'',
      room:'',
      startDate:moment.now(),
      duration:'0',
      loading:true,
      edit:false,
      collided:true,
      noAlert:'Please fill the fields.',
      firstStartDate:moment.now(),
      endDate:moment.now(),
   };

   getTalkData = () => {
      return {
         id: this.state.id,
         speaker: '',
         detail: '',
         topic: this.state.topic,
         date: moment(this.state.startDate).valueOf(),
         duration: this.state.duration,
         room: "",
         level: -1,
         tags: [],
      }
   };

   componentWillMount(){
      this.props.fetchEvent(this.props.match.params.eventId);
      this.props.changeStep(25);
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.event && this.props.event !== nextProps.event) {
          //console.log('willreceiveprops first', nextProps.event);

          if(this.props.match.params.breakId) {
              let getter1 = nextProps.event.agenda.filter(agendaItem => agendaItem.id === this.props.match.params.breakId)[0];
              if (getter1) {
                  this.setState({
                      startDate:moment(getter1.date),
                  })
              }
          }
         this.setState({
            speakers: nextProps.event.speakers,
            rooms: nextProps.event.rooms,
            agenda: nextProps.event.agenda,
            //startDate:nextProps.event.startDate,
            firstStartDate:nextProps.event.startDate,
            endDate:nextProps.event.endDate,
            loading: false,
         },()=>{
            if(this.props.match.params.breakId){
               let getter = this.state.agenda.filter(agendaItem => agendaItem.id === this.props.match.params.breakId)[0];
               //console.log(getter);
               if(getter){
                  this.setState({
                     edit:true,
                     collided:false,
                     noAlert:'',
                     id:getter.id,
                     topic:getter.topic,
                     level:getter.level,
                     room:getter.room,
                     startDate:moment(getter.date),
                     firstStartDate:moment(nextProps.event.startDate),
                     duration:getter.duration,
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
            if(this.props.match.params.breakId){
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
               noAlert:"Please enter a valid duration for this break",
            });
         }
      }else{
         this.setState({
            noAlert:"Please enter a name for this break (Example: Coffee Break)",
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
            [name]: Math.floor(moment(date)/60000)*60000,
         },()=>{this.setState({
            collided: this.isCollided()
         })})
      }
   };

   isCollided = () => {
      let i,j,d=false;
      let collItem = null;
      let ts = this.newVersion();
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
                  collItem = ts[i].id===this.state.id ? ts[j] : ts[i];
                  this.setState({noAlert:"There is a collusion! (With "+collItem.topic+" at "+moment(collItem.date).format('HH:mm')+")"});
                  return true;
               }
               if(ts[i].room===ts[j].room || ts[i].room===""){
                  //console.log("start>=end", ts[i].date>=ts[j].date+ts[j].duration);
                  //console.log("start>start", ts[i].date>ts[j].date);
                  if(!(ts[i].date>=ts[j].date+(ts[j].duration*60000) && ts[i].date>ts[j].date)){
                     d = true;
                     //end-begin collusion bug fix
                     collItem = ts[i].id===this.state.id ? ts[j] : ts[i];
                  }
               }
            }
         }
         if(d){this.setState({noAlert:"There is a collusion! (With "+collItem.topic+" at "+moment(collItem.date).format('HH:mm')+")"})}
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
                     {this.state.rooms && this.state.rooms.length>0 ? <div className="yea">
                        <PageHead where={'/events/'+this.props.match.params.eventId+'/talks'} title={this.props.match.params.breakId ? "Edit Break" : "Add Break"} {...this.props} />
                           <div className="row">
                              <div className="six columns">
                                 <div className="row">
                                    <div className="twelve columns">
                                       <input autoFocus className="moving u-full-width" type="text" id={"topic"}
                                              value={this.state.topic} onChange={this.changeValue('topic')}/>
                                       <label htmlFor="topic">Topic</label>
                                    </div>
                                 </div>
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="date">BREAK DATE and TIME</label>
                                       <DatePicker
                                          showTimeSelect
                                          minDate={moment(this.state.firstStartDate)}
                                          maxDate={moment(this.state.endDate)}
                                          timeIntervals={5}
                                          className="u-full-width"
                                          dateFormat="DD MMM YYYY, ddd"
                                          locale={"en"}
                                          selected={moment(this.state.firstStartDate)}
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
                              <div className="four columns">
                                 {/*
                                 <div className="row">
                                    <div className="twelve columns">
                                       <label htmlFor="exampleRecipientInput">Room</label>
                                       <select className="u-full-width" value={this.state.room} onChange={this.changeValue('room')}>
                                          {this.state.rooms.map((room)=><option key={room.id} value={room.id}>{room.label}</option>)}
                                       </select>
                                    </div>
                                 </div>
                                 */}
                              </div>
                           </div>
                           <div className="row mtop50 mbottom100">
                              <div className="six columns">
                                 <div data-for='global' data-tip style={{display:"inline-block",height:38}}>
                                    <input disabled={this.state.collided} className={classNames('button-primary')} type="submit" onClick={this.addTalk} value={this.props.match.params.breakId ? "Save" : "Add Break"}/>
                                 </div>
                                 {this.state.noAlert!=="" ? <ReactTooltip id="global" place="right" type="dark" effect="solid">{this.state.noAlert}</ReactTooltip>:''}
                              </div>
                           </div>
                        </div> : <div><h1>Sorry!</h1><p>You can't {this.props.match.params.breakId ? "edit break" : "add break"} before you add a room.</p><button onClick={()=>{this.props.history.push("/events/"+this.props.match.params.eventId+"/edit/rooms")}}>GO TO EVENT SETTINGS</button></div>
                        }
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