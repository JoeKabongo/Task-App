import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import style from './style';

export default function Task(props) {
  const { name, isCompleted } = props.task;

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
      <div>
        <IconButton aria-label="delete" onClick={() => props.onDelete()}>
          <DeleteOutlineOutlinedIcon fontSize="inherit" />
        </IconButton>
        <IconButton>
          <InfoOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}
