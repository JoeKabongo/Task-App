import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import useStyles from './style';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export function TaskDetail(props) {
  const [age, setAge] = React.useState('');
  const [task, setTask] = React.useState(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const { show, task } = props;
    setTask(task);
    setShow(show);
    console.log(props);
  }, [props]);
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <div className={classes.root}> </div>
      <div className={show ? `${classes.root}` : `${classes.hide}`}>
        <h2> {task && task.name} </h2>
        <TextField
          id="standard-basic"
          label="Add step"
          color="secondary"
          value={task.name}
          fullWidth
          required
        />
        <TextField
          id="standard-basic"
          label="Add step"
          color="secondary"
          value=""
          fullWidth
          required
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Due Date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
        <Button variant="contained" color="secondary" type="submit">
          Add Steps
        </Button>

        <ul>
          <li> Step one</li>
          <li> Step two</li>
          <li> Step three</li>
        </ul>

        <TextField
          id="outlined-multiline-static"
          label="description"
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        />

        <br></br>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.closeDetail()}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.closeDetail()}
        >
          Close
        </Button>
      </div>
    </>
  );
}
