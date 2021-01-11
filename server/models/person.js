import mongoose from 'mongoose';

// Schema for a user
const personSchema = mongoose.Schema({
  username: String,
  id_token: String,
  dateJoined: {
    type: Date,
    default: new Date(),
  },
  lastActive: {
    type: Date,
    default: new Date(),
  },
  categoryList: [
    {
      type: Schema.ObjecId,
      ref: 'Category',
    },
  ],

  taskList: [
    {
      type: Schema.ObjecId,
      ref: 'Task',
    },
  ],
});

const Person = mongoose.model('Person', personSchema);
export default Person;
