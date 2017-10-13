import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import App from './container/App'
import store from './reducks'

import './stylesheets/skeleton.css'
import './stylesheets/styles.css'
import 'react-datepicker/dist/react-datepicker.css';

ReactDOM.render(
   <Provider store={store}>
      <App/>
   </Provider>,
   document.getElementById('root')
);
