//WARNING
//import ApiClient from "../../helpers/ApiClient";

export default function clientMiddleware(client) {
   return ({dispatch, getState}) => {
      return next => action => {
         if (typeof action === 'function') {
            // thunk
            return action(dispatch, getState);
         }

         const {promise,mock, types, ...rest} = action; // eslint-disable-line no-redeclare

         if (mock) {
            const [REQUEST, SUCCESS] = types;
            next({...rest, type: REQUEST})
            setTimeout(()=>{
               next({...rest, result:mock, type: SUCCESS})
            },1000)
            return;
         }

         if (!promise) {
            // normal action
            return next(action);
         }

         // auto loading-success-failure management
         const [REQUEST, SUCCESS, FAILURE] = types;
         next({...rest, type: REQUEST});

          const tokenState = getState();

          if (tokenState && tokenState.auth && tokenState.auth.user && tokenState.auth.user.token) {
              client.token = tokenState.auth.user.token;
          } else {
             client.token = "";
          }

         const actionPromise = promise(client);
         actionPromise.then(
            (result) => next({...rest, result, type: SUCCESS}),
            (error) => next({...rest, error, type: FAILURE})
         ).catch((error) => {
            console.error('MIDDLEWARE ERROR:', error);
            next({...rest, error, type: FAILURE});
         });

         return actionPromise;
      };
   };
}