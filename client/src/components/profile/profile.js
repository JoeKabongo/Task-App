import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import { Button } from '@material-ui/core';

import useStyles from './style';
import axios from '../../api/index';

export default function Profile(props) {
  const { user } = props;
  const classes = useStyles();

  const [state, setState] = useState({
    user: user,
    updateUser: { ...user },
  });

  const handleChange = (name, value) => {
    setState({ ...state, updateUser: { ...state.updateUser, [name]: value } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/auth/update', { ...state.updateUser });
      setState({
        ...state,
        user: {
          username: state.updateUser.username,
          email: state.updateUser.email,
        },
      });
    } catch (error) {
      console.log('something went wrong');
    }
  };

  if (user) {
    return (
      <>
        <h1> Profile</h1>
        <section>
          <p>
            <b> Username</b>: {state.user.username}
          </p>
          <p>
            <b> Email </b>: {state.user.email}
          </p>
        </section>
        <section>
          <h3> Update </h3>

          <form onSubmit={handleSubmit}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">
                Username
              </InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={state.updateUser.username}
                onChange={(e) => handleChange('username', e.target.value)}
                inputProps={{ maxLength: 100 }}
              />
            </FormControl>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Email</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={state.updateUser.email}
                onChange={(e) => handleChange('email', e.target.value)}
                inputProps={{ maxLength: 100 }}
              />
            </FormControl>

            <Button color="primary" variant="contained" type="submit">
              Save
            </Button>
          </form>
        </section>
      </>
    );
  } else {
    return <h1> Nada</h1>;
  }
}
