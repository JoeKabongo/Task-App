import React, { useEffect, useState, createContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import CircularProgress from '@material-ui/core/CircularProgress';

import Navbar from '../src/components/navBar/navbar';
import TaskDisplay from '../src/components/tasks/taskDisplay';
import SignupForm from '../src/components/authentication/signup';
import LoginForm from '../src/components/authentication/login';
import Profile from '../src/components/profile/profile';
import ResetPasswordPage from './components/authentication/resetPassword/resetPassword';
import Alert from '../src/components/alertMessage/alert';

export const AlertMessageContext = createContext();

export default function App() {
  const [state, setState] = useState({
    alert: {
      messages: [],
      display: false,
      type: '',
    },
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setState({ ...state, user: foundUser, isLoading: false });
    } else {
      setState({ ...state, isLoading: false });
    }
  }, []);

  const setAlertState = (options) => {
    setState({ ...state, alert: options });
  };

  const saveUser = (token, newUser) => {
    Cookies.set('jwtToken', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    setState({ ...state, user: newUser, isLoading: false });
  };

  const logoutUser = () => {
    Cookies.remove('jwtToken');
    localStorage.removeItem('user');
    setState({ ...state, user: null });
  };

  if (state.isLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <AlertMessageContext.Provider value={setAlertState}>
        <Router>
          <Navbar user={state.user} logout={logoutUser} />

          <main style={{ marginLeft: '150px', marginRight: '150px' }}>
            {state.alert.display && (
              <Alert
                alerts={state.alert.messages}
                type={state.alert.type}
                setAlertState={setAlertState}
              />
            )}

            <Switch>
              <Route exact path="/">
                {state.user ? <TaskDisplay /> : <Redirect to="signup" />}
              </Route>

              <Route exact path="/me">
                {state.user ? (
                  <Profile user={state.user} />
                ) : (
                  <Redirect to="signup" />
                )}
              </Route>

              <Route exact path="/signup">
                {!state.user ? (
                  <SignupForm
                    saveUser={saveUser}
                    setAlert={setAlertState}
                    alertDisplayed={state.alert.display}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>

              <Route exact path="/login">
                {!state.user ? (
                  <LoginForm
                    saveUser={saveUser}
                    setAlert={setAlertState}
                    alertDisplayed={state.alert.display}
                  />
                ) : (
                  <Redirect to="/" />
                )}
              </Route>

              <Route exact path="/resetpassword">
                {!state.user ? <ResetPasswordPage /> : <Redirect to="/" />}
              </Route>

              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </main>
        </Router>
      </AlertMessageContext.Provider>
    </>
  );
}
