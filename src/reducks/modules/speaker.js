//import speakers from "../../mock/speakers";
import talks from "../../mock/talks";

const FETCH_SPEAKER = 'speaker/FETCH_SPEAKER';
const FETCH_SPEAKER_SUCCESS = 'speaker/FETCH_SPEAKER_SUCCESS';
const FETCH_SPEAKER_FAIL = 'speaker/FETCH_SPEAKER_FAIL';

const ADD_SPEAKER = 'speaker/ADD_SPEAKER';
const ADD_SPEAKER_SUCCESS = 'speaker/ADD_SPEAKER_SUCCESS';
const ADD_SPEAKER_FAIL = 'speaker/ADD_SPEAKER_FAIL';

const ADD_TALK = 'speaker/ADD_TALK';
const ADD_TALK_SUCCESS = 'speaker/ADD_TALK_SUCCESS';
const ADD_TALK_FAIL = 'speaker/ADD_TALK_FAIL';

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
            added:false,
            loading: true
         };
      case ADD_SPEAKER_SUCCESS:
         return {
            ...state,
            loading: false,
            speakers: action.result.returnObject,
            added:true,
            error: null
         };
      case ADD_SPEAKER_FAIL:
         return {
            ...state,
            loading: false,
            speakers: null,
            added:false,
            error: action.error
         };
      // -----
      case ADD_TALK:
         return {
            ...state,
            loading: true
         };
      case ADD_TALK_SUCCESS:
         console.log("ye");
         console.log(action);
         return {
            ...state,
            loading: false,
            agenda: action.result.returnObject,
            error: null
         };
      case ADD_TALK_FAIL:
         return {
            ...state,
            loading: false,
            agenda: null,
            error: action.error
         };
      // -----
      case FETCH_SPEAKERS:
         return {
            ...state,
            added:false,
            loading: true
         };
      case FETCH_SPEAKERS_SUCCESS:
         return {
            ...state,
            loading: false,
            added:false,
            speakers: action.result.returnObject.speakers
         };
      case FETCH_SPEAKERS_FAIL:
         return {
            ...state,
            loading: false,
            speakers: [],
            added:false,
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
            agenda: action.result.returnObject.agenda
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
         //console.log(action.result.returnObject.agenda)
         return {
            ...state,
            loading: false,
            agenda: action.result.returnObject.agenda,
            speakers: action.result.returnObject.speakers
         };
      case FETCH_TALKS_FAIL:
         return {
            ...state,
            loading: false,
            agenda: [],
            error: action.error
         };
      default:
         return state;
   }
}

export function addSpeaker(eventId, speaker) {
   console.log("yueasasa");
   return {
      types: [ADD_SPEAKER, ADD_SPEAKER_SUCCESS, ADD_SPEAKER_FAIL],
      promise: (client) => client.post('/events/speaker/create/'+eventId, {
         data: speaker
      })
   }
}

export function addTalk(eventId, talk) {
   console.log(JSON.stringify(talk));
   return {
      types: [ADD_TALK, ADD_TALK_SUCCESS, ADD_TALK_FAIL],
      promise: (client) => client.post('/events/agenda/create/'+eventId, {
         data: talk
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
      promise: (client) => client.get('/events/get/with-key/'+eventId)
      //mock: speakers
      //promise: (client) => client.post('/events/'+eventId+'/speakers')
   }
}

export function fetchEventTalks(eventId) {
   return {
      types: [FETCH_TALKS, FETCH_TALKS_SUCCESS, FETCH_TALKS_FAIL],
      promise: (client) => client.get('/events/get/with-key/'+eventId)
      //promise: (client) => client.post('/events/'+eventId+'/speakers')
   }
}
