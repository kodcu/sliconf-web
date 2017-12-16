//import events from "../../mock/events";
//import eventfetch from "../../mock/fetchevent";
//import eventCreated from "../../mock/createevent";

const FETCH_EVENT = 'event/FETCH_EVENT';
const FETCH_EVENT_SUCCESS = 'event/FETCH_EVENT_SUCCESS';
const FETCH_EVENT_FAIL = 'event/FETCH_EVENT_FAIL';

const ADD_SPEAKER = 'event/SAVE_SPEAKER';
const ADD_SPEAKER_SUCCESS = 'event/SAVE_SPEAKER_SUCCESS';
const ADD_SPEAKER_FAIL = 'event/SAVE_SPEAKER_FAIL';

const ADD_EVENT = 'event/ADD_EVENT';
const ADD_EVENT_SUCCESS = 'event/ADD_EVENT_SUCCESS';
const ADD_EVENT_FAIL = 'event/ADD_EVENT_FAIL';

const FETCH_EVENTS = 'event/FETCH_EVENTS';
const FETCH_EVENTS_SUCCESS = 'event/FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAIL = 'event/FETCH_EVENTS_FAIL';

const FETCH_ROOMS = 'event/FETCH_ROOMS';
const FETCH_ROOMS_SUCCESS = 'event/FETCH_ROOMS_SUCCESS';
const FETCH_ROOMS_FAIL = 'event/FETCH_ROOMS_FAIL';

const REMOVE_ROOM_FROM_LOCAL = 'event/REMOVE_ROOM_FROM_LOCAL';
const ADD_ROOM_TO_LOCAL = 'event/ADD_ROOM_TO_LOCAL';

const REMOVE_TAG_FROM_LOCAL = 'event/REMOVE_TAG_FROM_LOCAL';
const ADD_TAG_TO_LOCAL = 'event/ADD_TAG_TO_LOCAL';

const REMOVE_SPONSOR_FROM_LOCAL = 'event/REMOVE_SPONSOR_FROM_LOCAL';
const EDIT_SPONSOR_FROM_LOCAL = 'event/EDIT_SPONSOR_FROM_LOCAL';
const ADD_SPONSOR_TO_LOCAL = 'event/ADD_SPONSOR_TO_LOCAL';

const REMOVE_FLOOR_FROM_LOCAL = 'event/REMOVE_FLOOR_FROM_LOCAL';
const EDIT_FLOOR_FROM_LOCAL = 'event/EDIT_FLOOR_FROM_LOCAL';
const ADD_FLOOR_TO_LOCAL = 'event/ADD_FLOOR_TO_LOCAL';

const EDIT_EVENT = 'event/EDIT_EVENT';
const EDIT_EVENT_SUCCESS = 'event/EDIT_EVENT_SUCCESS';
const EDIT_EVENT_FAIL = 'event/EDIT_EVENT_FAIL';

const DELETE_EVENT = 'event/DELETE_EVENT';
const DELETE_EVENT_SUCCESS = 'event/DELETE_EVENT_SUCCESS';
const DELETE_EVENT_FAIL = 'event/DELETE_EVENT_FAIL';

const EDIT_TAB = 'event/EDIT_TAB';
const EDIT_TAB_SUCCESS = 'event/EDIT_TAB_SUCCESS';
const EDIT_TAB_FAIL = 'event/EDIT_TAB_FAIL';

