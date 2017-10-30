import events from "../../mock/events";
import eventfetch from "../../mock/fetchevent";
import eventCreated from "../../mock/createevent";

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
         console.log("ye")
         console.log(action.result)
         return {
            ...state,
            loading: false,
            event: action.result.event,
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
      default:
         return state;
   }
}

export function fetchEvent(eventId) {
   return {
      types: [FETCH_EVENT, FETCH_EVENT_SUCCESS, FETCH_EVENT_FAIL],
      mock: eventfetch,
      promise: (client) => client.post('/events/get/with-key/'+eventId)
   }
}

export function createEvent(userId, name, date) {
   return {
      types: [ADD_EVENT, ADD_EVENT_SUCCESS, ADD_EVENT_FAIL],
      promise: (client) => client.post('/events/create/'+userId,{
         data: {userId, name, "startDate":date, "enderrorDate":date}
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