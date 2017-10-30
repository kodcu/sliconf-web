import speakers from "../../mock/speakers";
import talks from "../../mock/talks";

const FETCH_SPEAKER = 'speaker/FETCH_SPEAKER';
const FETCH_SPEAKER_SUCCESS = 'speaker/FETCH_SPEAKER_SUCCESS';
const FETCH_SPEAKER_FAIL = 'speaker/FETCH_SPEAKER_FAIL';

const ADD_SPEAKER = 'speaker/ADD_SPEAKER';
const ADD_SPEAKER_SUCCESS = 'speaker/ADD_SPEAKER_SUCCESS';
const ADD_SPEAKER_FAIL = 'speaker/ADD_SPEAKER_FAIL';

const FETCH_SPEAKERS = 'speaker/FETCH_SPEAKERS';
const FETCH_SPEAKERS_SUCCESS = 'speaker/FETCH_SPEAKERS_SUCCESS';
const FETCH_SPEAKERS_FAIL = 'speaker/FETCH_SPEAKERS_FAIL';

const FETCH_TALK = 'speaker/FETCH_TALK';
const FETCH_TALK_SUCCESS = 'speaker/FETCH_TALK_SUCCESS';
const FETCH_TALK_FAIL = 'speaker/FETCH_TALK_FAIL';

const FETCH_TALKS = 'speaker/FETCH_TALKS';
const FETCH_TALKS_SUCCESS = 'speaker/FETCH_TALKS_SUCCESS';
const FETCH_TALKS_FAIL = 'speaker/FETCH_TALKS_FAIL';

const initialState = {
   loading: false,
   speaker: null,
   speakers: [],
   talk: null,
   talks: [],
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
      // -----
      case FETCH_TALK:
         return {
            ...state,
            loading: true
         };
      case FETCH_TALK_SUCCESS:
         return {
            ...state,
            loading: false,
            talk: action.result
         };
      case FETCH_TALK_FAIL:
         return {
            ...state,
            loading: false,
            talk: [],
            error: action.error
         };
      // -----
      case FETCH_TALKS:
         return {
            ...state,
            loading: true
         };
      case FETCH_TALKS_SUCCESS:
         return {
            ...state,
            loading: false,
            talks: action.result
         };
      case FETCH_TALKS_FAIL:
         return {
            ...state,
            loading: false,
            talks: [],
            error: action.error
         };
      default:
         return state;
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

export function fetchSpeaker(speakerId) {
   return {
      types: [FETCH_SPEAKER, FETCH_SPEAKER_SUCCESS, FETCH_SPEAKER_FAIL],
      promise: (client) => client.post('/speakers/' + speakerId)
   }
}

export function fetchTalk(speakerId) {
   return {
      types: [FETCH_TALK, FETCH_TALK_SUCCESS, FETCH_TALK_FAIL],
      promise: (client) => client.post('/speakers/' + speakerId)
   }
}

export function fetchEventSpeakers(eventId) {
   return {
      types: [FETCH_SPEAKERS, FETCH_SPEAKERS_SUCCESS, FETCH_SPEAKERS_FAIL],
      mock: speakers
      //promise: (client) => client.post('/events/'+eventId+'/speakers')
   }
}

export function fetchEventTalks(eventId) {
   return {
      types: [FETCH_TALKS, FETCH_TALKS_SUCCESS, FETCH_TALKS_FAIL],
      mock: talks
      //promise: (client) => client.post('/events/'+eventId+'/speakers')
   }
}
