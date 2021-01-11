import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Task from './task/task';
import AddTaskForm from '../forms/addTask/addTask';

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

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function DeleteConfirmation(props) {
  const classes = useStyles();
  const coverStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'none',
    opacity: 0.3,
    zIndex: '2',
    background: '#000',
  };
  console.log(props);
  return (
    <>
      <div style={coverStyle}></div>
      <div
        className={classes.root}
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#fff',
          padding: '20px',
          zIndex: '3',
        }}
      >
        <p>
          <b> "{props.task.name}"</b> will be deleted permanetly
        </p>
        <Button variant="contained" onClick={() => props.onCancelDeletion()}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => props.onDelete()}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
