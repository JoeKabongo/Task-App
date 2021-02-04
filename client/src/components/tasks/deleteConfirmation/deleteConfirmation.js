import React from 'react';
import Button from '@material-ui/core/Button';
import useStyles from './style';

export default function DeleteConfirmation(props) {
  const classes = useStyles();
  const { task, show } = props;

  return (
    <>
      <div className={show ? `${classes.cover}` : `${classes.hide}`}></div>
      <div className={show ? `${classes.container}` : `${classes.hide}`}>
        <div className={show ? `${classes.root}` : `${classes.hide}`}>
          <p>
            <b> {task && task.name}</b> will be deleted permanetly
          </p>
          <div>
            <Button
              variant="contained"
              onClick={() => props.onCancelDeletion()}
              className={classes.margin}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.onDelete()}
              className={classes.margin}
            >
              Delete
            </Button>{' '}
          </div>
        </div>
      </div>
    </>
  );
}
