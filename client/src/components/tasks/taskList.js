import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from '../../api/index';

import Task from './task/task';
import AddTaskForm from './addTask/addTask';
import DeleteConfirmation from './deleteConfirmation/deleteConfirmation';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [toDelete, setToDelete] = useState(null);
  const [deleteBox, setDeleteBox] = useState(false);
  const [{ category }, setCategory] = useState(useParams());

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get('/tasks');
      setTasks(request.data);
    };

    fetchData();
    return () => console.log('clean up');
  }, [category]);

  // change complete status of a task
  const handleChange = async (taskId) => {
    const newTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    try {
      await axios.put(
        `/tasks/update/${taskId}`,
        newTasks.find((task) => task._id === taskId)
      );

      setTasks(newTasks);
    } catch (error) {
      console.log(error);
    }
  };

  // open confirmation delete box
  const handleDelete = (taskId) => {
    setToDelete(taskId);
    setDeleteBox(true);
    console.log(taskId);
  };

  // cancel deletion and close confirmation delete box
  const cancelDeletion = () => {
    setDeleteBox(false);
  };

  // delete task
  const deleteTask = async () => {
    try {
      await axios.delete(`/tasks/delete/${toDelete}`);
      const newTasks = tasks.filter((task) => task._id !== toDelete);
      setDeleteBox(false);
      setTasks(newTasks);
    } catch (error) {
      alert('something went wrong');
      console.log(error);
    }
  };

  return (
    <section style={{ padding: '15px' }}>
      <h1> All Task</h1>
      <AddTaskForm setTasks={setTasks} tasks={tasks} />
      {tasks
        .filter((task) => !task.isCompleted)
        .map((task) => {
          return (
            <Task
              task={task}
              key={task._id}
              onChange={() => handleChange(task._id)}
              onDelete={() => handleDelete(task._id)}
            />
          );
        })}
      {tasks.filter((task) => task.isCompleted).length !== 0 ? (
        <section>
          <h3> Completed </h3>
          {tasks
            .filter((task) => task.isCompleted)
            .map((task) => {
              return (
                <Task
                  task={task}
                  key={task._id}
                  onChange={() => handleChange(task._id)}
                  onDelete={() => handleDelete(task._id)}
                />
              );
            })}
        </section>
      ) : (
        <br />
      )}
      {deleteBox && (
        <DeleteConfirmation
          onCancelDeletion={() => cancelDeletion()}
          onDelete={() => deleteTask()}
          task={tasks.find((task) => task._id === toDelete)}
        />
      )}
    </section>
  );
}
