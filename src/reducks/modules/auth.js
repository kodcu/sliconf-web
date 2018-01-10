const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const REGISTER = 'auth/LOGIN';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/LOGIN_FAIL';
const RESETPASS = 'auth/REGISTER';
const RESETPASS_SUCCESS = 'auth/REGISTER_SUCCESS';
const RESETPASS_FAIL = 'auth/REGISTER_FAIL';
const FORGOTPASS = 'auth/REGISTER';
const FORGOTPASS_SUCCESS = 'auth/REGISTER_SUCCESS';
const FORGOTPASS_FAIL = 'auth/REGISTER_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const UPDATE = 'auth/UPDATE';
const UPDATE_SUCCESS = 'auth/UPDATE_SUCCESS';
const UPDATE_FAIL = 'auth/LOAD_FAIL';
const CHANGEPASS = 'auth/UPDATE';
const CHANGEPASS_SUCCESS = 'auth/CHANGEPASS_SUCCESS';
const CHANGEPASS_FAIL = 'auth/LOAD_FAIL';

const initialState = {
   loaded: false,
   //loggingIn:true,
   //user: {id:'id123',username: 'gox'}
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      case LOAD:
         return {
            ...state,
            message:"",
            loading: true
         };
      case LOAD_SUCCESS:
         return {
            ...state,
            loading: false,
            loaded: true,
            user: action.result
         };
      case LOAD_FAIL:
         return {
            ...state,
            loading: false,
            loaded: false,
            error: action.error
         };
      case LOGIN:
         return {
            ...state,
            message:"",
            loggingIn: true
         };
      case LOGIN_SUCCESS:
         return {
            ...state,
            loggingIn: false,
            status: action.result.status,
            message: action.result.message,
            user: action.result.returnObject
         };
      case LOGIN_FAIL:
         return {
            ...state,
            loggingIn: false,
            user: null,
            loginError: action.error
         };
      case REGISTER_SUCCESS:
         return {
            ...state,
            loggingIn: false,
            status: action.result.status,
            message: action.result.message,
            user: action.result.returnObject,
         };
      case LOGOUT:
         return {
            ...state,
            loggingOut: true
         };
      case LOGOUT_SUCCESS:
         return {
            ...state,
            loggingOut: false,
            user: null
         };
      case LOGOUT_FAIL:
         return {
            ...state,
            loggingOut: false,
            logoutError: action.error
         };
      case UPDATE:
         return {
            ...state,
            loading: true
         };
      case UPDATE_SUCCESS:
         if(action.result.returnObject){
            return {
               ...state,
               loading: false,
               loaded: true,
               user: action.result.returnObject,
               error:null,
               status: action.result.status,
               message: action.result.message
            };
         }else{
            return {
               ...state,
               message:action.result.message,
               status:action.result.status,
               loading: false,
               loaded: true,
               error:true,
            }
         }
      case CHANGEPASS_SUCCESS:
         return {
            ...state,
            loading: false,
            loaded: true,
            user: action.result.returnObject,
            error:null,
            status: action.result.status,
            message: action.result.message
         };
      default:
         return state;
   }
}

export function isLoaded(globalState) {
   return globalState.auth && globalState.auth.loaded;
}


export function load() {
   return {
      types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
      promise: (client) => client.get('/loadAuth')
   };
}

export function login(username, password, captcha) {
   return {
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
      promise: (client) => client.post('/users/login', {
         data: {username, password, captcha}
      })
   }
}

export function register(email, username, password) {
   return {
      types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
      promise: (client) => client.post('/users/register', {
         data: {email, username, password}
      })
   }
}

export function sendForgotMail(email, captcha) {
   return {
      types: [FORGOTPASS, FORGOTPASS_SUCCESS, FORGOTPASS_FAIL],
      promise: (client) => client.post('/users/password-reset/send/'+email, {
         data: {captcha}
      })
   }
}

export function resetPassword(token, pass) {
   //console.log(token, pass)
   return {
      types: [RESETPASS, RESETPASS_SUCCESS, RESETPASS_FAIL],
      promise: (client) => client.post('/users/password-reset/reset/'+token, {
         //TODO passwordleri gercekver
         data: {pass, "repass":pass}
      })
   }
}

export function update(id, username, fullname) {
   return {
      types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
      promise: (client) => client.post('/users/update', {
         data: {id, username, fullname}
      })
   }
}

export function changePassword(id, oldpassword, password) {
   return {
      types: [CHANGEPASS, CHANGEPASS_SUCCESS, CHANGEPASS_FAIL],
      promise: (client) => client.post('/users/update', {
         data: {id, oldpassword, password}
      })
   }
}

export function logout() {
   return {
      types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
      promise: (client) => client.get('/logout')
   };
}