import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EventActions from '../reducks/modules/event';
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';
import randomColor from 'string-to-color'
import ImageUpload from '../components/ImageUpload';
import DatePicker from 'react-datepicker';
import ReactDOMServer from 'react-dom/server';
import Modal from 'react-modal';

class EditEvent extends React.Component {

   componentWillMount(){
      this.props.fetchEvent("K123");
   }


   state = {
      id: this.props.match.eventId,
      name:"",
      startdate:"",
      enddate: "",
      logo: "",
      description: "",
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: "",
      web: "",
      phone: "",
      phonea: "",
      lat: "",
      lng: "",
      mapdescription: "",
      rooms:"",
      sponsors: "",
      tags: "",
      floorplan : "",
      modalImage: null,
      activeTab: "general",
      isLoading:false,
      roomName:"",
      tagName:"",
      modalImageId:"",
      modalIsOpen:false,
      modalName:"",
   };

   /*
   getEventData = () => {
      return {
         name: this.state.name,
         startdate: this.state.startdate,
         enddate: this.state.enddate,
         description: this.state.description,
         logo: this.state.logo,
         about: this.state.about
      }
   };
   */

   componentWillReceiveProps(nextProps) {
      if(this.props.name !== nextProps.fetch.event.event.name){
         this.setState({
            name: this.props.fetch.event.event.name,
            startdate: moment(this.props.fetch.event.event.startdate*1000),
            enddate: moment(this.props.fetch.event.event.enddate*1000),
            logo: this.props.fetch.event.event.logo,
            description: this.props.fetch.event.event.description,
            youtube: this.props.fetch.event.event.about.social.youtube,
            twitter: this.props.fetch.event.event.about.social.twitter,
            facebook: this.props.fetch.event.event.about.social.facebook,
            instagram: this.props.fetch.event.event.about.social.instagram,
            web: this.props.fetch.event.event.about.web,
            phone: this.props.fetch.event.event.about.phone[0],
            phonea: this.props.fetch.event.event.about.phone[1],
            lat: this.props.fetch.event.event.about.location.lat,
            lng: this.props.fetch.event.event.about.location.lng,
            mapdescription: this.props.fetch.event.event.about.location.description,
            rooms:this.props.fetch.event.event.rooms,
            sponsors: this.props.fetch.event.event.sponsor,
            tags: this.props.fetch.event.event.sponsortags,
            floorplan : this.props.fetch.event.event.floorplan,
         });
      }
      if (nextProps.speaker && this.props.speaker !== nextProps.speaker) {
         setTimeout(()=>{
            // yuklendi bildirimi cikartilabilir
            //this.props.history.push('/events/'+this.props.match.params.eventId+'/speakers')
         },2000)
      }
   }

   eventControl = () => {
      console.log(this.state)
   };

   addSpeaker = () => {
      if(this.state.logo){
         this.props.addSpeaker(this.props.match.params.eventId, {...this.getSpeakerData()})
      }
   };

