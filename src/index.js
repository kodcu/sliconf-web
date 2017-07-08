import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch} from 'react-router-dom'
import store, { history } from './reducks'
import {App,Login,Register} from './containers';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/" component={App}/>
        </Switch>
    </ConnectedRouter>
  </Provider>, 
  document.getElementById('root')
);
