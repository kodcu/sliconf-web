const ADD_SPONSOR = 'event/ADD_SPONSOR';
const ADD_SPONSOR_SUCCESS = 'event/ADD_SPONSOR_SUCCESS';
const ADD_SPONSOR_FAIL = 'event/ADD_SPONSOR_FAIL';

const REMOVE_SPONSOR = 'event/REMOVE_SPONSOR';
const REMOVE_SPONSOR_SUCCESS = 'event/REMOVE_SPONSOR_SUCCESS';
const REMOVE_SPONSOR_FAIL = 'event/REMOVE_SPONSOR_FAIL';


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
      // add SPONSOR
      case ADD_SPONSOR:
         return {
            ...state,
            loading: true
         };
      case ADD_SPONSOR_SUCCESS:
         return {
            ...state,
            loading: false,
            create: action.result,
            error: null
         };
      case ADD_SPONSOR_FAIL:
         return {
            ...state,
            loading: false,
            result: null,
            error: action.error
         };
      // remove SPONSOR
      case REMOVE_SPONSOR:
         return {
            ...state,
            loading: true
         };
      case REMOVE_SPONSOR_SUCCESS:
         return {
            ...state,
            loading: false,
            del: action.result,
            error: null
         };
      case REMOVE_SPONSOR_FAIL:
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

export function addSponsor(eventId,sponsor) {
   return {
      types: [ADD_SPONSOR, ADD_SPONSOR_SUCCESS, ADD_SPONSOR_FAIL],
      promise: (client) => client.post('events/'+eventId+'/sponsors')
   }
}

export function removeSponsor(eventId,sponsorId) {
   return {
      types: [REMOVE_SPONSOR, REMOVE_SPONSOR_SUCCESS, REMOVE_SPONSOR_FAIL],
      //mock: {},
      promise: (client) => client.del('events/'+eventId+'/sponsors/'+sponsorId)
   }
}