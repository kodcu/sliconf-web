/* eslint-disable no-undef */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as EventActions from '../reducks/modules/event';
import * as RoomActions from '../reducks/modules/room';
import moment from 'moment';
import classNames from 'classnames';
import ImageUpload from '../components/ImageUpload';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import RoomTag from "../components/RoomTag";
import RoomCreate from "../components/RoomCreate";
import SponsorTag from "../components/SponsorTag";
import SponsorTagCreate from "../components/SponsorTagCreate";
import SponsorList from "../components/SponsorList";
import Floor from "../components/Floor";
import Loading from "../components/Loading";
import ReactTelInput from 'react-telephone-input';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import ReactTooltip from 'react-tooltip'

const _ = require("lodash");
const { compose, withProps, lifecycle } = require("recompose");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
   withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD2r6MrjloKbW0cgCJuZC5Taj5DJJfFIiY&v=3.exp&libraries=geometry,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
   }),
   lifecycle({
      componentWillMount() {
         const refs = {};
         this.setState({
            bounds: null,
            center: {
               lat: this.props.lat ? Number(this.props.lat) : 0,
               lng: this.props.lng ? Number(this.props.lng) : 0
            },
            zoom:this.props.mapdescription ? 17 : 1,
            place:"",
            markers: [],
            onMapMounted: ref => {
               refs.map = ref;
            },
            onBoundsChanged: () => {
               this.setState({
                  bounds: refs.map.getBounds(),
                  center: refs.map.getCenter(),
               })
            },
            onSearchBoxMounted: ref => {
               refs.searchBox = ref;
            },
            onPlacesChanged: () => {
               const places = refs.searchBox.getPlaces();
               places.splice(1);
               const bounds = new google.maps.LatLngBounds();

               places.forEach(place => {
                  if (place.geometry.viewport) {
                     bounds.union(place.geometry.viewport)
                  } else {
                     bounds.extend(place.geometry.location)
                  }
               });
               const nextMarkers = places.map(place => ({
                  position: place.geometry.location,
               }));
               const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
               this.setState({
                  center: nextCenter,
                  markers: nextMarkers,
                  zoom:17,
                  place:places[0] ? places[0].formatted_address : '',
               });
               this.props.callback(this.state.place, nextCenter.lat(), nextCenter.lng());
            },
         })
      },
   }),
   withScriptjs,
   withGoogleMap
)(props =>
   <GoogleMap
      defaultOptions={{
         streetViewControl: false,
         scaleControl: false,
         mapTypeControl: false,
         rotateControl: false,
         fullscreenControl: false
      }}
      ref={props.onMapMounted}
      defaultZoom={1}
      zoom={props.zoom}
      center={props.center}
      onBoundsChanged={props.onBoundsChanged}
      gestureHandling={'greedy'}
   >
      {props.lat ? <Marker position={{lat: Number(props.lat), lng: Number(props.lng)}} /> : ''}
      <SearchBox
         ref={props.onSearchBoxMounted}
         bounds={props.bounds}
         controlPosition={google.maps.ControlPosition.TOP_LEFT}
         onPlacesChanged={props.onPlacesChanged}
      >
         <input
            type="text"
            placeholder= {props.mapdescription ? props.mapdescription : "Search"}
            style={{
               marginLeft:'1%',
               boxSizing: `border-box`,
               border: `1px solid transparent`,
               width: `98%`,
               height: `32px`,
               marginTop: `10px`,
               padding: `0 12px`,
               borderRadius: `3px`,
               boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
               fontSize: `14px`,
               outline: `none`,
               textOverflow: `ellipses`,
            }}
         />
      </SearchBox>
      {props.markers.map((marker, index) =>
         <Marker key={index} position={marker.position} />
      )}
   </GoogleMap>
);

class EditEvent extends React.Component {

   state = {
      loading:true,
      id: this.props.match.eventId,
      name: "",
      startDate: moment(),
      endDate: moment(),
      logoPath: "",
      description: "",
      youtube: "",
      twitter: "",
      facebook: "",
      instagram: "",
      web: "",
      email: "",
      phone: "",
      phonea: "",
      lat: "",
      lng: "",
      mapdescription: "",
      rooms:"",
      sponsors: "",
      sponsorTags: "",
      floorPlan : "",
      modalImage: null,
      activeTab: "general",
      isLoading:false,
      roomName:"",
      tagName:"",
      modalImageId:"",
      modalIsOpen:false,
      modalName:"",
      place:"",
      changed:false,
      nextTab:'general',
      sureIsOpen:false,
      roomAlertIsOpen:false,
      modalIsNew:false,
      nthNewSponsor:2,
      nthNewFloor:1,
      nthChange:0,
      resetIsOpen:false,
      deleteIsOpen:false,
      floorIsOpen:false,
      sponsorIsOpen:false,
      sponsorTagIsOpen:false,
      newAlertIsOpen:false,
      saveText:"SAVE",
      initalize:true,
      deleteInput:'',
      notCorrectEventName:'You must enter your event name to the field!',
      noAsking:false,
   };

   constructor(props){
      super(props);
      this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
   };

   forceUpdateHandler(){
      this.forceUpdate();
   };

   setNewPlace = (place,lat,lng) => {
      this.setState({
         mapdescription : place,
         lat: lat,
         lng: lng,
         changed:true,
      });
   };

   componentWillMount(){
      Modal.setAppElement('body');
   }

