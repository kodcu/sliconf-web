const GETCOMMENTS = 'comment/GETCOMMENTS';
const GETCOMMENTS_SUCCESS = 'comment/GETCOMMENTS_SUCCESS';
const GETCOMMENTS_FAIL = 'comment/GETCOMMENTS_FAIL';

const PUSHCOMMENTS = 'comment/PUSHCOMMENTS';
const PUSHCOMMENTS_SUCCESS = 'comment/PUSHCOMMENTS_SUCCESS';
const PUSHCOMMENTS_FAIL = 'comment/PUSHCOMMENTS_FAIL';

const initialState = {
   DENEME:"DENEME",
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      case GETCOMMENTS:
         return {
            ...state,
            error: false,
            loaded:false,
         };
      case GETCOMMENTS_SUCCESS:

         return {
            ...state,
            error: null,
            loaded: true,
            status: action.result.status,
            message: action.result.message,
            comment: action.result.returnObject,
         };
      case GETCOMMENTS_FAIL:
         return {
            ...state,
            loaded: false,
            error: action.error
         };
      case PUSHCOMMENTS:
         return {
            ...state,
            error: false,
            loaded:false,
         };
      case PUSHCOMMENTS_SUCCESS:
         return {
            ...state,
            error: null,
            loaded: true,
            status: action.result.status,
            message: action.result.message,
            returnObject: action.result.returnObject,
         };
      case PUSHCOMMENTS_FAIL:
         return {
            ...state,
            loaded: false,
            error: action.error
         };
      default:
         return state;
   }
}


export function getComments(eventId, talkId) {
   return {
      types: [GETCOMMENTS, GETCOMMENTS_SUCCESS, GETCOMMENTS_FAIL],
      promise: (client) => client.get('/events/comment/list/approved/'+eventId+'/'+talkId+'?count=20&type=top-rated')
   }
}

export function getPending(eventId) {
   return {
      types: [GETCOMMENTS, GETCOMMENTS_SUCCESS, GETCOMMENTS_FAIL],
      promise: (client) => client.get('/events/comment/list/pending/'+eventId+'?count=20&type=recent')
   }
}

export function pushComments(eventId, userId, approved,denied) {
   return {
      types: [PUSHCOMMENTS, PUSHCOMMENTS_SUCCESS, PUSHCOMMENTS_FAIL],
      promise: (client) => client.post('/events/comment/moderate', {
         data: {eventId, userId, approved, denied}
      })
   }
}