const initialState = {
   loading: false,
   event: null,
   events: []
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      // event
      case FETCH_EVENT:
         return {
            ...state,
            removed:false,
            loading: true
         };
      case FETCH_EVENT_SUCCESS:
         //console.log(action.result)
         const fillTheBlanks = action.result.returnObject;
         fillTheBlanks.about = fillTheBlanks.about ? fillTheBlanks.about : {};
         fillTheBlanks.rooms = fillTheBlanks.rooms ? fillTheBlanks.rooms : [];
         fillTheBlanks.agenda = fillTheBlanks.agenda ? fillTheBlanks.agenda : [];
         fillTheBlanks.speakers = fillTheBlanks.speakers ? fillTheBlanks.speakers : [];
         fillTheBlanks.floorPlan = fillTheBlanks.floorPlan ? fillTheBlanks.floorPlan : [];
         fillTheBlanks.sponsorTags = fillTheBlanks.sponsorTags ? fillTheBlanks.sponsorTags : {};
         fillTheBlanks.sponsors = fillTheBlanks.sponsors ? fillTheBlanks.sponsors : {};
         return {
            ...state,
            loading: false,
            removed:false,
            event: fillTheBlanks,
            status: action.result.status,
            error: null
         };
      case FETCH_EVENT_FAIL:
         return {
            ...state,
            loading: false,
            event: null,
            error: action.error
         };
      case EDIT_EVENT:
         return {
            ...state,
            loading: true
         };
      case EDIT_EVENT_SUCCESS:
         //console.log(action.result)adsfasdfasdfa
         const fillTheBlanks2 = action.result.returnObject;
         fillTheBlanks2.about = fillTheBlanks2.about ? fillTheBlanks2.about : {};
         fillTheBlanks2.rooms = fillTheBlanks2.rooms ? fillTheBlanks2.rooms : [];
         fillTheBlanks2.agenda = fillTheBlanks2.agenda ? fillTheBlanks2.agenda : [];
         fillTheBlanks2.speakers = fillTheBlanks2.speakers ? fillTheBlanks2.speakers : [];
         fillTheBlanks2.floorPlan = fillTheBlanks2.floorPlan ? fillTheBlanks2.floorPlan : [];
         fillTheBlanks2.sponsorTags = fillTheBlanks2.sponsorTags ? fillTheBlanks2.sponsorTags : {};
         fillTheBlanks2.sponsors = fillTheBlanks2.sponsors ? fillTheBlanks2.sponsors : {};
         return {
            ...state,
            loading: false,
            event: fillTheBlanks2,
            error: null
         };
      case EDIT_EVENT_FAIL:
         return {
            ...state,
            loading: false,
            event: null,
            error: action.error
         };
      case DELETE_EVENT:
         return {
            ...state,
            loading: true
         };
      case DELETE_EVENT_SUCCESS:
         return {
            ...state,
            event: null,
            removed:true,
            error: null
         };
      case DELETE_EVENT_FAIL:
         return {
            ...state,
            loading: false,
            event: null,
            error: action.error
         };
      case EDIT_TAB:
         return {
            ...state,
            loading: true
         };
      case EDIT_TAB_SUCCESS:
         //console.log(state);
         const fillTheBlanks3 = action.result.returnObject;
         console.log("yeni",fillTheBlanks3)
         //console.log(state.event);
         return {
            ...state,
            loading: false,
            event: Object.assign({}, state.event, fillTheBlanks3),
            error: null
         };
      case EDIT_TAB_FAIL:
         return {
            ...state,
            loading: false,
            event: null,
            error: action.error
         };
      // events
      case FETCH_EVENTS:
         return {
            ...state,
            loading: true
         };
      case FETCH_EVENTS_SUCCESS:
         return {
            ...state,
            loading: false,
            active: action.result.returnObject.active,
            passive: action.result.returnObject.passive,
         };
      case FETCH_EVENTS_FAIL:
         return {
            ...state,
            loading: false,
            events: [],
            error: action.error
         };
      // rooms
      case FETCH_ROOMS:
         return {
            ...state,
            loading: true
         };
      case FETCH_ROOMS_SUCCESS:
         return {
            ...state,
            loading: false,
            rooms: action.result.returnObject,
         };
      case FETCH_ROOMS_FAIL:
         return {
            ...state,
            loading: false,
            rooms: [],
            error: action.error
         };
      // add speaker to event
      case ADD_SPEAKER:
         return {
            ...state,
            loading: true
         };
      case ADD_SPEAKER_SUCCESS:
         return {
            ...state,
            loading: false,
            speakerSuccess:true,
            error: null
         };
      case ADD_SPEAKER_FAIL:
         return {
            ...state,
            loading: false,
            error: action.error
         };
      // add event to system
      case ADD_EVENT:
         return {
            ...state,
            loading: true
         };
      case ADD_EVENT_SUCCESS:
         return {
            ...state,
            creation: action.result.returnObject,
            loading: false,
            error: null,
            status:action.result.status,
            message:action.result.message,
         };
      case ADD_EVENT_FAIL:
         return {
            ...state,
            loading: false,
            error: action.error
         };
      case REMOVE_ROOM_FROM_LOCAL:
         return {
            ...state,
            event:{...state.event,rooms:[...state.event.rooms.filter(room=>room.id!==action.roomId)]}
         };
      case ADD_ROOM_TO_LOCAL:
         return {
            ...state,
            event:{...state.event,rooms:[...state.event.rooms,action.room]}
         };
      case REMOVE_TAG_FROM_LOCAL:
         const filtereds = Object.keys(state.event.sponsors).filter(key => !action.tagId.includes(key)).reduce((obj, key) => {obj[key] = state.event.sponsors[key];return obj}, {});
         const filtered = Object.keys(state.event.sponsorTags).filter(key => !action.tagId.includes(key)).reduce((obj, key) => {obj[key] = state.event.sponsorTags[key];return obj}, {});
         return {
            ...state,
            event:{...state.event,sponsorTags:filtered,sponsors:filtereds}
         };
      case ADD_TAG_TO_LOCAL:
         const uniqueTagId = action.tag.id;
         return {
            ...state,
            event:{...state.event,sponsorTags:{...state.event.sponsorTags,[uniqueTagId]:action.tag.label},sponsors:{...state.event.sponsors,[uniqueTagId]:[]}}
         };
      case REMOVE_SPONSOR_FROM_LOCAL:
         const ses = state.event.sponsors;
         Object.keys(ses).filter(key => ses[key].filter(key2 =>{if(action.sponsorId.includes(key2.id)){ses[key] = ses[key].filter(function(el){return el.id !== key2.id;});return false;}return false;}));
         return {
            ...state,
            event:{...state.event,sponsors:ses}
         };
      case EDIT_SPONSOR_FROM_LOCAL:
         const ses2 = state.event.sponsors;
         Object.keys(ses2).filter(key => ses2[key].filter(key2 =>{if(action.sponsorId.includes(key2.id)){ses2[key] = ses2[key].filter(function(el){
            if(el.id === key2.id){el.name = action.name;el.logo = action.logo;}
            return true;
         });}return false;}));
         return {
            ...state,
            event:{...state.event,sponsors:ses2}
         };
      case ADD_SPONSOR_TO_LOCAL:
         const ses3 = state.event.sponsors;
         ses3[action.tagId].push({
            id:'newid'+action.nthNew,
            logo:action.sponsorImage,
            name:action.sponsorName,
         });
         return {
            ...state,
            event:{...state.event,sponsors:ses3}
         };
      case REMOVE_FLOOR_FROM_LOCAL:
         //console.log(action);
         const ses4 = state.event.floorPlan.filter(function(el){return el.id !== action.floorId;});;
         return {
            ...state,
            event:{...state.event,floorPlan:ses4}
         };
      case EDIT_FLOOR_FROM_LOCAL:
         const ses5 = state.event.floorPlan.filter(function(el){
            if(el.id === action.floorId){
               el.name = action.name;
               el.image = action.image;
            }
            return true;
         });
         return {
            ...state,
            event:{...state.event,floorPlan:ses5}
         };
      case ADD_FLOOR_TO_LOCAL:
         const ses6 = state.event.floorPlan;
         ses6.push({
            id:'newid'+action.nthNew,
            image:action.floorImage,
            name:action.floorName,
         });
         return {
            ...state,
            event:{...state.event,floorPlan:ses6}
         };
      default:
         return state;
   }
}