   componentDidMount(){
      let par = this.props.match.params.new;
      if(par==="new-event"){
         this.openNewAlert();
      }else if(par==="general" || par==="social" || par==="contact" || par==="floorplan" || par==="rooms" || par==="sponsors" || par==="advanced"){
         this.changeTab(this.props.match.params.new);
      }
      this.props.fetchEvent(this.props.match.params.eventId);
   }

   resetAll = () => {
      this.closeReset();
      this.setState({
         loading:true,
         changed:false,
      });
      this.props.fetchEvent(this.props.match.params.eventId);
   };

   deleteEvent = () => {
      if(this.state.deleteInput===this.state.name) {
         this.closeDelete();
         this.setState({
            changed: false,
         });
         //console.log("Deleting...")
         this.props.deleteEvent(this.props.match.params.eventId,this.props.auth.user.id);
      }
   };

   componentWillReceiveProps(nextProps) {
      //console.log("bisiler oldu");
      //console.log(nextProps.fetch);

      if((nextProps.fetch && this.props.fetch !== nextProps.fetch) && nextProps.fetch.loading===false && nextProps.fetch.status===false){
         this.props.history.push("/");
      }

      if(nextProps.fetch.removed){
         this.props.history.push("/");
      }

      if((nextProps.fetch && this.props.fetch !== nextProps.fetch) && nextProps.fetch.loading){
         if(this.state.initalize){
            this.setState({
               initalize:false,
               changed:false,
            });
         }
      }

      //console.log("bu",nextProps)
      if(nextProps.fetch && this.props.fetch !== nextProps.fetch && (!nextProps.fetch.loading)){
            if(this.state.saveText==="SAVING..."){
               this.setState({
                  saveText:"SAVED!"
               });
               setTimeout(function(){
                  this.setState({
                     saveText:"SAVE",
                  })
               }.bind(this),2000)
            }
      }

      if ((nextProps.event && this.props.event !== nextProps.event) || (this.props.event && nextProps.event && this.props.event.id !== nextProps.event.id)) {
         //console.log("event degismis");

         console.log(nextProps.event);
         if(nextProps.event.deleted===true){
            this.props.history.push("/");
         }

         this.setState({
            id: nextProps.event.id ? nextProps.event.id : '',
            name: nextProps.event.name ? nextProps.event.name : '',
            startDate: nextProps.event.startDate ? moment(nextProps.event.startDate) : moment(),
            endDate: nextProps.event.endDate ? moment(nextProps.event.endDate) : moment(),
            logoPath: nextProps.event.logoPath ? nextProps.event.logoPath : '',
            description: nextProps.event.description ? nextProps.event.description : '',
            youtube: nextProps.event.about ? nextProps.event.about.social ? nextProps.event.about.social.youtube ? nextProps.event.about.social.youtube : '' : '' : '',
            twitter: nextProps.event.about ? nextProps.event.about.social ? nextProps.event.about.social.twitter ? nextProps.event.about.social.twitter : '' : '' : '',
            facebook: nextProps.event.about ? nextProps.event.about.social ? nextProps.event.about.social.facebook ? nextProps.event.about.social.facebook : '' : '' : '',
            instagram: nextProps.event.about ? nextProps.event.about.social ? nextProps.event.about.social.instagram ? nextProps.event.about.social.instagram : '' : '' : '',
            web: nextProps.event.about ? nextProps.event.about.web ? nextProps.event.about.web : '' : '',
            email: nextProps.event.about ? nextProps.event.about.email ? nextProps.event.about.email : '' : '',
            phone: nextProps.event.about ? nextProps.event.about.phone ? nextProps.event.about.phone[0] ? nextProps.event.about.phone[0] : '' : '' : '',
            phonea: nextProps.event.about ? nextProps.event.about.phone ? nextProps.event.about.phone[1] ? nextProps.event.about.phone[1] : '' : '' : '',
            lat: nextProps.event.about ? nextProps.event.about.location ? nextProps.event.about.location.lat ? nextProps.event.about.location.lat : '' : '' : '',
            lng: nextProps.event.about ? nextProps.event.about.location ? nextProps.event.about.location.lng ? nextProps.event.about.location.lng : '' : '' : '',
            mapdescription: nextProps.event.about ? nextProps.event.about.location ? nextProps.event.about.location.description ? nextProps.event.about.location.description : '' : '' : '',
            rooms:nextProps.event.rooms ? nextProps.event.rooms : [],
            sponsors: nextProps.event.sponsors ? nextProps.event.sponsors : {},
            sponsorTags: nextProps.event.sponsorTags ? nextProps.event.sponsorTags : {},
            floorPlan : nextProps.event.floorPlan ? nextProps.event.floorPlan : [],
            loading:false,
            nthChange:this.state.nthChange+1,
         },()=>{
            if(this.state.changeTabAfterReset){
               this.changeTab(this.state.nextTab);
               this.setState({
                  changeTabAfterReset:false,
                  nextTab:this.state.activeTab,
               })
            }
         });
      }
   }
   /*
   addSpeaker = () => {
      if(this.state.logo){
         this.props.addSpeaker(this.props.match.params.eventId, {...this.getSpeakerData()})
      }
   };
   */
   changeDateValue = (name) => {
      return (date) => {
         this.setState({[name]: moment(moment(date).unix() * 1000), changed: true})
      }
   };

   onEventImageLoaded = (logo) => {
      this.setState({logoPath:logo, isLoading:false, changed:true})
   };

