const ADD_TAG = 'event/ADD_TAG';
const ADD_TAG_SUCCESS = 'event/ADD_TAG_SUCCESS';
const ADD_TAG_FAIL = 'event/ADD_TAG_FAIL';

const REMOVE_TAG = 'event/ADD_TAG';
const REMOVE_TAG_SUCCESS = 'event/REMOVE_TAG_SUCCESS';
const REMOVE_TAG_FAIL = 'event/ADD_TAG_FAIL';


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
      // add tag
      case ADD_TAG:
         return {
            ...state,
            loading: true
         };
      case ADD_TAG_SUCCESS:
         return {
            ...state,
            loading: false,
            create: action.result,
            error: null
         };
      case ADD_TAG_FAIL:
         return {
            ...state,
            loading: false,
            result: null,
            error: action.error
         };
      case REMOVE_TAG_SUCCESS:
         return {
            ...state,
            loading: false,
            del: action.result,
            error: null
         };
      default:
         return state;
   }
}

export function addTag(eventId,tag) {
   return {
      types: [ADD_TAG, ADD_TAG_SUCCESS, ADD_TAG_FAIL],
      promise: (client) => client.post('events/'+eventId+'/tags')
   }
}

export function removeTag(eventId,tagId) {
   return {
      types: [REMOVE_TAG, REMOVE_TAG_SUCCESS, REMOVE_TAG_FAIL],
      promise: (client) => client.del('events/'+eventId+'/tags/'+tagId)
   }
}