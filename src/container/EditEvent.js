import React from 'react';
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SpeakerActions from '../reducks/modules/event'
import * as ImageActions from '../reducks/modules/image'
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';
import randomColor from 'random-color'

class EditEvent extends React.Component {

   state = {
      eventName: '',
      eventStarts: '',
      eventEnds: '',
      eventDesc: '',
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
      phone: '',
      phone2: '',
      location: '',
      lat: '',
      long: '',
      rooms:null,
      sponsors: null,
      imageId: null,
      floorimageId: null,
      activeTab: "general",
   }

   getEventData = () => {
      return {
         eventName: this.state.eventName,
         eventStarts: this.state.eventStarts,
         eventEnds: this.state.eventEnds,
         eventDesc: this.state.eventDesc,
         eventImage: this.state.imageId
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.image.id && this.props.image.id !== nextProps.image.id) {
         this.setState({imageId: nextProps.image.id})
      }

      if (nextProps.floorimage.id && this.props.floorimage.id !== nextProps.floorimage.id) {
         this.setState({floorimageId: nextProps.floorimage.id})
      }
      if (nextProps.speaker && this.props.speaker !== nextProps.speaker) {
         setTimeout(()=>{
            // yüklendi bildirimi çıkarılabilir
            //this.props.history.push('/events/'+this.props.match.params.eventId+'/speakers')
         },2000)
      }
   }

   addSpeaker = () => {
      if(this.state.imageId){
         this.props.addSpeaker(this.props.match.params.eventId, {...this.getSpeakerData()})
      }
   }

