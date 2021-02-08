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
import useStyles from '../style';
import FilledInput from '@material-ui/core/FilledInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

export default function ResetPassword(props) {
  const [name, setName] = React.useState('Composed TextField');

  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const classes = useStyles();
  console.log(classes);
  // change a state when a textfield is changed
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
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
      <form>
        <div className={classes.formContainer}>
          <TextField
            label="Email"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            type="email"
            required
            //   onChange={handleChange('email')}
          />
          <Button color="primary" variant="contained">
            Next
          </Button>
        </div>

        <div className={classes.hide}>
          <TextField
            label="Enter code you just received with the email provided"
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            type="email"
            required
            FormHelperText="whatever agaahaha"
            disabled={true}
          />

          <Button color="primary" variant="contained">
            Next
          </Button>
        </div>

        <div className={classes.hide}>
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
          <Button color="primary" variant="contained">
            Login
          </Button>
        </div>
      </form>
    </section>
  );
}
