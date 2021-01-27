import React, { useEffect, useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Navbar from '../src/components/navBar/navbar';
import TaskDisplay from '../src/components/tasks/taskDisplay';
import ErrorPage from '../src/components/errorPage/errorPage';
import SignupForm from '../src/components/authentication/signup';
import LoginForm from '../src/components/authentication/login';
import Profile from '../src/components/profile/profile';
import Alert from '../src/components/alertMessage/alert';
import {
  isLoggedIn,
  removeUser,
  saveUser,
} from '../src/components/authentication/userStatus';

export const AlertMessageContext = createContext();

export default function App(props) {
  const [alertState, setAlertState] = useState({
    messages: [],
    display: false,
    type: '',
  });

  const [loginStatus, setLoginStatus] = useState(isLoggedIn);
  const logout = () => {
    removeUser();
    setLoginStatus(false);
  };

  return (
    <>
      <AlertMessageContext.Provider value={setAlertState}>
        <Router>
          <Navbar isLoggedIn={loginStatus} logout={logout} />

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
                {loginStatus ? <TaskDisplay /> : <Redirect to="/signup" />}
              </Route>

              <Route exact path="/me">
                {loginStatus ? <Profile /> : <Redirect to="/signup" />}
              </Route>

              <Route exact path="/signup">
                {!loginStatus ? (
                  <SignupForm
                    saveUser={saveUser}
                    setAlert={setAlertState}
                    alertDisplayed={alertState.display}
                    setLoginStatus={setLoginStatus}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>

              <Route exact path="/login">
                {!loginStatus ? (
                  <LoginForm
                    saveUser={saveUser}
                    setAlert={setAlertState}
                    setLoginStatus={setLoginStatus}
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
