const NEXT_STEP = 'silly/NEXT_STEP';
const CHANGE_BAR = 'silly/CHANGE_BAR';

const initialState = {
   loading: false,
   step:-1,
   tab:"",
   completed:false,
   lastStep:-1,
   showbar:false,
};

export default function reducer(state = initialState, action = {}) {
   switch (action.type) {
      case NEXT_STEP:
         if(state.step!==-2 || action.tab==="userOpen"){
            return {
               ...state,
               step:action.step,
               tab:action.tab,
               completed:action.completed,
               lastStep:action.step!==-2 && action.step!==0 ? action.step : state.lastStep,
            };
         }else if(state.step===-2 && action.step!==-2){
            return {
               ...state,
               step:-2,
               tab:action.tab,
               completed:action.completed,
               lastStep:action.step,
            };
         }
         break;
      case CHANGE_BAR:
            return {
               ...state,
               showbar:action.showbar,
            };
         break;
      default:
         return state;
   }
}


export function changeStep(step, tab="", completed=false) {
   return {
      type: NEXT_STEP,
      step,tab,completed
   }
}
export function changeBar(bool) {
   return {
      type: CHANGE_BAR,
      bool
   }
}
