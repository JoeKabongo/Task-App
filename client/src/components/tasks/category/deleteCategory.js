import React, { useEffect, useState } from 'react';
import useStyles from './style';
import axios from '../../../api/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

export default function DeleteCategoryForm(props) {
  const classes = useStyles();
  const [catStatus, setCatStatus] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cats = props.categories.map((cat) => {
      return { ...cat, checked: false };
    });
    setCatStatus(cats);
    setShow(props.show);
  }, [props]);

  // handle checked stat of checkbox on change
  const handleChange = (id) => {
    const newCats = catStatus.map((cat) =>
      id === cat._id ? { ...cat, checked: !cat.checked } : cat
    );
    setCatStatus(newCats);
  };

  // delete selected category
  const deleteCategories = async () => {
    const catsToDelete = catStatus
      .filter((cat) => cat.checked === true)
      .map((cat) => cat._id);

    if (catsToDelete) {
    }
  };

  return (
    <>
      <div className={show ? `${classes.cover}` : `${classes.hide}`}></div>
      <div className={show ? `${classes.root}` : `${classes.hide}`}>
        <div className={classes.container}>
          <h1> Select Categories to delete</h1>
          <p> * This will also delete tasks under that category</p>
          {catStatus.map((category) => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={category.checked}
                    name={category.name}
                    color="primary"
                    onChange={() => handleChange(category._id)}
                  />
                }
                key={category._id}
                label={category.name}
                className={classes.margin}
              />
            );
          })}
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={deleteCategories}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.margin}
              onClick={() => props.hideDeleteCategory()}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
