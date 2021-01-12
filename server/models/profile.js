import mongoose from 'mongoose';

// Schema for a user
const profileSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],

  taskList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

const Profile = mongoose.model('Profile', profileSchema);
export default Profile;