export function fetchEvent(eventId) {
   //console.log(eventId);
   return {
      types: [FETCH_EVENT, FETCH_EVENT_SUCCESS, FETCH_EVENT_FAIL],
      promise: (client) => client.get('/events/get/with-key/'+eventId)
   }
}

export function createEvent(userId, name, date) {
   return {
      types: [ADD_EVENT, ADD_EVENT_SUCCESS, ADD_EVENT_FAIL],
      promise: (client) => client.post('/events/create/'+userId,{
         data: {userId, name, "startDate":date, "endDate":date}
      })
   }
}
/*
export function addSpeaker(eventId,speaker) {
   return {
      types: [ADD_SPEAKER, ADD_SPEAKER_SUCCESS, ADD_SPEAKER_FAIL],
      promise: (client) => client.post('/events/'+eventId,{
         data: speaker
      })
   }
}
*/
export function fetchEvents(userId) {
   return {
      types: [FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAIL],
      promise: (client) => client.get('/events/list/'+userId)
   }
}

export function fetchRooms(eventId) {
   return {
      types: [FETCH_ROOMS, FETCH_ROOMS_SUCCESS, FETCH_ROOMS_FAIL],
      promise: (client) => client.get('/events/rooms/'+eventId)
   }
}

export function removeRoomFromLocal(roomId) {
   return {
      type: REMOVE_ROOM_FROM_LOCAL,
      roomId
   }
}

