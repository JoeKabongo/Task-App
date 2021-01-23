import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from '../src/components/navBar/navbar';
import TaskList from '../src/components/tasks/taskList';
import ErrorPage from '../src/components/errorPage/errorPage';
import SignupForm from '../src/components/authentication/signup';
import LoginForm from '../src/components/authentication/login';

export default function App() {
  const [user, setUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const logoutUser = () => {
    Cookies.remove('jwtToken');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  const saveUser = (token, user) => {
    Cookies.set('jwtToken', token);
    localStorage.setItem('user', user);
    setIsLoggedIn(true);
  };

  React.useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser !== null) {
      setUser(user);
      setIsLoggedIn(true);
    }
    console.log(loggedInUser !== null);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={logoutUser} />
      <main style={{ marginLeft: '150px', marginRight: '150px' }}>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <TaskList /> : <Redirect to="/signup" />}
          </Route>
          <Route exact path="/signup">
            {!isLoggedIn ? (
              <SignupForm saveUser={saveUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route exact path="/login">
            {!isLoggedIn ? (
              <LoginForm saveUser={saveUser} />
            ) : (
              <Redirect to="/" />
            )}
          </Route>

          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}
