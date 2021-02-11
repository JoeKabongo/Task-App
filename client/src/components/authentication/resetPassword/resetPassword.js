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
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import useStyles from './style';

export default function ResetPassword(props) {
  const [name, setName] = React.useState('Composed TextField');

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
    stage: 0,
  });

  const classes = useStyles();

  // change a state when a textfield is changed
  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      [name]: event.target.value,
    });
  };

  const submitEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/resetPassword', {
        email: values.email,
      });
      console.log(response);
      setValues({ ...values, stage: 1 });
    } catch (error) {
      console.log('Something went wrong');
    }
  };

  const submitCode = (e) => {
    e.preventDefault();

    setValues({ ...values, stage: 2 });
  };

  // toggle showing character password field
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
            value={values.email}
            onChange={handleChange('email')}
            disabled={values.stage !== 0}
          />
          <Button
            color="primary"
            variant="contained"
            className={
              values.stage === 0 ? `${classes.margin}` : `${classes.hide}`
            }
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>

      <div
        className={values.stage >= 1 ? `${classes.margin}` : `${classes.hide}`}
      >
        <form onSubmit={submitCode}>
          <TextField
            label="Enter code you just received with the email provided"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            type="text"
            required
            FormHelperText="whatever agaahaha"
            disabled={values.stage !== 1}
          />

          <Button
            color="primary"
            variant="contained"
            className={
              values.stage === 1 ? `${classes.margin}` : `${classes.hide}`
            }
            type="submit"
          >
            Next
          </Button>
        </form>
      </div>

      <div
        className={values.stage === 2 ? `${classes.margin}` : `${classes.hide}`}
      >
        <FormControl
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
        >
          <InputLabel htmlFor="outlined-adornment-password" required>
            New Password
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
            labelWidth={120}
          />
        </FormControl>
        <Button
          color="primary"
          variant="contained"
          style={{ display: 'block' }}
        >
          Login
        </Button>
      </div>
    </section>
  );
}
