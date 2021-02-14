import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SortTaskOption(props) {
  const classes = useStyles();
  const [options, setOptions] = useState([
    'Due Date',
    'Added Date',
    'Alphabetically',
  ]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(props.tasks);
  }, [props]);
  const [currentOption, setCurrentOption] = useState('Due Date');

  // update the category selection
  const handleChange = (event) => {
    const value = event.target.value;
    setCurrentOption(value);

    const newTasks = tasks.sort((a, b) => (a.name > b.name ? 1 : -1));

    props.updateState('tasks', newTasks);
  };

  const sort;

  return (
    <section style={{ display: 'inline-block' }}>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentOption}
          onChange={handleChange}
        >
          {options.map((option) => (
            <MenuItem value={option} key={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </section>
  );
}
