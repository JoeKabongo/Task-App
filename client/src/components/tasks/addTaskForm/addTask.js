import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from '../../../api/index';
import { AlertMessageContext } from '../../../app';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   '& > *': {
  //     margin: theme.spacing(1),
  //   },
  // },
}));

export default function AddTaskForm({ tasks, setTasks }) {
  const setAlertMessage = useContext(AlertMessageContext);
  const [textValue, setTextValue] = useState('');
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // only update tasks if user entered some text
    if (textValue) {
      console.log('here');
      const newTask = {
        name: textValue,
        isCompleted: false,
      };

      axios
        .post('/tasks/create', newTask)
        .then((res) => {
          setTasks('tasks', [res.data, ...tasks]);
          setTextValue('');
          setAlertMessage({
            display: true,
            type: 'success',
            messages: [`${textValue} was  successfully added to your task`],
          });
        })
        .catch((_) => {
          setAlertMessage({
            display: true,
            type: 'error',
            messages: ['Could not add task, something went wrong!'],
          });
        });
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
        label="Add Task"
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
