import mongoose from 'mongoose';
import Category from './category.js';

// Schema for a task
const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
  },
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dueDate: {
    type: Date,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  steps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Step',
    },
  ],
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
