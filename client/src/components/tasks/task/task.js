import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export default function Task(props) {
  const { name, isCompleted } = props.task;
  console.log(props.onChange);
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#F5F5F5',
    padding: '10px',
    borderRadius: '5px',
    marginTop: '5px',
  };

  return (
    <div style={style}>
      <FormControlLabel
        style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}
        control={
          <Checkbox
            checked={isCompleted}
            onChange={() => props.onChange()}
            name="checkedA"
          />
        }
        label={name}
      />
      <IconButton aria-label="delete">
        <DeleteOutlineOutlinedIcon fontSize="inherit" />
      </IconButton>
    </div>
  );
}
