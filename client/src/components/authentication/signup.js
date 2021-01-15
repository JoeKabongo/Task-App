import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button } from '@material-ui/core';
import LoginWithGoogle from './googleLogin';
import { Link } from 'react-router-dom';
import axios from '../../api/index';
import Cookies from 'js-cookie';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },

  textField: {
    width: '50%',
  },
}));

export default function SignupForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.username && values.email && values.password) {
      axios
        .post('/auth/signup', {
          email: values.email,
          username: values.username,
          password: values.password,
          confirmationPassword: values.password,
        })
        .then((response) => {
          console.log(response);
          Cookies.set('jwtToken', response.data.jwtToken);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section>
      <div style={{ textAlign: 'center' }}>
        <h1> Signup</h1>
      </div>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Username"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          required
          shrink
          onChange={handleChange('username')}
        />

        <TextField
          label="Email"
          id="outlined-start-adornment"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          type="email"
          required
          onChange={handleChange('email')}
          shrink
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
          color="secondary"
          type="submit"
          className={classes.margin}
          style={{ display: 'block' }}
        >
          Signup
        </Button>
        <p>
          Have an account already? <Link to="login"> Login Here</Link>
        </p>
        <LoginWithGoogle />
      </form>
    </section>
  );
}
