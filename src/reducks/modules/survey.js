import surveysMock from "../../mock/surveys";

const FETCH_SURVEY = 'survey/FETCH_SURVEY';
const FETCH_SURVEY_SUCCESS = 'survey/FETCH_SURVEY_SUCCESS';
const FETCH_SURVEY_FAIL = 'survey/FETCH_SURVEY_FAIL';

const ADD_SURVEY = 'survey/ADD_SURVEY';
const ADD_SURVEY_SUCCESS = 'survey/ADD_SURVEY_SUCCESS';
const ADD_SURVEY_FAIL = 'survey/ADD_SURVEY_FAIL';

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
            added:false,
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
      case FETCH_SURVEYS_SUCCESS:
         return {
            ...state,
            loading: false,
            added:false,
            surveys: action.result.returnObject.surveys
         };
      case FETCH_SURVEYS_FAIL:
         return {
            ...state,
            loading: false,
            surveys: [],
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
   console.log("mock",surveysMock.surveys);
   return {
      types: [FETCH_SURVEYS, FETCH_SURVEYS_SUCCESS, FETCH_SURVEYS_FAIL],
      mock:surveysMock.surveys,
      promise: (client) => client.get('/events/'+eventId+'/surveys')
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