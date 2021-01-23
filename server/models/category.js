import mongoose from 'mongoose';

// schema for a category
const categorySchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 60,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