   onFloorImageLoaded = (logo) => {
      this.setState({modalImage:logo, isLoading:false})
   };

   instantGratification = (fn,delay) => {
      if(fn()){
         return setInterval(fn,delay);
      }
   }

   changeTab = (tab) => {
      this.setState({
         nextTab:tab,
      });
      if(((this.state.activeTab==="general" || this.state.activeTab==="social" || this.state.activeTab==="contact") &&
         (tab==="general" || tab==="social" || tab==="contact")) || (!this.state.changed===true)){
         let waitingToSave;
         waitingToSave = this.instantGratification(()=>{
            if(this.state.saveText==="SAVED!" || this.state.saveText==="SAVE"){
               clearInterval(waitingToSave);
               if(tab==="speakers"){
                  this.props.history.push("/events/"+this.props.match.params.eventId+"/speakers/")
                  return false;
               }else if(tab==="agenda"){
                  this.props.history.push("/events/"+this.props.match.params.eventId+"/talks/")
                  return false;
               }else if(tab==="statics"){
                  this.props.history.push("/events/"+this.props.match.params.eventId+"/statics/")
                  return false;
               }else if(tab==="comments"){
                  this.props.history.push("/events/"+this.props.match.params.eventId+"/moderate/")
                  return false;
               }else if(tab==="presentation"){
                  this.props.history.push("/events/"+this.props.match.params.eventId+"/presentation/")
                  return false;
               }else{
                  this.setState({activeTab:tab});
                  this.props.history.push("/events/"+this.props.match.params.eventId+"/edit/"+tab);
               }
            }
            return true;
         },100);
      }else{
         this.openSure();
      }
   };

   prepareReturn = (type) => {
      if (type === "general" || type === "social" || type === "contact") {
         return {
            "key": this.props.match.params.eventId,
            "name": this.state.name,
            "startDate": moment(this.state.startDate*1000).unix(),
            "endDate": moment(this.state.endDate*1000).unix(),
            "logoPath": this.state.logoPath,
            "description":  this.state.description,
            "about": {
               "social": {
                  "youtube": this.state.youtube,
                  "twitter": this.state.twitter,
                  "facebook": this.state.facebook,
                  "instagram": this.state.instagram
               },
               "web": this.state.web,
               "email": this.state.email,
               "phone": [
                  this.state.phone,
                  this.state.phonea
               ],
               "location": {
                  "lat": this.state.lat,
                  "lng": this.state.lng,
                  "description": this.state.mapdescription
               }
            }
         }
      }else if (type === "rooms"){
         return this.props.event.rooms;
      }else if (type === "sponsors"){
         return {
            "sponsorTags":this.state.sponsorTags,
            "sponsors":this.state.sponsors
         };
      }else if (type === "floorplan"){
         return this.props.event.floorPlan;
      }
   };


   save = () => {
      this.setState({
         changed:false,
         saveText:"SAVING...",
      },()=>{
         //console.log(this.props);
         if (this.state.activeTab === "general" || this.state.activeTab === "social" || this.state.activeTab === "contact") {
            //console.log("veriliyor")
            this.props.editEvent(this.props.auth.user.id, this.prepareReturn(this.state.activeTab));
         }else{
            this.props.editTab(this.state.activeTab,this.props.match.params.eventId,this.prepareReturn(this.state.activeTab));
         }
         this.closeSure();
         this.changeTab(this.state.nextTab);
      });
   };

   discardChanges = () => {
      this.resetAll();
      this.setState({sureIsOpen: false,changeTabAfterReset:true});

   };

   floorRemove = (floorId) => {
      this.openFloor(floorId)
   };

   openSure = () => {
      if(this.state.noAsking){
         this.save();
      }else{
         this.setState({sureIsOpen: true});
      }
   };

   closeSure = () => {
      this.setState({sureIsOpen: false, nextTab:this.state.activeTab});
   };

   openReset = () => {
      this.setState({resetIsOpen: true});
   };

   closeReset = () => {
      this.setState({resetIsOpen: false});
   };

   openDelete = () => {
      this.setState({deleteIsOpen: true});
   };

   closeDelete = () => {
      this.setState({deleteIsOpen: false});
   };


   openFloor = (floorId) => {
      this.setState({floorIsOpen: true,removeFloorId:floorId});
   };

   closeFloor = () => {
      this.setState({floorIsOpen: false});
   };

   openNewAlert = () => {
      this.setState({newAlertIsOpen: true});
   };

   closeNew = () => {
      this.setState({newAlertIsOpen: false});
   };

   openSponsor = (sponsorId) => {
      this.setState({sponsorIsOpen: true,removeSponsorId:sponsorId});
   };

   closeSponsor = () => {
      this.setState({sponsorIsOpen: false});
   };

   removeTagFromLocal = (tagId) => {
      let nth = tagId.split("|")[0];
      let filtereds = Object.keys(this.state.sponsors).filter(key => !tagId.includes(key)).reduce((obj, key) => {obj[key] = this.state.sponsors[key];return obj}, {});
      let filtered = Object.keys(this.state.sponsorTags).filter(key => !tagId.includes(key)).reduce((obj, key) => {obj[key] = this.state.sponsorTags[key];return obj}, {});
      let f2 = {};
      let f3 = {};
      Object.keys(filtereds).forEach(function(key) {
         let chk = key.split("|")[0] > nth ? key.split("|")[0]-1 : key.split("|")[0];
         f2[chk+"|"+key.split("|")[1]] = filtereds[key];
      });
      Object.keys(filtered).forEach(function(key) {
         let chk = key.split("|")[0] > nth ? key.split("|")[0]-1 : key.split("|")[0];
         f3[chk+"|"+key.split("|")[1]] = filtered[key];
      });
      this.setState({
         sponsorTags:f3,
         sponsors:f2,
         changed:true
      });
   };

