import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from '../../../api/index';
import { AlertMessageContext } from '../../../app';
import {
  displaySuccessMessages,
  displayErrorMessages,
} from '../../../utils/alertMessage';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //   },
  // },
}));

export default function AddTaskForm({ tasks, setState, category }) {
  const setAlertState = useContext(AlertMessageContext);
  const [textValue, setTextValue] = useState('');
  const classes = useStyles();

  const [task, setTask] = React.useState({
    name: '',
    isCompleted: false,
    dueDate: new Date(),
    description: ' ',
    category: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // only update tasks if user entered some text
    if (textValue) {
      console.log('here');
      const newTask = {
        name: textValue,
        isCompleted: false,
        category: category === 'None' ? null : category._id,
      };

      try {
        const response = await axios.post('/tasks/create', newTask);
        setState('tasks', [response.data, ...tasks]);
        setTextValue('');
        displaySuccessMessages(
          [`${textValue} was  successfully added to your task`],
          setAlertState
        );
      } catch (error) {
        displayErrorMessages(error, setAlertState);
      }
    }
  };

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="standard-basic"
        label="Task name"
        color="primary"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        fullWidth
        required
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        Add
      </Button>
    </form>
  );
}
