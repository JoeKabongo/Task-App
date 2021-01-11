import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Task from './task/task';
import AddTaskForm from '../forms/addTask/addTask';
import DeleteConfirmation from './deleteConfirmation/deleteConfirmation';

const allTasks = [
  { name: 'Eat breakfast', isCompleted: false, id: 3, category: 'School' },
  { name: 'Dormir', isCompleted: false, id: 32, category: 'School' },
  { name: 'Wathever', isCompleted: false, id: 4, category: 'Shopping' },
];

export default function TaskList(props) {
  const [tasks, setTasks] = useState(allTasks);
  const [toDelete, setToDelete] = useState(null);
  const [deleteBox, setDeleteBox] = useState(false);

  const { category } = useParams();

  function handleChange(taskId) {
    setTasks((tasks) => {
      return tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      );
    });
  }

  function handleDelete(taskId) {
    setToDelete(taskId);
    setDeleteBox(true);
  }

  function cancelDeletion() {
    setDeleteBox(false);
  }

  function deleteTask() {
    const newTasks = tasks.filter((task) => task.id !== toDelete);
    setTasks(newTasks);
    setDeleteBox(false);
  }

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
