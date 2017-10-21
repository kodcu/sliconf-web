import loginMock from "../../mock/login";

const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
const RESETPASS = 'auth/REGISTER';
const RESETPASS_SUCCESS = 'auth/REGISTER_SUCCESS';
const RESETPASS_FAIL = 'auth/REGISTER_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const UPDATE = 'auth/LOGOUT';
const UPDATE_SUCCESS = 'auth/LOGOUT_SUCCESS';
const UPDATE_FAIL = 'auth/LOGOUT_FAIL';

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
      case REGISTER:
         return {
            ...state,
            loggingIn: true
         };
      case REGISTER_SUCCESS:
         return {
            ...state,
            loggingIn: false,
            status: action.result.status,
            message: action.result.message,
            user: action.result.returnObject,
         };
      case REGISTER_FAIL:
         return {
            ...state,
            loggingIn: false,
            user: null,
            loginError: action.error
         };
      case RESETPASS:
         return {
            ...state
         };
      case RESETPASS_SUCCESS:
         return {
            ...state
         };
      case RESETPASS_FAIL:
         return {
            ...state
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
            ...state
         };
      case UPDATE_SUCCESS:
         return {
            ...state
         };
      case UPDATE_FAIL:
         return {
            ...state
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

export function login(name, password) {
   return {
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
      promise: (client) => client.post('/users/login', {
         data: {name, password}
      })
   }
}

export function register(email, name, password) {
   return {
      types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
      promise: (client) => client.post('/users/register', {
         data: {email, name, password}
      })
   }
}

export function sendForgotMail(email) {
   return {
      types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
      promise: (client) => client.post('/users/forgot', {
         params: {"token": "auth"},
         data: {email}
      })
   }
}

export function resetPassword(token, password) {
   console.log(token, password)
   return {
      types: [RESETPASS, RESETPASS_SUCCESS, RESETPASS_FAIL],
      promise: (client) => client.post('/users/resetpass', {
         params: {"token": "auth"},
         data: {token, password}
      })
   }
}

export function update(fullname, email, name, password) {
   return {
      types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
      promise: (client) => client.post('/users/update', {
         params: {"token": "auth"},
         data: {fullname, email, name, password}
      })
   }
}

export function logout() {
   return {
      types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
      promise: (client) => client.get('/logout')
   };
}