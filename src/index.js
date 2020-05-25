import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

import Explore from './components/Explore/Explore.js'
import Details from './components/Details/Details.js'

ReactDOM.render(
  <React.StrictMode>
    <Router>
          <Switch>
              <Route exact path='/' component={ Explore } />
              <Route path='/:code' component={ Details } />
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
