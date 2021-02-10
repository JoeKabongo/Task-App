import mongoose from 'mongoose';

// Schema for a user
const resetPasswordSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expire: {
    type: Date,
    required: true,
  },
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);
export default ResetPassword;
