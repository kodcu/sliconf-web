import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch} from 'react-router-dom'
import {Register,Login,Home,NotFound} from './containers'
import EventPage from './containers/EventPage';
import EventSuccess from './containers/EventSuccess';
import store, { history } from './reducks'
import { ThemeProvider } from 'styled-components'
import Theme from './theme'

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={Theme}>
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route exact path="/event" component={ EventPage } />
          <Route exact path="/event-success" component={ EventSuccess } />
          <Route path="/" component={Home}/>

        </Switch>
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
