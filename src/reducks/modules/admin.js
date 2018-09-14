const FETCH_USERS = 'admin/FETCH_USERS';
const FETCH_USERS_SUCCESS = 'admin/FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'admin/FETCH_USERS_FAIL';

const FETCH_EVENTS = 'admin/FETCH_EVENTS';
const FETCH_EVENTS_SUCCESS = 'admin/FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAIL = 'admin/FETCH_EVENTS_FAIL';

const FETCH_EVENT_PACKAGES = 'admin/FETCH_EVENT_PACKAGES';
const FETCH_EVENT_PACKAGES_SUCCESS = 'admin/FETCH_EVENT_PACKAGES_SUCCESS';
const FETCH_EVENT_PACKAGES_FAIL = 'admin/FETCH_EVENT_PACKAGES_FAIL';

const FETCH_USER_INFO = 'admin/FETCH_USER_INFO';
const FETCH_USER_INFO_SUCCESS = 'admin/FETCH_USER_INFO_SUCCESS';
const FETCH_USER_INFO_FAIL = 'admin/FETCH_USER_INFO_FAIL';

const CHANGE_EVENT_PACKAGE = 'admin/CHANGE_EVENT_PACKAGE';
const CHANGE_EVENT_PACKAGE_SUCCESS = 'admin/CHANGE_EVENT_PACKAGE_SUCCESS';
const CHANGE_EVENT_PACKAGE_FAIL = 'admin/CHANGE_EVENT_PACKAGE_FAIL';

const initialState = {
    userLoading: false,
    eventLoading: false,
    eventPackagesLoading: false,
    eventChangeStateLoading: false,
    users: [],
    events: [],
    eventPackages: [],
    eventStateResponse: []
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        // -----
        case FETCH_USERS:
            return {
                ...state,
                userLoading: true
            };
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: action.result,
                error: null
            };
        case FETCH_USERS_FAIL:
            return {
                ...state,
                userLoading: false,
                users: [],
                error: action.error
            };
        // -----
        case FETCH_EVENTS:
            return {
                ...state,
                eventLoading: true
            };
        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                eventLoading: false,
                events: action.result,
            };
        case FETCH_EVENTS_FAIL:
            return {
                ...state,
                eventLoading: false,
                events: [],
                error: action.error
            };
            ///
        case FETCH_EVENT_PACKAGES:
            return {
                ...state,
                eventPackagesLoading: true
            };
        case FETCH_EVENT_PACKAGES_SUCCESS:
            return {
                ...state,
                eventPackagesLoading: false,
                eventPackages: action.result.returnObject,
            };
        case FETCH_EVENT_PACKAGES_FAIL:
            return {
                ...state,
                eventPackagesLoading: false,
                eventPackages: [],
                error: action.error
            };
            ///
       case FETCH_USER_INFO:
          return {
             ...state,
             userInfoLoading: true
          };
       case FETCH_USER_INFO_SUCCESS:
          return {
             ...state,
             userInfoLoading: false,
             userInfo: action.result.returnObject,
          };
       case FETCH_USER_INFO_FAIL:
          return {
             ...state,
             userInfoLoading: false,
             userInfo: [],
             error: action.error
          };
            ///
        case CHANGE_EVENT_PACKAGE:
            return {
                ...state,
                eventChangeStateLoading: true
            };
        case CHANGE_EVENT_PACKAGE_SUCCESS:
            return {
                ...state,
                eventChangeStateLoading: false,
                eventStateResponse: action.result.returnObject,
            };
        case CHANGE_EVENT_PACKAGE_FAIL:
            return {
                ...state,
                eventChangeStateLoading: false,
                eventStateResponse: {},
                error: action.error
            };
        default:
            return state;
    }
}

export function getUsersForAdmin() {
    return {
        types: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL],
        promise: (client) => client.get('/admin/list/users')
    }
}

export function getEventsForAdmin() {
    return {
        types: [FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAIL],
        promise: (client) => client.get('/admin/list/events')
    }
}

export function getEventPackagesForAdmin() {
    return {
        types: [FETCH_EVENT_PACKAGES, FETCH_EVENT_PACKAGES_SUCCESS, FETCH_EVENT_PACKAGES_FAIL],
        promise: (client) => client.get('/admin/list/event-states')
    }
}

export function getUserInfoForAdmin(userId) {
   return {
      types: [FETCH_USER_INFO, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAIL],
      promise: (client) => client.get('/admin/users/'+userId)
   }
}

export function changeEventPackage(eventId, stateId) {
    return {
        types: [CHANGE_EVENT_PACKAGE, CHANGE_EVENT_PACKAGE_SUCCESS, CHANGE_EVENT_PACKAGE_FAIL],
        promise: (client) => client.post(`/admin/change/event-state/${eventId}/${stateId}`)
    }
}