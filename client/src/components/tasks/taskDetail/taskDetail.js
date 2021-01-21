import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from '../../../api/index';

import useStyles from './style';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export function TaskDetail(props) {
  const classes = useStyles();

  const [age, setAge] = React.useState('');
  const [task, setTask] = React.useState({
    name: '',
    isCompleted: false,
    dueDate: new Date(),
    description: ' ',
  });
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (props.task) setTask(props.task);
    setShow(props.show);
  }, [props]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleTaskChange = (name, value) => {
    console.log(name, value);
    const newTask = { ...task, [name]: value };
    setTask(newTask);
  };

  const saveTask = async (e) => {
    e.preventDefault();
    await axios.put(`/tasks/update/${task._id}`, { ...task });
    const newTasks = props.allTasks.map((element) =>
      element._id === task._id ? task : element
    );
    props.setTasks('tasks', newTasks);
  };

  return (
    <>
      <div className={show ? `${classes.cover}` : `${classes.hide}`}> </div>
      <div className={show ? `${classes.root}` : `${classes.hide}`}>
        <div className={classes.container}>
          <h2 className={classes.margin}> {task && task.name} </h2>
          <form onSubmit={saveTask}>
            <FormControl fullWidth className={classes.margin} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">Name</InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={task.name}
                onChange={(e) => handleTaskChange('name', e.target.value)}
                inputProps={{ maxLength: 100 }}
              />
            </FormControl>
            <MuiPickersUtilsProvider
              utils={DateFnsUtils}
              fullWidth
              variant="filled"
            >
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Due Date"
                value={task.dueDate}
                onChange={(e) => handleTaskChange('dueDate', e)}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
                className={classes.margin}
              />
            </MuiPickersUtilsProvider>

            <FormControlLabel
              control={
                <Checkbox
                  checked={task.isCompleted}
                  name="checkedB"
                  color="secondary"
                  onChange={(e) =>
                    handleTaskChange('isCompleted', e.target.checked)
                  }
                />
              }
              label="Mark complete"
              className={classes.margin}
            />

            <FormControl variant="filled" className={classes.margin} fullWidth>
              <InputLabel id="demo-simple-select-filled-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={age}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <TextField
              className={classes.margin}
              id="filled-multiline-static"
              label="Description"
              value={task.description}
              multiline
              rows={4}
              variant="filled"
              fullWidth
              onChange={(e) => handleTaskChange('description', e.target.value)}
            />

            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => props.closeDetail()}
                className={classes.margin}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                className={classes.margin}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
