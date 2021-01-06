import mongoose from 'mongoose';

// schema for a step
const stepSchema = mongoose.Schema({
  name: String,
  status: Number,
});

const Step = mongoose.model('Step', stepSchema);
export default Step;
