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
  used: {
    type: Boolean,
    default: false,
  },
  expire_in: {
    type: Date,
    required: true,
  },
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);
export default ResetPassword;