   keyChanger = (o, old_key,new_key) => {
      if (old_key !== new_key) {
         Object.defineProperty(o, new_key,
            Object.getOwnPropertyDescriptor(o, old_key));
         delete o[old_key];
      }
   }

   tagSwapper = (tagId, direction) => {
      console.log(tagId);
      let tags = this.state.sponsorTags;
      let sponsors = this.state.sponsors;
      if(direction==="up"){
         let nth = tagId.split("|")[0];
         if(nth!==0){
            let kyc = this.keyChanger;
            Object.keys(this.state.sponsorTags).forEach(function(key) {
               //yukari gidecek, tiklanan indexin ustundeki id'yi sakla. (temp)
               console.log(nth-1, key.split("|")[0]);
               let chk = Number(key.split("|")[0]) === nth-1 ? key.split("|")[1] : '';
               if(chk){
                  let swapped = nth+"|"+chk;
                  kyc(tags, key, swapped);
                  kyc(tags, tagId, (nth-1)+"|"+tagId.split("|")[1]);
                  kyc(sponsors, key, swapped);
                  kyc(sponsors, tagId, (nth-1)+"|"+tagId.split("|")[1]);
               }
            });
         }
      }else if(direction==="down"){
         let nth = tagId.split("|")[0];
         if(nth!==0){
            let kyc = this.keyChanger;
            Object.keys(this.state.sponsorTags).forEach(function(key) {
               //yukari gidecek, tiklanan indexin ustundeki id'yi sakla. (temp)
               console.log(nth- -1, key.split("|")[0]);
               let chk = Number(key.split("|")[0]) === nth- -1 ? key.split("|")[1] : '';
               if(chk){
                  let swapped = nth+"|"+chk;
                  kyc(tags, key, swapped);
                  kyc(tags, tagId, (nth- -1)+"|"+tagId.split("|")[1]);
                  kyc(sponsors, key, swapped);
                  kyc(sponsors, tagId, (nth- -1)+"|"+tagId.split("|")[1]);
               }
            });
         }
      }
      this.setState({
         sponsorTags:tags,
         sponsors:sponsors,
         changed:true,
      })
   }

   openSponsorTag = (tagId) => {
      if(this.state.sponsors ? this.state.sponsors ? this.state.sponsors[tagId].length>0 : false : false){
         this.setState({sponsorTagIsOpen: true, removeSponsorTagId:tagId});
      }else{
         this.removeTagFromLocal(tagId);
      }
   };


   closeSponsorTag = () => {
      this.setState({sponsorTagIsOpen: false});
   };

   openRoomAlert = (roomId) => {
      this.setState({roomAlertIsOpen: true, alertRoomId:roomId});
   };

   closeRoomAlert = () => {
      this.setState({roomAlertIsOpen: false});
   };

   removeRoom = () => {
      this.setState({changed:true});
      this.props.removeRoomFromLocal(this.state.alertRoomId);
      this.closeRoomAlert();
   };



   openModal = (id,logo,name,tag) => {
      if(!id) {
         this.setState({
            modalId:'',
            modalImage:'',
            modalName:'',
            modalIsNew:true,
            activeSponsorTag:tag,
            modalIsOpen: true
         });
      }else{
         this.setState({
            modalId:id,
            modalImage:logo,
            modalName:name,
            modalIsOpen: true
         });
      }

   };

   modalSave = () => {
      if(this.state.modalName!==""){
         if(this.state.modalIsNew===false){
            if(this.state.activeTab==="sponsors"){

               const ses2 = this.state.sponsors;
               let mState = this.state;
               Object.keys(ses2).filter(key => ses2[key].filter(key2 =>{if(this.state.modalId.includes(key2.id)){ses2[key] = ses2[key].filter(function(el){
                  if(el.id === key2.id){el.name = mState.modalName;el.logo = mState.modalImage;}
                  return true;
               });}return false;}));
               this.setState({
                  sponsors:ses2
               },()=> {
                  console.log("ye",this.state);
               });


            }else if(this.state.activeTab==="floorplan"){
               this.props.editFloorFromLocal(this.state.modalId, this.state.modalName, this.state.modalImage);
               this.setState({
                  nthChange:this.state.nthChange+1,
               })
            }
         }else{
            if(this.state.activeTab==="sponsors"){
               this.addSponsorToLocal(this.state.modalName, this.state.modalImage ,this.state.activeSponsorTag,Math.floor(Math.random()*100000000000000));
               this.setState({
                  nthNewSponsor:this.state.nthNewSponsor+1,
                  modalIsNew:false,
               })
            }else if(this.state.activeTab==="floorplan") {
               this.props.addFloorToLocal(this.state.modalName, this.state.modalImage,this.state.nthNewFloor);
               this.setState({
                  nthNewFloor:this.state.nthNewFloor+1,
                  modalIsNew:false,
               })
            }
         }
         this.closeModal();
         this.forceUpdateHandler();
         this.setState({
            changed:true,
         })
      }else{
         this.setState({
            modalAlert:"Please fill the 'name' input.",
         })
      }
   };

