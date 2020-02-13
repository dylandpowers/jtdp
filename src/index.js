import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase/firebase';
import * as serviceWorker from './serviceWorker';

import LoginPage from './containers/LoginPage';
import SlideshowPage from './containers/SlideshowPage';
import ProtectedRoute from './routes/ProtectedRoute';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute exact path="/iloveyou" component={SlideshowPage} />
      </Switch>
    </BrowserRouter>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