   changeValue = (name) => {
      return (e) => {
         this.setState({[name]: e.currentTarget.value})
      }
   };

   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]: moment(moment(date).unix() * 1000)})
      }
   };

   getRandomColor = (string) => {
      let color = randomColor.generate(string);
      return "#"+color
   };

   //I miss jquery
   $ = (sSelector) =>{
      let curr_node = document.querySelectorAll(sSelector);
         return curr_node.length > 0 ? curr_node : false
   };

   roomRemoveClick = (event) => {
      let roomId = event.currentTarget.getAttribute("data-id");
      this.$(".room[data-room="+roomId+"]")[0].remove();
   };

   tagRemoveClick = (event) => {
      let roomId = event.currentTarget.getAttribute("data-id");
      this.$(".room[data-tag="+roomId+"]")[0].remove();
   };

   renderRoom = (roomId, modalImageId, roomLabel) => {
      return(
         <div key={roomId} data-room={roomId} data-floor={modalImageId} className="room" style={{background:this.getRandomColor(roomLabel)}}>{roomLabel} <div className="remove" data-id={roomId} onClick={this.roomRemoveClick}/></div>
      )
   };

   getRooms = () => {
      let indents = [];
      for (let i = 0; i < this.state.rooms.length; i++) {
         indents.push(this.renderRoom(this.state.rooms[i].id, this.state.rooms[i].floor, this.state.rooms[i].label));
      }
      return(
         indents
      )
   };

   renderTag = (tagId, tagLabel) => {
      return(
         <div key={tagId} data-tag={tagId} data-label={tagLabel} className="room" style={{background:this.getRandomColor(tagLabel)}}>{tagLabel} <div className="remove" data-id={tagId} onClick={this.tagRemoveClick}/></div>
      )
   };

   getTags = () => {
      const numbers = Object.keys(this.state.tags);
      const listItems = numbers.map((number) =>
         this.renderTag(number, this.state.tags[number])
      );
      return(
         listItems
      )
   };

   renderBigTag = (sponsorTagId, sponsorTag, indents) => {
      return(
         <div className={"sponsorsWithTags"} data-tag={sponsorTagId} key={sponsorTagId}><h1>{sponsorTag}</h1>{indents}<div className="addSponsor">+</div></div>
      )
   };

   renderSponsor = (sponsorId, sponsorName, sponsorTag, sponsorImage) => {
      return(
         <div key={sponsorId} className="sponsor" data-id={sponsorId} data-name={sponsorName} data-tag={sponsorTag} style={{backgroundImage:"url("+sponsorImage+")"}}>
            <div className="overModal"><div className="remove"/><div className="edit"/></div>
         </div>
      )
   };

   getSponsors = () => {
      const numbers = Object.keys(this.state.sponsors);

      const listTags = numbers.map((number) => {
            let indents = [];
            for (let i = 0; i < this.state.sponsors[number].length; i++) {
               indents.push(this.renderSponsor(this.state.sponsors[number][i].id, this.state.sponsors[number][i].name, this.state.tags[number], this.state.sponsors[number][i].logo));
            }
            return (
               this.renderBigTag(number,this.state.tags[number],indents)

            )
         }
      );
      return(
         listTags
      )
   };

   renderFloors = (modalImageId, floorName, floorImage) => {
      return(
         <div key={modalImageId} className="floor" data-id={modalImageId} data-name={floorName}>
            <div className="plan" style={{backgroundImage:"url("+floorImage+")"}}/>
            <div className="aciklama">{floorName}</div>
            <div className="overModal"><div className="remove"/><div className="edit"/></div>
         </div>
      )
   };

   getFloors = () => {
      let indents = [];
      for (let i = 0; i < this.state.floorplan.length; i++) {
         indents.push(this.renderFloors(this.state.floorplan[i].id, this.state.floorplan[i].name, this.state.floorplan[i].image));
      }
      indents.push(<div className="addSponsor">+</div>);
      return(
         indents
      )
   };

   //TODO idleri arkadan al

   createRoom = () => {
      this.$(".rooms")[0].insertAdjacentHTML('beforeend',ReactDOMServer.renderToStaticMarkup(this.renderRoom(this.state.roomName, this.state.modalImageId, this.state.roomName)));
      this.forceUpdate()
   };

   createTag = () => {
      let tagId = "t"+this.state.tagName;
      this.$(".tags")[0].insertAdjacentHTML('beforeend',ReactDOMServer.renderToStaticMarkup(this.renderTag(tagId,this.state.tagName)));
      this.$(".sponsors")[0].insertAdjacentHTML('beforeend',ReactDOMServer.renderToStaticMarkup(this.renderBigTag(tagId,this.state.tagName,"")));
   };

   onEventImageLoaded = (logo) => {
      this.setState({logo, isLoading:false})
   };


   onFloorImageLoaded = (logo) => {
      this.setState({modalImage:logo})
   };


   openModal = () => {
      this.setState({modalIsOpen: true});
   };

   afterOpenModal = () => {
      // references are now sync'd and can be accessed.

   };

   closeModal = () => {
      this.setState({modalIsOpen: false});
   };


   render() {
      return (
         <div className="container mtop">
            <button onClick={this.openModal}>Open Modal</button>
            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.modalIsOpen}
               onAfterOpen={this.afterOpenModal}
               onRequestClose={this.closeModal}
               contentLabel="Example Modal"
            >

               <div className="row">
                  <div className="nine columns">
                     <h2>Add Image</h2>
                  </div>
                  <div className="three columns">
                     <button style={{float:"right"}} onClick={this.closeModal}>close</button>
                  </div>
               </div>

               <div className="row">
                  <div className="six columns">


                               <ImageUpload onLoad={this.onFloorImageLoaded}>
                                    {this.state.modalImage ?
                                       <div className="row">
                                          <div className="twelve columns">
                                             <div className="resim" style={{backgroundImage: 'url("http://i.pravatar.cc/150?img=' + this.state.modalImage + '")'}} width="100%" alt=""/>
                                          </div>
                                       </div>: ''}
                                    }
                                 </ImageUpload>


                  </div>
                  <div className="six columns">

                     <label htmlFor="modalName">Name</label>
                     <input className="u-full-width" type="text" placeholder="i.e. Floor 1" id="modalName" value={this.state.modalName} onChange={(e) => this.setState({modalName:e.currentTarget.value})}/>
                     <div className="span" style={{float:"right"}}>
                        <button className={"button-primary"}>SAVE</button>
                     </div>
                  </div>
               </div>


            </Modal>
            <div className="row">
               <div className="twelve columns">
                  <PageHead title="Edit Event"/>
                  <div className="container u-full-width tabs">
                     <ul className="navbar-list clickable noselect">
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="general"})}
                            onClick={(e) => this.setState({activeTab: 'general'})}><a className="navbar-link">General</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="social"})}
                            onClick={(e) => this.setState({activeTab: 'social'})}><a className="navbar-link">Social</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="contact"})}
                            onClick={(e) => this.setState({activeTab: 'contact'})}><a className="navbar-link">Contact</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="rooms"})}
                            onClick={(e) => this.setState({activeTab: 'rooms'})}><a className="navbar-link">Rooms</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="sponsors"})}
                            onClick={(e) => this.setState({activeTab: 'sponsors'})}><a className="navbar-link">Sponsors</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="floorplan"})}
                            onClick={(e) => this.setState({activeTab: 'floorplan'})}><a className="navbar-link">Floor Plan</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="advanced"})}
                            onClick={(e) => this.setState({activeTab: 'advanced'})}><a className="navbar-link">Advanced</a></li>
                     </ul>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="general"})}>
                     <div className="row mtop50">
                        <div className="six columns">
                           <h3>General</h3>
                           <div className="twelve columns">
                              <label htmlFor="name">Event Name</label>
                              <input className="u-full-width" type="text" placeholder="" id="name" value={this.state.name} onChange={(e) => this.setState({name: e.currentTarget.value})} />
                           </div>
                           <div className="twelve columns">
                              <div className="six columns">
                                 <label htmlFor="startdate">Event Starts</label>
                                 <DatePicker
                                    className="u-full-width"
                                    minDate={moment()}
                                    maxDate={moment().add(5, "years")}
                                    selected={moment(this.state.startdate)}
                                    selectsStart
                                    startDate={this.state.startdate}
                                    endDate={this.state.enddate}
                                    onChange={this.changeDateValue('startdate')}
                                 />
                              </div>
                              <div className="six columns">
                                 <label htmlFor="enddate">Event Ends</label>
                                 <DatePicker
                                    className="u-full-width"
                                    minDate={moment()}
                                    maxDate={moment().add(5, "years")}
                                    selected={moment(this.state.enddate)}
                                    selectsEnd
                                    startDate={this.state.startdate}
                                    endDate={this.state.enddate}
                                    onChange={this.changeDateValue('enddate')}
                                 />
                              </div>
                           </div>
                           <div className="twelve columns">
                              <label htmlFor="desc">Event Description</label>
                              <textarea className="u-full-width" placeholder="" id="desc" value={this.state.description} onChange={(e) => this.setState({description: e.currentTarget.value})}/>
                           </div>
                        </div>
                        <div className="six columns mtop50">
                           <div className="row">
                              <div className="twelve columns">
                                 <ImageUpload onLoad={this.onEventImageLoaded}>
                                    {this.state.logo ?
                                       <div className="row">
                                          <div className="twelve columns">
                                             {/* img url mocktur */}
                                             <div className="resim" style={{backgroundImage: 'url("http://i.pravatar.cc/150?img=' + this.state.logo + '")'}} width="100%" alt="" />
                                          </div>
                                       </div>: ''}
                                    }
                                 </ImageUpload>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="social"})}>
                     <div className="row mtop50">
                        <div className="twelve columns">
                           <h3>Social</h3>
                           <div className="twelve columns">
                              <div className="six columns">
                                 <label htmlFor="facebook">facebook</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="facebook" value={this.state.facebook} onChange={(e) => this.setState({facebook:e.currentTarget.value})}/>
                              </div>
                              <div className="six columns">
                                 <label htmlFor="instagram">instagram</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="instagram" value={this.state.instagram} onChange={(e) => this.setState({instagram:e.currentTarget.value})}/>
                              </div>
                           </div>
                           <div className="twelve columns">
                              <div className="six columns">
                                 <label htmlFor="youtube">Youtube</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="youtube" value={this.state.youtube} onChange={(e) => this.setState({youtube:e.currentTarget.value})}/>
                              </div>
                              <div className="six columns">
                                 <label htmlFor="twitter">twitter</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="twitter" value={this.state.twitter} onChange={(e) => this.setState({twitter:e.currentTarget.value})}/>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="contact"})}>
                     <div className="row mtop50">
                        <div className="twelve columns">
                           <h3>Contact</h3>
                           <div className="twelve columns" style={{marginLeft:0}}>
                              <div className="twelve columns">
                                 <label htmlFor="website">Website</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. www.sliconf.com" id="website" value={this.state.web} onChange={(e) => this.setState({web:e.currentTarget.value})}/>
                              </div>
                           </div>
                           <div className="twelve columns" style={{marginLeft:0}}>
                              <div className="six columns">
                                 <label htmlFor="phone">Phone</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. 0555 555 55 55" id="phone" value={this.state.phone} onChange={(e) => this.setState({phone:e.currentTarget.value})}/>
                              </div>
                              <div className="six columns">
                                 <label htmlFor="phonea">Alternative Phone</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. 0555 555 55 55" id="phonea" value={this.state.phonea} onChange={(e) => this.setState({phonea:e.currentTarget.value})}/>
                              </div>
                           </div>
                           <div className="twelve columns" style={{marginLeft:0}}>
                              <div className="twelve columns">
                                 <label htmlFor="lokasyon">Location</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. lokasyon" id="lokasyon" value={this.state.mapdescription} onChange={(e) => this.setState({mapdescription:e.currentTarget.value})}/>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="rooms"})}>
                     <div className="row mtop50">
                        <div className="twelve columns">
                           <h3>Rooms</h3>
                           <div className="row">
                              <div className="twelve columns" style={{marginLeft:0}}>
                                 <div className="five columns">
                                    <label htmlFor="roomname">Room Name</label>
                                    <input className="u-full-width" type="text" placeholder="i.e. Room 1" id="roomname" value={this.state.roomName} onChange={(e) => this.setState({roomName: e.currentTarget.value})}/>
                                 </div>
                                 <div className="four columns">
                                    <label htmlFor="floorname">Floor</label>
                                    <select className="u-full-width" value={this.state.modalImageId} onChange={this.changeValue('modalImageId')}>
                                       <option value="f1">Floor 1</option>
                                       <option value="f2">Floor 2</option>
                                    </select>
                                 </div>
                                 <div className="three columns">
                                    <button className='u-full-width' style={{marginTop:21}} onClick={this.createRoom}>Create Room</button>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="twelve columns rooms" style={{marginLeft:0}}>
                                 {this.getRooms()}
                              </div>
                           </div>




                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="sponsors"})}>
                     <div className="row mtop50">
                        <div className="twelve columns">
                           <h3>Sponsors</h3>
                           <div className="row">
                              <div className="twelve columns" style={{marginLeft:0}}>
                                 <div className="nine columns">
                                    <label htmlFor="sponsortag">Sponsor Tag</label>
                                    <input className="u-full-width" type="text" placeholder="i.e. Room 1" id="sponsortag" value={this.state.tagName} onChange={(e) => this.setState({tagName: e.currentTarget.value})}/>
                                 </div>
                                 <div className="three columns">
                                    <button className='u-full-width' style={{marginTop:21}} onClick={this.createTag}>Create Tag</button>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="twelve columns tags" style={{marginLeft:0}}>
                                 {this.getTags()}
                              </div>
                           </div>

                           <div className="row">
                              <div className="twelve columns sponsors" style={{marginLeft:0}}>
                                 {this.getSponsors()}
                              </div>
                           </div>


                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="floorplan"})}>
                     <div className="row mtop50">
                        <div className="twelve columns">
                           <h3>Floor Plan</h3>
                           <div className="row">
                              <div className="twelve columns floors">
                                 {this.getFloors()}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="advanced"})}>
                     <div className="row mtop50">
                        <div className="twelve columns">
                           <h3>Advanced</h3>
                           <div className="row">
                              <div className="twelve columns">
                                 <button className="button-red">Delete Event</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="row mtop50 mbottom100">
                     <div className="six columns">
                        <input className={classNames('button-primary',{disabled:this.state.isLoading})} type="submit" onClick={this.eventControl} defaultValue="SAVE"/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      fetch: state.event,
      auth: state.auth,
   }
};


const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({...EventActions}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)