   /*
   afterOpenModal = () => {};
   Bu sekilde cagiriliyor (modal domu icinde) onAfterOpen={this.afterOpenModal}
   a
   */

   closeModal = () => {
      this.setState({modalIsOpen: false});
   };

   somethingChanged(){
      this.setState({changed: true});
   };

   canCreateTag = (tag, which) => {
      if(which==="rooms"){
         return this.props.event && this.props.event.rooms ? this.props.event.rooms.filter(function (el) { return el.label === tag; }).length===0 && tag!=="" : false;
      }if(which==="sponsors"){
         return this.props.event && this.state.sponsorTags ? Object.values(this.state.sponsorTags).filter(function (el) { return el === tag; }).length===0 && tag!=="" : false;
      }else {
         return false;
      }
   };

   addFloor = () => {
      this.openModal();
   };

   goToFloor = () => {
      this.changeTab('floorplan');
   };

   handleKeyPress = (event) => {
      if(event.key === 'Enter'){
         this.modalSave();
      }
   };

   tagNameEdit = (id,name) => {
      let cloneTags = JSON.parse(JSON.stringify(this.state.sponsorTags));
      if(cloneTags[id]!==name){
         if(!Object.values(cloneTags).find((el)=>{return el===name})){
            cloneTags[id]=name;
            this.setState({
               changed:true,
               sponsorTags:cloneTags
            });
            //console.log(id,name);
            return 0;
         }else{
            //console.log("zaten var");
            return 1;
         }
      }else{
         return 0;
      }
   }

   createNewTag = (id, newTagData) =>{
      this.setState({
         sponsorTags:{...this.state.sponsorTags, [id]:newTagData.label},
         sponsors:{...this.state.sponsors,[id]:[]}
      });
   }

   tagNameMove = (id,axis) => {
      this.setState({
         changed:true,
      });
   }

   removeSponsorFromLocal = (sponsorId) => {
      const ses = this.state.sponsors;
      Object.keys(ses).filter(key => ses[key].filter(key2 =>{if(sponsorId.includes(key2.id)){ses[key] = ses[key].filter(function(el){return el.id !== key2.id;});return false;}return false;}));
      this.setState({
         sponsors:ses
      });
   }

   addSponsorToLocal = (sponsorName, sponsorImage, tagId, nthNew) => {
      const ses3 = this.state.sponsors;
      ses3[tagId].push({
         id:'newid'+nthNew,
         logo:sponsorImage,
         name:sponsorName,
      });
      this.setState({
         sponsors:ses3
      });
   };

