import mongoose from 'mongoose';
import Task from '../models/task.js';

// Get all tasks for a user
export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ errors: [error] });
  }
}

// create a task for a user
export async function createTask(req, res) {
  const { name, category } = req.body;

  if (name) {
    const newTask = new Task({
      name,
      userId: req.user.userId,
      category: category,
    });
    try {
      await newTask.save();
      return res.status(201).json(newTask);
    } catch (error) {
      return res.status(409).json({ errors: [error.message] });
    }
  } else {
    return res.status(400).json({ error: 'invalid request' });
  }
}

// delete user task
export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task was deleted' });
  } catch (error) {
    res.status(500).json({ errors: ['Something went wrong'] });
  }
}

// update a user task
export async function updateTask(req, res) {
  const { id } = req.params;
  const { name, isCompleted, description, dueDate, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No task with id: ${id}`);
  }

  console.log(category);
  try {
    const newTask = await Task.findByIdAndUpdate(id, {
      name,
      isCompleted,
      description,
      dueDate,
      category,
    });
    return res.json(newTask);
  } catch (error) {
    return res.status(500).json({ errors: [error.message] });
  }
}
