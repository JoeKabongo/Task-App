import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export default function Task(props) {
  const { name, status } = props.task;
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
        style={{ textDecoration: status == 1 ? 'line-through' : 'none' }}
        control={
          <Checkbox
            checked={status === 1 ? true : false}
            // onChange={handleChange}
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
