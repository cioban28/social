import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DefaultLayout from 'components/DefaultLayout';
import NavlessLayout from 'components/NavlessLayout';
import ProtectedRoute from 'components/ProtectedRoute';
/** Pages */
import Home from 'pages/Home';
import Login from 'pages/Login';
import Register from 'pages/SignUp';
import NotFound from 'pages/NotFound';
import Settings from 'pages/Settings';
import Profile from 'pages/Profile';
import ForgotPassword from 'pages/ForgotPassword';
import RecoverPassword from 'pages/RecoverPassword';
import Community from 'pages/Community';
import Explore from 'pages/Explore';
import Search from 'pages/Search';
import Publisher from 'pages/Publisher';

/**
 * render react DOM
 */
const App = () => (
  <Router>
    <Switch>
      <DefaultLayout exact path="/" component={Home} />
      <NavlessLayout exact path="/login" component={Login} />
      <NavlessLayout exact path="/forgot-password" component={ForgotPassword} />
      <NavlessLayout exact path="/recover-password" component={RecoverPassword} />
      <NavlessLayout exact path="/sign-up" component={Register} />
      <ProtectedRoute path="/settings" component={Settings} />
      <DefaultLayout path="/profile/:id" component={Profile} />
      <DefaultLayout path="/community" component={Community} />
      <DefaultLayout exact path="/explore" component={Explore} />
      <DefaultLayout exact path="/search" component={Search} />
      <DefaultLayout path="/publisher/:publisherName" component={Publisher} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default App;
