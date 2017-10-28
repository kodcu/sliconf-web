const ADD_ROOM = 'event/ADD_ROOM';
const ADD_ROOM_SUCCESS = 'event/ADD_ROOM_SUCCESS';
const ADD_ROOM_FAIL = 'event/ADD_ROOM_FAIL';

const REMOVE_ROOM = 'event/REMOVE_ROOM';
const REMOVE_ROOM_SUCCESS = 'event/REMOVE_ROOM_SUCCESS';
const REMOVE_ROOM_FAIL = 'event/REMOVE_ROOM_FAIL';


const initialState = {
   loading: false,
   create: null,
   read: null,
   update: null,
   del: null,
   error: null
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      // add room
      case ADD_ROOM:
         return {
            ...state,
            loading: true
         };
      case ADD_ROOM_SUCCESS:
         return {
            ...state,
            loading: false,
            create: action.result,
            error: null
         };
      case ADD_ROOM_FAIL:
         return {
            ...state,
            loading: false,
            result: null,
            error: action.error
         };
      // remove room
      case REMOVE_ROOM:
         return {
            ...state,
            loading: true
         };
      case REMOVE_ROOM_SUCCESS:
         return {
            ...state,
            loading: false,
            del: action.result,
            error: null
         };
      case REMOVE_ROOM_FAIL:
         return {
            ...state,
            loading: false,
            result: null,
            error: action.error
         };
      default:
         return state;
   }
}

export function addRoom(eventId,room) {
   return {
      types: [ADD_ROOM, ADD_ROOM_SUCCESS, ADD_ROOM_FAIL],
      //mock: {},
      promise: (client) => client.post('events/'+eventId+'/rooms')
   }
}

export function removeRoom(eventId,roomId) {
   return {
      types: [REMOVE_ROOM, REMOVE_ROOM_SUCCESS, REMOVE_ROOM_FAIL],
      //mock: {},
      promise: (client) => client.del('events/'+eventId+'/rooms/'+roomId)
   }
}