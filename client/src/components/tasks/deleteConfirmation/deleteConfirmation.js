import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './style';

export default function DeleteConfirmation(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.cover}></div>
      <div
        className={classes.root}
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          padding: '20px',
          zIndex: '3',
        }}
      >
        <p>
          <b> "{props.task.name}"</b> will be deleted permanetly
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
