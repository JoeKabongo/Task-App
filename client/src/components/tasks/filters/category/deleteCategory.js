import React, { useEffect, useState } from 'react';
import useStyles from './style';
import axios from '../../../../api/index';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export default function DeleteCategoryForm(props) {
  const classes = useStyles();
  const [catStatus, setCatStatus] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setCatStatus(props.categories);
    setShow(props.show);
  }, [props]);

  // delete  category
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`category/delete/${id}`);
      console.log(response.data);

      props.updateState(
        'categoryList',
        props.categories.filter((cat) => cat._id !== id)
      );
    } catch (e) {
      alert('Could not delete, something went wrong');
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
              <div>
                {category.name}
                <IconButton
                  aria-label="delete"
                  onClick={() => deleteCategory(category._id)}
                >
                  <DeleteOutlineOutlinedIcon fontSize="inherit" />
                </IconButton>
              </div>
            );
          })}
          <div>
            <Button
              variant="contained"
              color="primary"
              // className={classes.margin}
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
