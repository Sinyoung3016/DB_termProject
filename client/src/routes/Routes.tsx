import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import AdminPage from 'pages/AdminPage';
import LoginPage from 'pages/LoginPage';
import UserPage from 'pages/UserPage';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/user" component={UserPage} />
        <Route exact path="/admin" component={AdminPage} />
        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
};

export default Routes;