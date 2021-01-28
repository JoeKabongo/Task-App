import React, { useEffect, useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import Navbar from '../src/components/navBar/navbar';
import TaskDisplay from '../src/components/tasks/taskDisplay';
import ErrorPage from '../src/components/errorPage/errorPage';
import SignupForm from '../src/components/authentication/signup';
import LoginForm from '../src/components/authentication/login';
import Profile from '../src/components/profile/profile';
import Alert from '../src/components/alertMessage/alert';

export const AlertMessageContext = createContext();

export default function App(props) {
  const [alertState, setAlertState] = useState({
    messages: [],
    display: false,
    type: '',
  });

  const [user, setUser] = useState();

  useEffect(() => {
    const loggedInUser = JSON.stringify(localStorage.getItem('user'));
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const saveUser = (token, user) => {
    Cookies.set('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const logoutUser = () => {
    Cookies.remove('jwtToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <AlertMessageContext.Provider value={setAlertState}>
        <Router>
          <Navbar user={user} logout={logoutUser} />

          <main style={{ marginLeft: '150px', marginRight: '150px' }}>
            {alertState.display && (
              <Alert
                alerts={alertState.messages}
                type={alertState.type}
                setAlertState={setAlertState}
              />
            )}

            <Switch>
              <Route exact path="/">
                {user ? <TaskDisplay /> : <Redirect to="/signup" />}
              </Route>

              <Route exact path="/me">
                {user ? <Profile /> : <Redirect to="/signup" />}
              </Route>

              <Route exact path="/signup">
                {!user ? (
                  <SignupForm
                    saveUser={saveUser}
                    setAlert={setAlertState}
                    alertDisplayed={alertState.display}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>

              <Route exact path="/login">
                {!user ? (
                  <LoginForm
                    saveUser={saveUser}
                    setAlert={setAlertState}
                    alertDisplayed={alertState.display}
                  />
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
      </AlertMessageContext.Provider>
    </>
  );
}
