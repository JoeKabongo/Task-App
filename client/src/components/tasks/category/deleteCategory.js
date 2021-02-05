import React from 'react';
import useStyles from './style';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function DeleteCategoryForm(props) {
  const classes = useStyles();

  const { categories, show } = props;

  return (
    <>
      <div className={classes.cover}></div>
      <div className={show ? `${classes.container}` : `${classes.hide}`}>
        {categories.map((category) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={false}
                  name={category.name}
                  color="secondary"
                  //   onChange={(e) =>
                  //     handleTaskChange('isCompleted', e.target.checked)
                  //   }
                />
              }
              label={category.name}
              className={classes.margin}
            />
          );
        })}
      </div>
    </>
  );
}
