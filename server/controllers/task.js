import mongoose from 'mongoose';
import Task from '../models/task.js';

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
      res.status(409).json({ message: error.message });
    }
  } else {
    res.status(400).json({ message: 'invalid request' });
  }
}

export function deleteTask(req, res) {}

export function editTask(req, res) {}
