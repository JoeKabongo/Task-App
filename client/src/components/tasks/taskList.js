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

  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get();
      setTasks(request.data);
    };

    fetchData();
  }, []);

  // change completed status of a task
  const handleChange = (taskId) => {
    setTasks((tasks) => {
      return tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      );
    });
  };

  // open confirmation delete box
  const handleDelete = (taskId) => {
    setToDelete(taskId);
    setDeleteBox(true);
  };

  // cancel deletion and close confirmation delete box
  const cancelDeletion = () => {
    setDeleteBox(false);
  };

  // delete task
  const deleteTask = () => {
    const newTasks = tasks.filter((task) => task.id !== toDelete);
    setTasks(newTasks);
    setDeleteBox(false);
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
              key={task.id}
              onChange={() => handleChange(task.id)}
              onDelete={() => handleDelete(task.id)}
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
                  key={task.id}
                  onChange={() => handleChange(task.id)}
                  onDelete={() => handleDelete(task.id)}
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
          task={tasks.find((task) => task.id === toDelete)}
        />
      )}
    </section>
  );
}
