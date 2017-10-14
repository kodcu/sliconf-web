import {REHYDRATE} from 'redux-persist/constants';

export default function reducer(state = {}, action = {}) {
   if (action.type === REHYDRATE) {
      return {
         ...state,
         ...action.payload,
         rehydrate: true
      };
   }

   return state;
}