   changeValue = (name) => {
      return (e) => {
         this.setState({[name]: e.target.value})
      }
   }

   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]: moment(date).unix() * 1000})
      }
   }

   getRandomColor = () => {
      var color = new randomColor(0.15, 0.98)
      return color.hexString()
   }

   getRandomImage = () => {
      var rand = (Math.ceil(Math.random() * (70 - 1) + 1))
      return {backgroundImage: 'url("http://i.pravatar.cc/150?img=' + rand + '")'}
   }


   onDropFiles = (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length) {
         //this.setState({image: acceptedFiles[0]})
         this.props.uploadImage(acceptedFiles[0])
      }
   }

   render() {
      return (
         <div className="container mtop">
            <div className="row">
               <div className="twelve columns">
                  <PageHead title="Edit Event"/>
                  <div className="container u-full-width tabs">
                     <ul className="navbar-list clickable">
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
                              <input className="u-full-width" type="text" placeholder="" id="name" />
                           </div>
                           <div className="twelve columns">
                              <div className="six columns">
                                 <label htmlFor="datestart">Event Starts</label>
                                 <input className="u-full-width" type="password" placeholder="i.e. 15/08/2017" id="datestart"/>
                              </div>
                              <div className="six columns">
                                 <label htmlFor="dateend">Event Ends</label>
                                 <input className="u-full-width" type="password" placeholder="i.e. 15/08/2017" id="dateend"/>
                              </div>
                           </div>
                           <div className="twelve columns">
                              <label htmlFor="desc">Event Description</label>
                              <textarea className="u-full-width" placeholder="" id="desc"/>
                           </div>
                        </div>
                        <div className="six columns mtop50">
                           <div className="row">
                              <div className="twelve columns">
                                 <Dropzone
                                    accept="image/jpeg, image/png"
                                    onDrop={this.onDropFiles}
                                    style={{}}
                                    className={classNames('resimHolder', {'active':this.state.imageId})}
                                 >
                                    {this.state.imageId ? <div className="row">
                                       <div className="twelve columns">
                                          {/* img url mocktur */}
                                          <div className="resim" style={{backgroundImage: 'url("http://i.pravatar.cc/150?img=' + this.state.imageId + '")'}} width="100%" alt=""></div>
                                       </div>
                                    </div>: ''}
                                 </Dropzone>
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
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="facebook"/>
                              </div>
                              <div className="six columns">
                                 <label htmlFor="instagram">instagram</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="instagram"/>
                              </div>
                           </div>
                           <div className="twelve columns">
                              <div className="six columns">
                                 <label htmlFor="youtube">Youtube</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="youtube"/>
                              </div>
                              <div className="six columns">
                                 <label htmlFor="twitter">twitter</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. @kekemekekedi" id="twitter"/>
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
                                 <input className="u-full-width" type="text" placeholder="i.e. www.sliconf.com" id="website"/>
                              </div>
                           </div>
                           <div className="twelve columns" style={{marginLeft:0}}>
                              <div className="six columns">
                                 <label htmlFor="phone">Phone</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. 0555 555 55 55" id="phone"/>
                              </div>
                              <div className="six columns">
                                 <label htmlFor="phonea">Alternative Phone</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. 0555 555 55 55" id="phonea"/>
                              </div>
                           </div>
                           <div className="twelve columns" style={{marginLeft:0}}>
                              <div className="twelve columns">
                                 <label htmlFor="lokasyon">Location</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. lokasyon" id="lokasyon"/>
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
                                 <div className="nine columns">
                                    <label htmlFor="roomname">Room Name</label>
                                    <input className="u-full-width" type="text" placeholder="i.e. Room 1" id="roomname"/>
                                 </div>
                                 <div className="three columns">
                                    <button className='u-full-width' style={{marginTop:21}}>Create Room</button>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="twelve columns" style={{marginLeft:0}}>
                                 <div className="room" style={{background:this.getRandomColor()}}>Big Room <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 1<div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 2 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 3 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 4 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 5 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 6 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 7 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 8 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 9 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 10 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 11 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 12 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 13 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 14 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 15 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 16 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 17 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 18 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 19 <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Room 20 <div className="remove"></div></div>
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
                                    <input className="u-full-width" type="text" placeholder="i.e. Room 1" id="sponsortag"/>
                                 </div>
                                 <div className="three columns">
                                    <button className='u-full-width' style={{marginTop:21}}>Create Tag</button>
                                 </div>
                              </div>
                           </div>
                           <div className="row">
                              <div className="twelve columns" style={{marginLeft:0}}>
                                 <div className="room" style={{background:this.getRandomColor()}}>Diamond <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Gold <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Silver <div className="remove"></div></div>
                                 <div className="room" style={{background:this.getRandomColor()}}>Bronze <div className="remove"></div></div>
                              </div>
                           </div>

                           <div className="row">
                              <div className="twelve columns" style={{marginLeft:0}}>
                                 <div className="sponsor" style={this.getRandomImage()}></div>
                                 <div className="sponsor" style={this.getRandomImage()}></div>
                                 <div className="sponsor" style={this.getRandomImage()}></div>
                                 <div className="sponsor" style={this.getRandomImage()}></div>
                                 <div className="sponsor" style={this.getRandomImage()}></div>
                                 <div className="sponsor" style={this.getRandomImage()}></div>
                                 <div className="sponsor" style={this.getRandomImage()}></div>
                                 <div className="addSponsor">+</div>
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
                              <div className="twelve columns">
                                 <Dropzone
                                    accept="image/jpeg, image/png"
                                    onDrop={this.onDropFiles}
                                    style={{}}
                                    className={classNames('resimHolder', {'active':this.state.floorimageId})}
                                 >
                                    {this.state.floorimageId ? <div className="row">
                                       <div className="twelve columns">
                                          {/* img url mocktur */}
                                          <div className="resim" style={{backgroundImage: 'url("http://i.pravatar.cc/150?img=' + this.state.floorimageId + '")'}} width="100%" alt=""></div>
                                       </div>
                                    </div>: ''}
                                 </Dropzone>
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
                        <input className={classNames('button-primary',{disabled:!this.state.imageId})} type="submit" onClick={this.addSpeaker} defaultValue="SAVE"/>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   return {
      image: state.image,
      floorimage: state.floorimage,
      event: state.event,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...SpeakerActions,...ImageActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)