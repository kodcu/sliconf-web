import React from 'react';
import Dropzone from 'react-dropzone'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as SpeakerActions from '../reducks/modules/event'
import * as ImageActions from '../reducks/modules/image'
import PageHead from "../components/PageHead";
import moment from 'moment';
import classNames from 'classnames';

class EditEvent extends React.Component {

   state = {
      fullName: '',
      detail: '',
      workingAt: '',
      imageId: null,
      linkedin: '',
      twitter: '',
      activeTab: "general",
   }

   getSpeakerData = () => {
      return {
         imageId: this.state.imageId,
         fullName: this.state.fullName,
         detail: this.state.detail,
         workingAt: this.state.workingAt,
         linkedin: this.state.linkedin,
         twitter: this.state.twitter
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.image.id && this.props.image.id !== nextProps.image.id) {
         this.setState({imageId: nextProps.image.id})
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
                     </ul>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="general"})}>
                     <div className="row mtop50">
                        <div class="six columns">
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
                        <div class="twelve columns">
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
                        <div class="twelve columns">
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
                        <div class="twelve columns">
                           <h3>Rooms</h3>
                           <div className="twelve columns" style={{marginLeft:0}}>
                              <div className="nine columns">
                                 <label htmlFor="website">Room Name</label>
                                 <input className="u-full-width" type="text" placeholder="i.e. Room 1" id="roomname"/>
                              </div>
                              <div className="three columns">
                                 <button className='u-full-width' style={{marginTop:21}}>Create Room</button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="sponsors"})}>
                     <div className="row mtop50">
                        <div class="twelve columns">
                           <h3>Sponsors</h3>
                        </div>
                     </div>
                  </div>

                  <div className={classNames('tab',{'active':this.state.activeTab==="floorplan"})}>
                     <div className="row mtop50">
                        <div class="twelve columns">
                           <h3>Floor Plan</h3>
                        </div>
                     </div>
                  </div>

                  <div className="row mtop50">
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
      event: state.event,
      auth: state.auth,
   }
}


const mapDispatchToProps = (dispatch, ownProps) => {
   return bindActionCreators({...SpeakerActions,...ImageActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)