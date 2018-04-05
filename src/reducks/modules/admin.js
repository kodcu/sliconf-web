const FETCH_USERS = 'admin/FETCH_USERS';
const FETCH_USERS_SUCCESS = 'admin/FETCH_USERS_SUCCESS';
const FETCH_USERS_FAIL = 'admin/FETCH_USERS_FAIL';

const FETCH_EVENTS = 'admin/FETCH_EVENTS';
const FETCH_EVENTS_SUCCESS = 'admin/FETCH_EVENTS_SUCCESS';
const FETCH_EVENTS_FAIL = 'admin/FETCH_EVENTS_FAIL';

const initialState = {
    userLoading: false,
    eventLoading: false,
    users: [],
    events: [],
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
        default:
            return state;
    }
}

export function getUsersForAdmin() {
    return {
        types: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL],
        // TODO change url to correct one
        promise: (client) => client.get('/admin/list/users')
    }
}

export function getEventsForAdmin() {
    return {
        types: [FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAIL],
        // TODO change url to correct one
        promise: (client) => client.get('/admin/list/events')
    }
}