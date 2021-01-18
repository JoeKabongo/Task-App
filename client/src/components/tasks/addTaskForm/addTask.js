import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from '../../../api/index';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AddTaskForm({ tasks, setTasks }) {
  const [textValue, setTextValue] = useState('');
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // only update tasks if user entered some text
    if (textValue) {
      const newTask = {
        name: textValue,
        isCompleted: false,
      };

      axios
        .post('/tasks/create', newTask)
        .then((res) => {
          setTasks('tasks', [newTask, ...tasks]);
          setTextValue('');
          console.log(res);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
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
        color="secondary"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        fullWidth
        required
      />

      <Button variant="contained" color="secondary" type="submit">
        Add
      </Button>
    </form>
  );
}
