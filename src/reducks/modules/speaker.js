import speakers from "../../mock/speakers";

const FETCH_SPEAKER = 'speaker/FETCH_SPEAKER';
const FETCH_SPEAKER_SUCCESS = 'speaker/FETCH_SPEAKER_SUCCESS';
const FETCH_SPEAKER_FAIL = 'speaker/FETCH_SPEAKER_FAIL';

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
      // event
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
      // events
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
      promise: (client) => client.post('http://localhost:8080/service/speakers/'+speakerId)
   }
}

export function fetchEventSpeakers(eventId) {
   return {
      types: [FETCH_SPEAKERS, FETCH_SPEAKERS_SUCCESS, FETCH_SPEAKERS_FAIL],
      mock: speakers
      //promise: (client) => client.post('http://localhost:8080/service/events/'+eventId+'/speakers')
   }
}
