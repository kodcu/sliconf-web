import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // or whatever storage you are using
import rehydrate from "./reducer"
import auth from "./auth"
import event from "./event"
import speaker from "./speaker"
import room from "./room"
import comment from "./comment"
import silly from "./silly"
import survey from "./survey"
import admin from "./admin"

const config = {
    key: 'primary',
    storage
}

export default persistCombineReducers(config, {
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
})