import React from 'react';
import {Route} from 'react-router';
import {App, Login, Home, NotFound} from './containers';
import {isLoaded as isAuthLoaded, load as loadAuth} from './reducks/modules/auth';

export default(store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const {auth: {user}} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  // lütfen pathleri alfabetik sırada tutunuz!
  return (
      <Route path="/" component={App}>

        {/* Üyelere özel pathler */}
        <Route onEnter={requireLogin}>
          <Route path="home" component={Home}/>
        </Route> 

        {/* Routes */}
        <Route path="login" component={Login}/> 

        {/* olmayan bir adrese gidilirse */}
        <Route path="*" component={NotFound} status={404}/>
        
      </Route> 
  );
};