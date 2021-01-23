import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import axios from '../src/api/index';

import Navbar from '../src/components/navBar/navbar';
import TaskList from '../src/components/tasks/taskList';
import ErrorPage from '../src/components/errorPage/errorPage';
import SignupForm from '../src/components/authentication/signup';
import LoginForm from '../src/components/authentication/login';

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) setUser(user);
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <main style={{ marginLeft: '150px', marginRight: '150px' }}>
        <Switch>
          <Route exact path="/">
            {user ? <TaskList /> : <Redirect to="/signup" />}
          </Route>
          <Route exact path="/signup">
            {!user ? <SignupForm setUser={setUser} /> : <Redirect to="/" />}
          </Route>

          <Route exact path="/login">
            {!user ? <LoginForm setUser={setUser} /> : <Redirect to="/" />}
          </Route>

          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
