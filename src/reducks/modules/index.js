import {combineReducers} from "redux"
//import {routerReducer} from 'react-router-redux'

import rehydrate from "./reducer"
import auth from "./auth"
import event from "./event"
import speaker from "./speaker"
import room from "./room"
import comment from "./comment"
import silly from "./silly"
import survey from "./survey"
import admin from "./admin"

export default combineReducers({
    //routing : routerReducer,
    rehydrate,
    auth,
    event,
    room,
    speaker,
    comment,
    silly,
    survey,
    admin
});