   render() {
      return (

         <div className="container mtop">

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.newAlertIsOpen}
               contentLabel="Wait!"
               style={{content : {width:500,textAlign:"center",overflow: "hidden"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Wait!</h2>
                     <p>Your event <b>will not be shown</b> on mobile phones, until you give enough information about your event.</p>
                     <p>You must enter at least <b>one floor</b>, <b>one room</b>, <b>one speaker</b> and <b>one talk</b>.</p>
                     <p>Also, you should enter <b>description</b>, <b>logo</b> and <b>date</b> for your event.</p>
                  </div>
               </div>
               <div className="row">
                  <div className="twelve columns">
                     <div className="span">
                        <button onClick={this.closeNew} className={"button-primary"}>ALL RIGHT</button>
                     </div>
                  </div>
               </div>
            </Modal>

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.sureIsOpen}
               onRequestClose={this.closeSure}
               contentLabel="Are you sure?"
               style={{content : {width:500,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Save changes?</h2>
                     <p>You have unsaved changes. Please save them before changing tabs.</p>
                  </div>
               </div>
               <div className="row">
                  <div className="twelve columns">
                     <input type="checkbox" className="customInput" id={"askCheck"} onChange={(e)=>{
                        this.setState({noAsking:e.currentTarget.checked});
                     }}/><label htmlFor="askCheck" id={"askCheckLabel"} style={{letterSpacing:"0px"}}>SAVE WHILE CHANGING TABS &<br />DON'T ASK ME AGAIN FOR THIS SESSION</label>
                     <p></p>
                  </div>
               </div>
               <div className="row">
                  <div className="four columns">
                     <div className="span">
                        <button onClick={this.closeSure}>CANCEL</button>
                     </div>
                  </div>
                  <div className="four columns">
                     <div className="span">
                        <button onClick={this.discardChanges}>DISCARD</button>
                     </div>
                  </div>
                  <div className="four columns">
                     <div className="span">
                        <button onClick={this.save} className={"button-primary"}>SAVE</button>
                     </div>
                  </div>
               </div>
            </Modal>

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.roomAlertIsOpen}
               onRequestClose={this.closeRoomAlert}
               contentLabel="Are you sure?"
               style={{content : {width:400,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Remove Room?</h2>
                     <p>Your Talks will be deattached from this room!<br />(THIS ACTION CANNOT BE UNDONE)</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.closeRoomAlert}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.removeRoom} className={"button-primary"}>REMOVE</button>
                     </div>
                  </div>
               </div>
            </Modal>

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.resetIsOpen}
               onRequestClose={this.closeReset}
               contentLabel="Are you sure?"
               style={{content : {width:400,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Reset Event?</h2>
                     <p>Your event will be restored - if you didn't already saved!<br />(THIS ACTION CANNOT BE UNDONE)</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.closeReset}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.resetAll} className={"button-primary"}>RESET</button>
                     </div>
                  </div>
               </div>
            </Modal>


            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.deleteIsOpen}
               onRequestClose={this.closeDelete}
               contentLabel="Are you sure?"
               style={{content : {width:400,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Delete Event?</h2>
                     <p>Your event will be DELETED PERMANENTLY!<br />(THIS ACTION CANNOT BE UNDONE)</p>
                     <small>For delete this event will all its contents, please enter your event name below.</small>
                     <input className="u-full-width" type="text" id="name" value={this.state.deleteInput} onChange={(e) => {
                        this.setState({
                           deleteInput: e.currentTarget.value,
                           notCorrectEventName: e.currentTarget.value!==this.state.name ? 'You must enter your event name to the field!' : '',
                        });
                     }} />
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.closeDelete}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <a data-tip style={{fontSize: "12px", marginTop: "9px", display: "inline-block"}} onClick={this.deleteEvent}>DELETE</a>
                        <ReactTooltip getContent={() => this.state.notCorrectEventName} place="bottom" type="error" effect="solid"/>
                     </div>
                  </div>
               </div>
            </Modal>

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.floorIsOpen}
               onRequestClose={this.closeFloor}
               contentLabel="Are you sure?"
               style={{content : {width:400,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Remove Floor?</h2>
                     <p>This floor will be deleted with all rooms on it!<br />(THIS ACTION CANNOT BE UNDONE)</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.closeFloor}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <button onClick={()=>{this.setState({changed:true});this.props.removeFloorFromLocal(this.state.removeFloorId);this.closeFloor();}} className={"button-primary"}>REMOVE</button>
                     </div>
                  </div>
               </div>
            </Modal>

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.sponsorIsOpen}
               onRequestClose={this.closeSponsor}
               contentLabel="Are you sure?"
               style={{content : {width:450,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Remove Sponsor?</h2>
                     <p>This sponsor will be deleted!<br />(THIS ACTION CANNOT BE UNDONE)</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.closeSponsor}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <button onClick={()=>{this.setState({changed:true});this.removeSponsorFromLocal(this.state.removeSponsorId);this.closeSponsor();}} className={"button-primary"}>REMOVE</button>
                     </div>
                  </div>
               </div>
            </Modal>

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.sponsorTagIsOpen}
               onRequestClose={this.closeSponsorTag}
               contentLabel="Are you sure?"
               style={{content : {width:400,textAlign:"center"}}}
            >
               <div className="row">
                  <div className="twelve columns">
                     <h2>Remove Tag?</h2>
                     <p>This tag will be deleted with the all sponsors in it!<br />(THIS ACTION CANNOT BE UNDONE)</p>
                  </div>
               </div>
               <div className="row">
                  <div className="six columns">
                     <div className="span">
                        <button onClick={this.closeSponsorTag}>CANCEL</button>
                     </div>
                  </div>
                  <div className="six columns">
                     <div className="span">
                        <button onClick={()=>{this.setState({changed:true});this.removeTagFromLocal(this.state.removeSponsorTagId);this.closeSponsorTag();}} className={"button-primary"}>REMOVE</button>
                     </div>
                  </div>
               </div>
            </Modal>

            <Modal
               className="Modal"
               overlayClassName="Overlay"
               isOpen={this.state.modalIsOpen}
               onRequestClose={this.closeModal}
               contentLabel="Add Image"
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
                     <ImageUpload onLoad={this.onFloorImageLoaded} logo={"http://app.sliconf.com:8090/service/image/get/"+this.state.modalImage}>
                        {this.state.modalImage ?
                           <div className="row">
                              <div className="twelve columns">
                                 <div className="resim" style={{backgroundImage: 'url("http://app.sliconf.com:8090/service/image/get/' + this.state.modalImage + '")'}} width="100%" alt=""/>
                              </div>
                           </div>: ''}

                     </ImageUpload>
                  </div>
                  <div className="six columns">
                     <label htmlFor="modalName">Name</label>
                     <input autoFocus className="u-full-width" type="text" id="modalName" value={this.state.modalName} onKeyPress={this.handleKeyPress} onChange={(e) => this.setState({modalName:e.currentTarget.value})}/>
                     <div className="span" style={{float:"right"}}>
                        <button onClick={this.modalSave} className={"button-primary"}>save</button>
                     </div>
                  </div>
               </div>
            </Modal>
            <div className="row">
               <div className="twelve columns">
                  <Loading row="3" loading={this.state.loading}>
                     <div className="row">
                        <div className="twelve columns">
                           <div className="row">
                              <div className="twelve columns">
                                 {this.props.history.length > 1 ? <button className="backButton" onClick={this.props.history.goBack} /> : ''}
                                 <h2 style={{verticalAlign:"top",display: "inline-block"}}>Edit Event</h2>
                                 <input style={{margin:"10px 30px"}} className={classNames('button-primary',{disabled:!this.state.changed})} type="submit" onClick={()=>{if(this.state.changed){this.save()}}} defaultValue={this.state.saveText}/>
                                 <a className={classNames({hidden:!this.state.changed})} onClick={this.openReset}>Reset</a>
                                 <span className={classNames("text italic",{hidden:this.state.changed || (this.state.saveText!=="SAVED!" && this.state.saveText!=="SAVE")})}>All changes are saved!</span>
                                 <div className="toRight code">
                                    <small className={"eCodeIndicator"}>event code:</small>
                                    {this.props.match.params.eventId}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                  <div className="container u-full-width tabs">
                     <ul className="navbar-list clickable noselect">
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="general"})}
                            onClick={(e) => this.changeTab('general')}><a className="navbar-link">General</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="social"})}
                            onClick={(e) => this.changeTab('social')}><a className="navbar-link">Social</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="contact"})}
                            onClick={(e) => this.changeTab('contact')}><a className="navbar-link">Contact</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="rooms"})}
                            onClick={(e) => this.changeTab('rooms')}><a className="navbar-link">Rooms</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="sponsors"})}
                            onClick={(e) => this.changeTab('sponsors')}><a className="navbar-link">Sponsors</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="floorplan"})}
                            onClick={(e) => this.changeTab('floorplan')}><a className="navbar-link">Floor Plan</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="advanced"})}
                            onClick={(e) => this.changeTab('advanced')}><a className="navbar-link">Advanced</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="speakers"})}
                            onClick={(e) => this.changeTab('speakers')}><a className="navbar-link">Speakers</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="agenda"})}
                            onClick={(e) => this.changeTab('agenda')}><a className="navbar-link">Agenda</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="statics"})}
                            onClick={(e) => this.changeTab('statics')}><a className="navbar-link">Statics</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="comments"})}
                            onClick={(e) => this.changeTab('comments')}><a className="navbar-link">Comments</a></li>
                        <li className={classNames('navbar-item',{'active':this.state.activeTab==="presentation"})}
                            onClick={(e) => this.changeTab('presentation')}><a className="navbar-link">Presentation</a></li>
                     </ul>
                  </div>
                  <div className="tabContainer">
                     <div className={classNames('tab',{'active':this.state.activeTab==="general"})}>
                        <div className="row mtop50">
                           <div className="six columns">
                              <h3>General</h3>
                              <div className="twelve columns">
                                 <input autoFocus className="moving u-full-width" type="text" id="name" value={this.state.name} onChange={(e) => this.setState({name: e.currentTarget.value, changed:true})} />
                                 <label htmlFor="name">Event Name</label>
                              </div>
                              <div className="twelve columns">
                                 <div className="six columns">
                                    <label htmlFor="startdate">Event Starts</label>
                                    <DatePicker
                                       dateFormat="DD MMM YYYY, ddd, HH:mm"
                                       locale={"en"}
                                       showTimeSelect
                                       timeIntervals={60}
                                       className="u-full-width"
                                       minDate={moment()}
                                       maxDate={moment().add(5, "years")}
                                       selected={moment(this.state.startDate)}
                                       selectsStart
                                       startDate={this.state.startDate}
                                       endDate={this.state.endDate}
                                       onChange={this.changeDateValue('startDate')}
                                       popperPlacement="bottom-start"
                                       readOnly={true}
                                    />
                                 </div>
                                 <div className="six columns">
                                    <label htmlFor="enddate">Event Ends</label>
                                    <DatePicker
                                       dateFormat="DD MMM YYYY, ddd, HH:mm"
                                       locale={"en"}
                                       showTimeSelect
                                       timeIntervals={60}
                                       className="u-full-width"
                                       minDate={moment()}
                                       maxDate={moment().add(5, "years")}
                                       selected={moment(this.state.endDate)}
                                       selectsEnd
                                       startDate={this.state.startDate}
                                       endDate={this.state.endDate}
                                       onChange={this.changeDateValue('endDate')}
                                       popperPlacement="bottom-start"
                                       readOnly={true}
                                    />
                                 </div>
                              </div>
                              <div className="twelve columns">
                                 <label htmlFor="desc">Event Description</label>
                                 <textarea style={{height:"150px"}} className="u-full-width" id="desc" value={this.state.description} onChange={(e) => this.setState({description: e.currentTarget.value, changed: true})}/>
                              </div>
                           </div>
                           <div className="six columns mtop50">
                              <div className="row">
                                 <div className="twelve columns">
                                    {this.state.logoPath ?
                                          <ImageUpload onLoad={this.onEventImageLoaded} logo={"http://app.sliconf.com:8090/service/image/get/"+this.state.logoPath}>
                                          <div className="row">
                                                <div className="twelve columns">
                                                   <div className="resim" style={{backgroundImage: 'url("http://app.sliconf.com:8090/service/image/get/' + this.state.logoPath + '")'}} width="100%" alt="" />
                                                </div>
                                             </div>
                                          </ImageUpload>: <ImageUpload onLoad={this.onEventImageLoaded} logo={""}/>
                                    }
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
                                    <input className="moving u-full-width" type="text" id="facebook" value={this.state.facebook} onChange={(e) => this.setState({facebook:e.currentTarget.value, changed:true})}/>
                                    <label htmlFor="facebook">facebook</label>
                                 </div>
                                 <div className="six columns">
                                    <input className="moving u-full-width" type="text" id="instagram" value={this.state.instagram} onChange={(e) => this.setState({instagram:e.currentTarget.value, changed:true})}/>
                                    <label htmlFor="instagram">instagram</label>
                                 </div>
                              </div>
                              <div className="twelve columns">
                                 <div className="six columns">
                                    <input className="moving u-full-width" type="text" id="youtube" value={this.state.youtube} onChange={(e) => this.setState({youtube:e.currentTarget.value, changed:true})}/>
                                    <label htmlFor="youtube">Youtube</label>
                                 </div>
                                 <div className="six columns">
                                    <input className="moving u-full-width" type="text" id="twitter" value={this.state.twitter} onChange={(e) => this.setState({twitter:e.currentTarget.value, changed:true})}/>
                                    <label htmlFor="twitter">twitter</label>
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
                                 <div className="six columns">
                                    <input className="moving u-full-width" type="text" id="website" value={this.state.web} onChange={(e) => this.setState({web:e.currentTarget.value, changed:true})}/>
                                    <label htmlFor="website">Website</label>
                                 </div>
                                 <div className="six columns">
                                    <input className="moving u-full-width" type="text" id="email" value={this.state.email} onChange={(e) => this.setState({email:e.currentTarget.value, changed:true})}/>
                                    <label htmlFor="email">E-MAIL</label>
                                 </div>
                              </div>
                              <div className="twelve columns" style={{marginLeft:0}}>
                                 <div className="six columns">
                                    <label htmlFor="phone">Phone</label>
                                    <ReactTelInput defaultCountry="tr" className="u-full-width" type="text" id="phone" value={this.state.phone} onBlur={(telNumber)=>{
                                       this.setState({
                                          phone:telNumber,
                                          changed:true,
                                       })}}/>
                                 </div>
                                 <div className="six columns">
                                    <label htmlFor="phonea">Alternative Phone</label>
                                    <ReactTelInput defaultCountry="tr" className="u-full-width" type="text" id="phone" value={this.state.phonea} onBlur={(telNumber)=>{
                                       this.setState({
                                          phonea:telNumber,
                                          changed:true,
                                       })}}/>
                                 </div>
                              </div>
                              <div className="twelve columns" style={{marginLeft:0}}>
                                 <div className="twelve columns">
                                    <label htmlFor="lokasyon">Location</label>
                                    <MapWithASearchBox mapdescription={this.state.mapdescription} lat={this.state.lat} lng={this.state.lng} desc={this.state.mapdescription} callback={this.setNewPlace} key={this.state.activeTab} />
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div className={classNames('tab',{'active':this.state.activeTab==="rooms"})}>
                        <div className="row mtop50">
                           <div className="twelve columns">
                              <h3>Rooms</h3>
                              {this.state.floorPlan.length===0 ? <div><h4>To add room for this event, please add floor first.</h4><button onClick={this.goToFloor}>Go To Floor Tab</button></div> : <div>
                                 <RoomCreate floorPlan={this.state.floorPlan} canCreateTag={this.canCreateTag} callback={this.somethingChanged.bind(this)} eventId={this.state.eventId}/>
                                 <div className="row">
                                    <div className="twelve columns rooms" style={{marginLeft:0}}>
                                       {this.props.event ? this.props.event.rooms.map((room)=><RoomTag removeAlert={this.openRoomAlert} key={room.id} room={room} eventId={this.props.event.id}/>) : ''}
                                    </div>
                                 </div>
                              </div>}
                           </div>
                        </div>
                     </div>

                     <div className={classNames('tab',{'active':this.state.activeTab==="sponsors"})}>
                        <div className="row mtop50">
                           <div className="twelve columns">
                              <h3>Sponsors</h3>
                              <SponsorTagCreate sponsorTagLength={this.state.sponsorTags ? Object.keys(this.state.sponsorTags).length : 0} createNewTag={this.createNewTag} eventId={this.state.eventId} canCreateTag={this.canCreateTag} callback={this.somethingChanged.bind(this)}/>
                              <div className="row">
                                 <div className="twelve columns tags" style={{marginLeft:0}}>
                                    {this.state && Object.keys(this.state.sponsorTags).length>0 ? Object.keys(this.state.sponsorTags).sort((a,b)=>{return a.split("|")[0]-b.split("|")[0]}).map((tag)=><SponsorTag remove={(tagId)=>{this.openSponsorTag(tagId)}} key={tag} tag={{"id":tag, "label":this.state.sponsorTags[tag]}} eventId={this.props.event.id}/>) : ''}
                                 </div>
                              </div>

                              <div className="row">
                                 <div className="twelve columns sponsors" style={{marginLeft:0}}>
                                    {this.props.event && Object.keys(this.state.sponsors).length>0  ? Object.keys(this.state.sponsors).sort((a,b)=>{return a.split("|")[0]-b.split("|")[0]}).map((sponsors)=><SponsorList tagSwapper={this.tagSwapper} editCallback={this.tagNameEdit} remove={(sponsorId)=>{this.openSponsor(sponsorId)}} nthChange={this.state.nthChange} modalCallback={this.openModal} key={sponsors} tagId={sponsors} tagName={this.state.sponsorTags[sponsors]} sponsors={this.state.sponsors[sponsors]} eventId={this.props.event.id}/>) : ''}
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
                                    {this.state.floorPlan ? this.state.floorPlan.map((floor)=>
                                       <Floor remove={this.floorRemove} nthChange={this.state.nthChange} callback={this.somethingChanged} modalCallback={this.openModal} key={floor.id} floor={floor} eventId={this.state.id}/>) : ''}
                                    <div className="addSponsor" onClick={this.addFloor}>+</div>
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
                                    <button className="button-red" onClick={()=>{this.openDelete()}}>Delete Event</button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  </Loading>
               </div>
            </div>
         </div>

      );
   }

}

const mapStateToProps = (state) => {
   return {
      fetch: state.event,
      event: state.event.event,
      auth: state.auth,
   }
};


const mapDispatchToProps = (dispatch) => {
   return bindActionCreators({...EventActions,...RoomActions}, dispatch)
};

EditEvent.defaultProps = { id: '' };

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent)