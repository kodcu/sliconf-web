//import surveysMock from "../../mock/surveys";

const FETCH_SURVEY = 'survey/FETCH_SURVEY';
const FETCH_SURVEY_SUCCESS = 'survey/FETCH_SURVEY_SUCCESS';
const FETCH_SURVEY_FAIL = 'survey/FETCH_SURVEY_FAIL';

const ADD_SURVEY = 'survey/ADD_SURVEY';
const ADD_SURVEY_SUCCESS = 'survey/ADD_SURVEY_SUCCESS';
const ADD_SURVEY_FAIL = 'survey/ADD_SURVEY_FAIL';

const REMOVE_SURVEY = 'survey/REMOVE_SURVEY';
const REMOVE_SURVEY_SUCCESS = 'survey/REMOVE_SURVEY_SUCCESS';
const REMOVE_SURVEY_FAIL = 'survey/REMOVE_SURVEY_FAIL';

const FETCH_SURVEYS = 'survey/ADD_SURVEY';
const FETCH_SURVEYS_SUCCESS = 'survey/FETCH_SURVEYS_SUCCESS';
const FETCH_SURVEYS_FAIL = 'survey/FETCH_SURVEYS_FAIL';

const initialState = {
   loading: false,
   survey: null,
   surveys: [],
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      // -----
      case FETCH_SURVEY:
         return {
            ...state,
            removed:false,
            loading: true
         };
      case FETCH_SURVEY_SUCCESS:
         return {
            ...state,
            loading: false,
            survey: action.result,
            error: null
         };
      case FETCH_SURVEY_FAIL:
         return {
            ...state,
            loading: false,
            survey: null,
            error: action.error
         };
      // -----
      case ADD_SURVEY:
         return {
            ...state,
            type:"add",
            added:false,
            removed:false,
            loading: true
         };
      case ADD_SURVEY_SUCCESS:
         return {
            ...state,
            loading: false,
            surveys: action.result.returnObject,
            added:true,
            error: null
         };
      case ADD_SURVEY_FAIL:
         return {
            ...state,
            loading: false,
            surveys: null,
            added:false,
            error: action.error
         };
      // -----
      case REMOVE_SURVEY:
         return {
            ...state,
            type:"remove",
            removed:false,
            loading: true
         };
      case REMOVE_SURVEY_SUCCESS:
         console.log("saksess");
         return {
            ...state,
            loading: false,
            removed:true,
            error: null
         };
      case REMOVE_SURVEY_FAIL:
         return {
            ...state,
            loading: false,
            removed:false,
            error: action.error
         };
      // -----
      case FETCH_SURVEYS_SUCCESS:
         return {
            ...state,
            type:"fetch",
            loading: false,
            removed:false,
            added:false,
            surveys: action.result.returnObject
         };
      case FETCH_SURVEYS_FAIL:
         return {
            ...state,
            loading: false,
            surveys: [],
            removed:false,
            added:false,
            error: action.error
         };
      default:
         return state;
   }
}

/*
export function fetchSurvey(surveyId) {
   return {
      types: [FETCH_SURVEY, FETCH_SURVEY_SUCCESS, FETCH_SURVEY_FAIL],
      promise: (client) => client.post('/surveys/' + surveyId, {
         mock:surveysMock
      })
   }
}
*/

export function fetchEventSurveys(eventId) {
   return {
      types: [FETCH_SURVEYS, FETCH_SURVEYS_SUCCESS, FETCH_SURVEYS_FAIL],
      promise: (client) => client.get('/events/'+eventId+'/surveys')
   }
}

export function removeEventSurvey(eventId, survey) {
   return {
      types: [REMOVE_SURVEY, REMOVE_SURVEY_SUCCESS, REMOVE_SURVEY_FAIL],
      promise: (client) => client.del('/events/'+eventId+'/surveys/'+survey)
   }
}

export function putEventSurveys(eventId, survey) {
   return {
      types: [ADD_SURVEY, ADD_SURVEY_SUCCESS, ADD_SURVEY_FAIL],
      promise: (client) => client.put('/events/'+eventId+'/surveys', {
         data: survey
      })
   }
}

export function postEventSurveys(eventId, survey) {
   return {
      types: [ADD_SURVEY, ADD_SURVEY_SUCCESS, ADD_SURVEY_FAIL],
      promise: (client) => client.post('/events/'+eventId+'/surveys', {
         data: survey
      })
   }
}