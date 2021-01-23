import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  const [category, setCategory] = React.useState('All');
  const [categoryList, setCategoryList] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/category/all');
      setCategoryList(response.data);
    };
    fetchData();
  }, []);

  const handleChange = (event) => {};

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const saveCategory = async () => {
    try {
      const response = await axios.post('/category/create', {
        name: category,
      });
      setShowForm(false);
      setCategoryList([...categoryList, response.data]);
    } catch (error) {
      console.log(error);
      alert('something went wrong');
    }
  };

  if (showForm) {
    return (
      <div className={classes.margin} style={{ marginTop: '10px' }}>
        <TextField
          className={classes.margin}
          id="filled-multiline-static"
          label="New Category"
          value={category}
          variant="filled"
          fullWidth
          onChange={handleCategoryChange}
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
            <MenuItem value={'All'}>All</MenuItem>
            {categoryList.map((category) => (
              <MenuItem value={category.name} key={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={() => setShowForm(true)}>
          <AddIcon />
        </Button>
      </div>
    </section>
  );
}
