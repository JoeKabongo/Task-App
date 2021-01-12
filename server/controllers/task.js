import mongoose from 'mongoose';
import Task from '../models/task.js';

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}

export async function createTask(req, res) {
  const { name } = req.body;
  if (name) {
    const newTask = new Task({ name });

    try {
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: 'invalid request' });
  }
}

export function deleteTask(req, res) {}

export function editTask(req, res) {}
