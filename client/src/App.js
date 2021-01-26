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
import Alert from '../src/components/alertMessage/alert';

export const AlertMessageContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertState, setAlertState] = useState({
    messages: [],
    display: false,
    type: '',
  });

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

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser !== null) {
      setUser(user);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <AlertMessageContext.Provider value={setAlertState}>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} logout={logoutUser} />

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
                {isLoggedIn ? <TaskDisplay /> : <Redirect to="/signup" />}
              </Route>
              <Route exact path="/signup">
                {!isLoggedIn ? (
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
                {!isLoggedIn ? (
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
