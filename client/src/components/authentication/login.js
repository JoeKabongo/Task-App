import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button } from '@material-ui/core';
import LoginWithGoogle from './googleLogin';
import { Link } from 'react-router-dom';
import axios from '../../api/index';
import { Redirect } from 'react-router-dom';
import useStyles from './style';

export default function LoginForm(props) {
  const classes = useStyles();
  const { saveUser, setAlert, alertDisplayed, setLoginStatus } = props;
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  // change a state when a textfield is changed
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });

    // remove error message after using restart retyping
    if (alertDisplayed) {
      setAlert({ display: false, messages: [] });
    }
  };

  // toggle showing character password field
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // submitting form
  const handleSubmit = (event) => {
    event.preventDefault();

    // make sure  email and passord are filled
    if (values.email && values.password) {
      axios
        .post('/auth/login', {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          const { jwtToken, user } = response.data;
          saveUser(jwtToken, user);
          setAlert({
            display: true,
            messages: [`You have successfully logged in asn${user.username}`],
            type: 'success',
          });
          setLoginStatus(true);
          // return <Redirect to="/" />;
        })
        .catch((err) => {
          // display error message
          setAlert({
            display: true,
            messages: err.response.data.errors,
            type: 'error',
          });
        });
    } else {
      setAlert({
        display: true,
        messages: ['All fields must be filled'],
        type: 'error',
      });
    }
  };

  return (
    <section>
      <div style={{ textAlign: 'center' }}>
        <h1> Login</h1>
      </div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Email"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          type="email"
          required
          onChange={handleChange('email')}
        />

        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password" required>
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
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
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.margin}
          style={{ display: 'block' }}
        >
          Login
        </Button>

        <p>
          Dont have an account? <Link to="signup"> Signup Here</Link>
        </p>
        <LoginWithGoogle />
      </form>
    </section>
  );
}
