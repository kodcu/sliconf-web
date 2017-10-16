import speakers from "../../mock/speakers";

const FETCH_SPEAKER = 'speaker/FETCH_SPEAKER';
const FETCH_SPEAKER_SUCCESS = 'speaker/FETCH_SPEAKER_SUCCESS';
const FETCH_SPEAKER_FAIL = 'speaker/FETCH_SPEAKER_FAIL';

const ADD_SPEAKER = 'speaker/ADD_SPEAKER';
const ADD_SPEAKER_SUCCESS = 'speaker/ADD_SPEAKER_SUCCESS';
const ADD_SPEAKER_FAIL = 'speaker/ADD_SPEAKER_FAIL';

const FETCH_SPEAKERS = 'speaker/FETCH_SPEAKERS';
const FETCH_SPEAKERS_SUCCESS = 'speaker/FETCH_SPEAKERS_SUCCESS';
const FETCH_SPEAKERS_FAIL = 'speaker/FETCH_SPEAKERS_FAIL';

const initialState = {
   loading: false,
   speaker: null,
   speakers: []
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      // -----
      case FETCH_SPEAKER:
         return {
            ...state,
            loading: true
         };
      case FETCH_SPEAKER_SUCCESS:
         return {
            ...state,
            loading: false,
            speaker: action.result,
            error: null
         };
      case FETCH_SPEAKER_FAIL:
         return {
            ...state,
            loading: false,
            speaker: null,
            error: action.error
         };
      // -----
      case ADD_SPEAKER:
         return {
            ...state,
            loading: true
         };
      case ADD_SPEAKER_SUCCESS:
         return {
            ...state,
            loading: false,
            speaker: action.result,
            error: null
         };
      case ADD_SPEAKER_FAIL:
         return {
            ...state,
            loading: false,
            speaker: null,
            error: action.error
         };
      // -----
      case FETCH_SPEAKERS:
         return {
            ...state,
            loading: true
         };
      case FETCH_SPEAKERS_SUCCESS:
         return {
            ...state,
            loading: false,
            speakers: action.result
         };
      case FETCH_SPEAKERS_FAIL:
         return {
            ...state,
            loading: false,
            speakers: [],
            error: action.error
         };
      default:
         return state;
   }
}

export function fetchSpeaker(speakerId) {
   return {
      types: [FETCH_SPEAKER, FETCH_SPEAKER_SUCCESS, FETCH_SPEAKER_FAIL],
      promise: (client) => client.post('/speakers/' + speakerId)
   }
}

export function addSpeaker(eventId, speaker) {
   return {
      types: [ADD_SPEAKER, ADD_SPEAKER_SUCCESS, ADD_SPEAKER_FAIL],
      promise: (client) => client.post('/speakers', {
         data: {eventId, speaker}
      })
   }
}

export function fetchEventSpeakers(eventId) {
   return {
      types: [FETCH_SPEAKERS, FETCH_SPEAKERS_SUCCESS, FETCH_SPEAKERS_FAIL],
      mock: speakers
      //promise: (client) => client.post('/events/'+eventId+'/speakers')
   }
}
