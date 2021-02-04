import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import axios from '../../../api/index';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CategorySelection(props) {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState('None');
  const [showForm, setShowForm] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState('');

  React.useEffect(() => {
    setCategories(props.categoryList);
    setCategory(props.category);
  }, [props]);

  // update the category selection
  const handleChange = (event) => {
    props.updateState('category', event.target.value);
  };

  // new category form
  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };

  // save a category
  const saveCategory = async () => {
    try {
      const response = await axios.post('/category/create', {
        name: newCategory,
      });
      setNewCategory('');
      setShowForm(false);
      props.updateState('categoryList', [...props.categoryList, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // show the form if the user selected it
  if (showForm) {
    return (
      <div className={classes.margin} style={{ marginTop: '10px' }}>
        <TextField
          className={classes.margin}
          id="filled-multiline-static"
          label="New Category"
          value={newCategory}
          // variant="filled"
          onChange={handleNewCategoryChange}
        ></TextField>
        <Button onClick={saveCategory}> Save</Button>
        <Button onClick={() => setShowForm(false)}> Cancel</Button>
      </div>
    );
  }

  return (
    <section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          marginTop: '10px',
        }}
      >
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={handleChange}
          >
            <MenuItem value={'None'}>All</MenuItem>
            {categories.map((category) => (
              <MenuItem value={category} key={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => setShowForm(true)}>
          <AddIcon />
        </Button>
        <IconButton aria-label="delete" onClick={() => props.onDelete()}>
          <DeleteOutlineOutlinedIcon fontSize="inherit" />
        </IconButton>
      </div>
    </section>
  );
}
