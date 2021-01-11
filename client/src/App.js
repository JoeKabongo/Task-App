import React from 'react';
import Navbar from '../src/components/navBar/navbar';
import TaskList from '../src/components/tasks/taskList';
import ErrorPage from '../src/components/errorPage/errorPage';
import Login from '../src/components/authentication/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ marginLeft: '300px' }}>
        <Login></Login>
        <Switch>
          <Route exact path="/">
            <TaskList />
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
