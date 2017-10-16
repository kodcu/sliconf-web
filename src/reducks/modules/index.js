import {combineReducers} from "redux"
//import {routerReducer} from 'react-router-redux'

import rehydrate from "./rehydrate"
import auth from "./auth"
import event from "./event"
import image from "./image"
import speaker from "./speaker"

export default combineReducers({
   //routing : routerReducer,
   rehydrate,
   auth,
   event,
   image,
   speaker
});