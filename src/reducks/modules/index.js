import {combineReducers} from "redux"
//import {routerReducer} from 'react-router-redux'

import auth from "./auth"
import event from "./event"
import speaker from "./speaker"

export default combineReducers({
   //routing : routerReducer,
   auth,
   event,
   speaker
});