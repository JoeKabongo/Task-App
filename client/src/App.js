import React from 'react';
import Navbar from '../src/components/navBar/navbar';
import Tasks from '../src/components/tasks/tasks';
import ErrorPage from '../src/components/errorPage/errorPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ marginLeft: '300px' }}>
        <Switch>
          <Route exact path="/">
            <Tasks />
          </Route>
          <Route exact path="/:category">
            <Tasks />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
