import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from '../src/components/navBar/navbar';
import TaskList from '../src/components/tasks/taskList';
import ErrorPage from '../src/components/errorPage/errorPage';
import SignupForm from '../src/components/authentication/signup';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ marginLeft: '300px' }}>
        <Switch>
          <Route exact path="/">
            <TaskList />
          </Route>
          <Route exact path="/signup">
            <SignupForm />
          </Route>
          <Route exact path="/:category">
            <TaskList />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
