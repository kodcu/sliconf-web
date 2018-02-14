const GETCOMMENTS = 'comment/GETCOMMENTS';
const GETCOMMENTS_SUCCESS = 'comment/GETCOMMENTS_SUCCESS';
const GETCOMMENTS_FAIL = 'comment/GETCOMMENTS_FAIL';

const PUSHCOMMENTS = 'comment/GETCOMMENTS';
const PUSHCOMMENTS_SUCCESS = 'comment/PUSHCOMMENTS_SUCCESS';
const PUSHCOMMENTS_FAIL = 'comment/GETCOMMENTS_FAIL';

const initialState = {
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
            commentType: action.result.commentType
         };
      case GETCOMMENTS_FAIL:
         return {
            ...state,
            loaded: false,
            error: action.error
         };
      case PUSHCOMMENTS_SUCCESS:
         return {
            ...state,
            error: null,
            loaded: true,
            status: action.result.status,
            message: action.result.message,
            returnObject: action.result.returnObject,
            pushCommentStatus: action.result.status
         };
      default:
         return state;
   }
}


export function getComments(listType, type, limit, eventId, talkId, clientType = '') {
   if(talkId){eventId = eventId+'/'+talkId;}
   return {
      types: [GETCOMMENTS, GETCOMMENTS_SUCCESS, GETCOMMENTS_FAIL],
      promise: (client) => client.get('/events/comment/list/'+type+'/'+eventId+'?count='+limit+'&type='+listType+'&clientType='+clientType)
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