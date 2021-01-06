import mongoose from 'mongoose';

// Schema for a task
const taskSchema = mongoose.Schema({
  name: String,
  description: String,
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  dueDate: Date,
  category: {
    type: Schema.ObjecId,
    ref: 'Category',
  },
  steps: [
    {
      type: Schema.ObjectId,
      ref: 'Step',
    },
  ],
  status: Number,
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
