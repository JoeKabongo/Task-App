import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './style';

export default function DeleteConfirmation(props) {
  const classes = useStyles();
  const { task, show } = props;

  return (
    <>
      <div className={show ? `${classes.cover}` : `${classes.hide}`}></div>
      <div className={show ? `${classes.root}` : `${classes.hide}`}>
        <p>
          <b> {task && task.name}</b> will be deleted permanetly
        </p>
        <Button variant="contained" onClick={() => props.onCancelDeletion()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.onDelete()}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
