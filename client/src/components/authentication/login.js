import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import Cookies from 'js-cookie';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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

export default function LoginForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
    errorMessages: [],
  });

  const handleChange = (prop) => (event) => {
    if (values.errorMessages) {
      setValues({ ...values, [prop]: event.target.value, errorMessages: [] });
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.email && values.password) {
      axios
        .post('/auth/login', {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response);
          Cookies.set('jwtToken', response.data.jwtToken);
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          setValues({ ...values, errorMessages: err.response.data.errors });
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
        {values.errorMessages.map((error) => (
          <Alert severity="error">{error}</Alert>
        ))}

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
