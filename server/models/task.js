import mongoose from 'mongoose';
import Category from './category.js';

// Schema for a task
const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dueDate: Date,
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
