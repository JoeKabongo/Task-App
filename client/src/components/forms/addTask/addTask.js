import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

  function handleSubmit(e) {
    e.preventDefault();
    if (textValue) {
      const newTasks = {
        name: textValue,
        isCompleted: false,
        id: new Date().getTime().toString(),
        category: 'x',
      };

      setTasks([newTasks, ...tasks]);
      setTextValue('');
    }
  }

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
