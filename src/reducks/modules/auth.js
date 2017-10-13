const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';
const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';
const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';
const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';
const UPDATE = 'auth/LOGOUT';
const UPDATE_SUCCESS = 'auth/LOGOUT_SUCCESS';
const UPDATE_FAIL = 'auth/LOGOUT_FAIL';

const initialState = {
   loaded: false,
   //loggingIn:true,
   user: {id:'id123',username: 'gox'}
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
             user: action.result.returnObject.name,
             returnObject: action.result.returnObject,
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
               user: action.result.returnObject.name,
               returnObject: action.result.returnObject,
           };
       case REGISTER_FAIL:
           return {
               ...state,
               loggingIn: false,
               user: null,
               loginError: action.error
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
               loggingOut: true
           };
       case UPDATE_SUCCESS:
           return {
               ...state,
               loggingOut: false,
               user: null
           };
       case UPDATE_FAIL:
           return {
               ...state,
               loggingOut: false,
               logoutError: action.error
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
      promise: (client) => client.post('http://localhost:8080/service/users/login', {
         params: {"token":"auth"},
         data: {name, password}
      })
   }
}

export function register(email,name, password) {
    return {
        types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
        promise: (client) => client.post('http://localhost:8080/service/users/register', {
            params: {"token":"auth"},
            data: {email, name, password}
        })
    }
}

export function update(email,name, password, passwordAgain) {
    return {
        types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
        promise: (client) => client.post('http://localhost:8080/service/users/update', {
            params: {"token":"auth"},
            data: {email, name, password, passwordAgain}
        })
    }
}

export function logout() {
   return {
      types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
      promise: (client) => client.get('/logout')
   };
}