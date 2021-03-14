import mongoose from 'mongoose';
import Task from '../models/task.js';

// Get all tasks for a user
export async function getTasks(req, res) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized error ',
      message: 'User is not authorized to view this information',
    });
  }
  try {
    const tasks = await Task.find({ userId: req.user.userId });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      message: 'Something went wrong on the server',
    });
  }
}

// create a task for a user
export async function createTask(req, res) {
  const { name, category } = req.body;
  if (!req.user) {
    return res.status(401).json({
      error: 'Unauthorized Operation',
      message: 'User is not authorized to perfom this action',
    });
  }

  // make sure reqeust provided a name
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
      return res.status(500).json({
        error: 'Server error',
        message: 'Something went wrong on the server',
      });
    }
  } else {
    return res
      .status(400)
      .json({ error: 'Bad request', message: 'Name is required' });
  }
}

// delete user task
export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    // delete the catetory and the tasks associated with it
    const task = await Category.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        error: 'not found error',
        message: 'This category was not found in our server',
      });
    }

    return res.status(200).json({ message: 'Task was deleted' });
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      message: 'Something went wrong on the server',
    });
  }
}

// update a user task
export async function updateTask(req, res) {
  const { id } = req.params;
  const { name, isCompleted, description, dueDate, category } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        error: 'not found',
        message: 'Task was not found on the server',
      });
    }

    if (name) task.name = name;
    if (description) task.description = description;
    if (dueDate) task.dueDate = dueDate;
    if (category) task.category = category;
    task.isCompleted = isCompleted;
    task.save();

    return res.json(task);
  } catch (error) {
    return res.status(500).json({
      error: 'Server error',
      message: 'Something went wrong on the server',
    });
  }
}