export function addRoomToLocal(room) {
   return {
      type: ADD_ROOM_TO_LOCAL,
      room
   }
}

export function removeTagFromLocal(tagId) {
   return {
      type: REMOVE_TAG_FROM_LOCAL,
      tagId
   }
}

export function addTagToLocal(tag) {
   return {
      type: ADD_TAG_TO_LOCAL,
      tag
   }
}

/*
export function removeSponsorFromLocal(sponsorId) {
   return {
      type: REMOVE_SPONSOR_FROM_LOCAL,
      sponsorId
   }
}

export function editSponsorFromLocal(sponsorId, name, logo) {
   return {
      type: EDIT_SPONSOR_FROM_LOCAL,
      sponsorId,name,logo
   }
}

export function addSponsorToLocal(sponsorName, sponsorImage, tagId, nthNew) {
   return {
      type: ADD_SPONSOR_TO_LOCAL,
      sponsorName,sponsorImage,tagId,nthNew
   }
}

*/
export function removeFloorFromLocal(floorId) {
   return {
      type: REMOVE_FLOOR_FROM_LOCAL,
      floorId
   }
}

export function editFloorFromLocal(floorId, name, image) {
   return {
      type: EDIT_FLOOR_FROM_LOCAL,
      floorId,name,image
   }
}

export function addFloorToLocal(floorName, floorImage, nthNew) {
   return {
      type: ADD_FLOOR_TO_LOCAL,
      floorName,floorImage,nthNew
   }
}

export function editEvent(userId,eventData) {
   return {
      types: [EDIT_EVENT, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAIL],
      promise: (client) => client.post('/events/create/'+userId,{
         data: eventData
      })
   }
}

export function deleteEvent(eventId,userId) {
   return {
      types: [DELETE_EVENT, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAIL],
      promise: (client) => client.del('/events/delete/'+eventId+"/"+userId)
   }
}

export function editTab(tab,eventKey,eventData) {
   let ne = tab==="sponsors" ? "sponsor" : tab==="rooms" ? "room" : tab==="floorplan" ? "floor" : "no";
   if(ne!=="no"){
      return {
         types: [EDIT_TAB, EDIT_TAB_SUCCESS, EDIT_TAB_FAIL],
         promise: (client) => client.post('/events/'+ne+'/create/'+eventKey,{
            data: eventData
         })
      }
   }
}