import {REHYDRATE} from 'redux-persist';

export default function reducer(state = {}, action = {}) {
   if (action.type === REHYDRATE) {
      return {
         ...state,
         loaded: true
      };
   }
   return state;
}
