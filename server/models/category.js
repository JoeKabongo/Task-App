import mongoose from 'mongoose';

// schema for a category
const categorySchema = mongoose.Schema({
  name: String,
  dateCreated: Date,
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
