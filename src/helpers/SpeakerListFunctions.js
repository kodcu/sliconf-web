import React from 'react';
import IosArrowDown from 'react-ionicons/lib/IosArrowDown'
import IosArrowUp from 'react-ionicons/lib/IosArrowUp'
import IosRemove from 'react-ionicons/lib/IosRemove'

export default class SpeakerListFunctions {
   static changeOrder = (speakers,state,setState,which) => {

      let sortTable = (speakers,what,type) => {
         let cloneTable = speakers ? speakers.slice(0) : [];
         if(type){
            return cloneTable.sort(function(a, b) {
               if(type===1){
                  return a[what].toString().localeCompare(b[what].toString())
               }else if(type===2){
                  return b[what].toString().localeCompare(a[what].toString())
               }else{
                  return 0
               }
            })
         }else{
            return speakers;
         }
      };

      if(which===state.active){
         if(state.mode===1){
            setState({
               mode:2,
               speakers:sortTable(speakers,which, 2),
            });
         }else if(state.mode===2){
            setState({
               mode:0,
               active:"",
               speakers:sortTable(speakers,which, 0),
            });
         }
      }else{
         setState({
            mode:1,
            active:which,
            speakers:sortTable(speakers,which, 1),
         });
      }
   };

   static returnIcons = (state,what) => {
      return state.active===what ? state.mode===1
         ? <IosArrowUp style={{verticalAlign:"top"}} />
         : <IosArrowDown style={{verticalAlign:"top"}} />
         : <IosRemove style={{verticalAlign:"top"}} />
   };
}