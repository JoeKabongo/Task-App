import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from '../../../api/index';
import useStyles from './style';
import { Redirect } from 'react-router-dom';

export default function ResetPassword() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    email: '',
    resetCode: '',
    password: '',
    showPassword: false,
    stage: 0, // 0: Enter email, 1: verify password, 2: enter new password
    redirect: false,
  });

  // change a state when a textfield is changed
  const handleChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  // user submit their email
  const submitEmail = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/auth/resetcode/create', {
        email: state.email,
      });
      setState({ ...state, stage: 1 });
    } catch (error) {
      console.log('Something went wrong');
    }
  };

  // user submit  passcode
  const submitPassCode = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/auth/resetcode/verify', {
        email: state.email,
        code: state.resetCode,
      });
      setState({ ...state, stage: 2 });
    } catch (error) {
      console.log(error.response);
    }
  };

  // user update their password
  const submitNewPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/auth/resetpassword', {
        email: state.email,
        password: state.password,
      });
      setState({ ...state, redirect: true });
    } catch (error) {
      console.log(error.response);
    }
  };

  // toggle showing character password field
  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // user have reset their password
  if (state.redirect) {
    return <Redirect to="login" />;
  }
  return (
    <section>
      <h1> Reset Password</h1>

      <div>
        <form onSubmit={submitEmail}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            required
            className={clsx(classes.margin, classes.textField)}
            value={state.email}
            onChange={handleChange('email')}
            disabled={state.stage !== 0}
          />
          <Button
            color="primary"
            variant="contained"
            className={
              state.stage === 0 ? `${classes.margin}` : `${classes.hide}`
            }
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>

      <div
        className={state.stage >= 1 ? `${classes.margin}` : `${classes.hide}`}
      >
        <form onSubmit={submitPassCode}>
          <TextField
            label="Enter code you just received with the email provided"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            type="text"
            required
            FormHelperText="whatever agaahaha"
            disabled={state.stage !== 1}
            value={state.resetcode}
            onChange={handleChange('resetCode')}
          />

          <Button
            color="primary"
            variant="contained"
            className={
              state.stage === 1 ? `${classes.margin}` : `${classes.hide}`
            }
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>

      <div
        className={state.stage === 2 ? `${classes.margin}` : `${classes.hide}`}
      >
        <form onSubmit={submitNewPassword}>
          <FormControl
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password" required>
              New Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={state.showPassword ? 'text' : 'password'}
              value={state.password}
              onChange={handleChange('password')}
              required
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={120}
            />
          </FormControl>
          <Button
            color="primary"
            variant="contained"
            style={{ display: 'block' }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    </section>
  );
}
