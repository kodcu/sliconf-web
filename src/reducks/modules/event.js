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
            loading: true
         };
      case FETCH_EVENT_SUCCESS:
         //console.log(action.result)
         const fillTheBlanks = action.result.returnObject;
         fillTheBlanks.about = fillTheBlanks.about ? fillTheBlanks.about : {};
         fillTheBlanks.rooms = fillTheBlanks.rooms ? fillTheBlanks.rooms : [];
         fillTheBlanks.agenda = fillTheBlanks.agenda ? fillTheBlanks.agenda : [];
         fillTheBlanks.speakers = fillTheBlanks.speakers ? fillTheBlanks.speakers : [];
         fillTheBlanks.floorplan = fillTheBlanks.floorplan ? fillTheBlanks.floorplan : [];
         fillTheBlanks.sponsortags = fillTheBlanks.sponsortags ? fillTheBlanks.sponsortags : {};
         fillTheBlanks.sponsor = fillTheBlanks.sponsor ? fillTheBlanks.sponsor : {};
         return {
            ...state,
            loading: false,
            event: fillTheBlanks,
            error: null
         };
      case FETCH_EVENT_FAIL:
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
         const filtereds = Object.keys(state.event.sponsor).filter(key => !action.tagId.includes(key)).reduce((obj, key) => {obj[key] = state.event.sponsor[key];return obj}, {});
         const filtered = Object.keys(state.event.sponsortags).filter(key => !action.tagId.includes(key)).reduce((obj, key) => {obj[key] = state.event.sponsortags[key];return obj}, {});
         return {
            ...state,
            event:{...state.event,sponsortags:filtered,sponsor:filtereds}
         };
      case ADD_TAG_TO_LOCAL:
         const uniqueTagId = action.tag.id;
         return {
            ...state,
            event:{...state.event,sponsortags:{...state.event.sponsortags,[uniqueTagId]:action.tag.label},sponsor:{...state.event.sponsor,[uniqueTagId]:[]}}
         };
      case REMOVE_SPONSOR_FROM_LOCAL:
         const ses = state.event.sponsor;
         Object.keys(ses).filter(key => ses[key].filter(key2 =>{if(action.sponsorId.includes(key2.id)){ses[key] = ses[key].filter(function(el){return el.id !== key2.id;});return false;}return false;}));
         return {
            ...state,
            event:{...state.event,sponsor:ses}
         };
      case EDIT_SPONSOR_FROM_LOCAL:
         const ses2 = state.event.sponsor;
         Object.keys(ses2).filter(key => ses2[key].filter(key2 =>{if(action.sponsorId.includes(key2.id)){ses2[key] = ses2[key].filter(function(el){
            if(el.id === key2.id){el.name = action.name;el.logo = action.logo;}
            return true;
         });}return false;}));
         return {
            ...state,
            event:{...state.event,sponsor:ses2}
         };
      case ADD_SPONSOR_TO_LOCAL:
         const ses3 = state.event.sponsor;
         ses3[action.tagId].push({
            id:'newid'+action.nthNew,
            logo:action.sponsorImage,
            name:action.sponsorName,
         });
         return {
            ...state,
            event:{...state.event,sponsor:ses3}
         };
      case REMOVE_FLOOR_FROM_LOCAL:
         //console.log(action);
         const ses4 = state.event.floorplan.filter(function(el){return el.id !== action.floorId;});;
         return {
            ...state,
            event:{...state.event,floorplan:ses4}
         };
      case EDIT_FLOOR_FROM_LOCAL:
         const ses5 = state.event.floorplan.filter(function(el){
            if(el.id === action.floorId){
               el.name = action.name;
               el.image = action.image;
            }
            return true;
         });
         return {
            ...state,
            event:{...state.event,floorplan:ses5}
         };
      case ADD_FLOOR_TO_LOCAL:
         const ses6 = state.event.floorplan;
         ses6.push({
            id:'newid'+action.nthNew,
            image:action.floorImage,
            name:action.floorName,
         });
         return {
            ...state,
            event:{...state.event,floorplan:ses6}
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

export function addSpeaker(eventId,speaker) {
   return {
      types: [ADD_SPEAKER, ADD_SPEAKER_SUCCESS, ADD_SPEAKER_FAIL],
      promise: (client) => client.post('/events/'+eventId,{
         data: speaker
      })
   }
}

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

export function addSponsorToLocal(sponsorName, sponsorImage, tagId,nthNew) {
   return {
      type: ADD_SPONSOR_TO_LOCAL,
      sponsorName,sponsorImage,tagId,nthNew
   }
}


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