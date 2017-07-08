export default function clientMiddleware(client) {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        // thunk
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        // normal action
        return next(action);
      }

      // auto loading-success-failure management
      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      const actionPromise = promise(client);
      actionPromise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}