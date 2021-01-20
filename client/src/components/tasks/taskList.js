import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from '../../api/index';

import Task from './task/task';
import AddTaskForm from './addTaskForm/addTask';
import DeleteConfirmation from './deleteConfirmation/deleteConfirmation';
import { TaskDetail } from './taskDetail/taskDetail';

export default function TaskList(props) {
  const [state, setState] = useState({
    tasks: [],
    isLoading: true,
    showDeleteConfirmation: false,
    showTaskDetail: false,
    taskToDelete: null,
    category: useParams(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get('/tasks');
        setState({ ...state, tasks: request.data, isLoading: false });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    return () => console.log('clean up');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateState = (name, value) => {
    setState({ ...state, [name]: value });
  };
  // change complete status of a task
  const handleChange = async (taskId) => {
    const newTasks = state.tasks.map((task) =>
      task._id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    try {
      await axios.put(
        `/tasks/update/${taskId}`,
        newTasks.find((task) => task._id === taskId)
      );

      setState({ ...state, tasks: newTasks });
    } catch (error) {
      console.log(error);
    }
  };

  // open confirmation delete box
  const handleDelete = (taskId) => {
    setState({ ...state, taskToDelete: taskId, showDeleteConfirmation: true });
  };

  // cancel deletion and close confirmation delete box
  const cancelDeletion = () => {
    setState({ ...state, showDeleteConfirmation: false });
  };

  // delete task
  const deleteTask = async () => {
    try {
      await axios.delete(`/tasks/delete/${state.taskToDelete}`);
      const newTasks = state.tasks.filter(
        (task) => task._id !== state.taskToDelete
      );
      setState({ ...state, tasks: newTasks, showDeleteConfirmation: false });
    } catch (error) {
      console.log(error);
    }
  };

  // alert task detail window
  const toggleDetailWindow = (taskId) => {
    setState({
      ...state,
      showTaskDetail: !state.showTaskDetail,
      taskToShowId: taskId,
    });
  };

  return (
    <section style={{ padding: '15px' }}>
      <h1> All Task</h1>
      <AddTaskForm setTasks={updateState} tasks={state.tasks} />
      {state.isLoading && <CircularProgress />}

      {state.tasks
        .filter((task) => !task.isCompleted)
        .map((task) => {
          return (
            <Task
              task={task}
              key={task._id}
              showDetail={() => toggleDetailWindow(task._id)}
              onChange={() => handleChange(task._id)}
              onDelete={() => handleDelete(task._id)}
            />
          );
        })}
      {state.tasks.filter((task) => task.isCompleted).length !== 0 ? (
        <section>
          <h3> Completed </h3>
          {state.tasks
            .filter((task) => task.isCompleted)
            .map((task) => {
              return (
                <Task
                  task={task}
                  key={task._id}
                  onChange={() => handleChange(task._id)}
                  onDelete={() => handleDelete(task._id)}
                  showDetail={() => toggleDetailWindow(task._id)}
                />
              );
            })}
        </section>
      ) : (
        <br />
      )}
      <DeleteConfirmation
        show={state.showDeleteConfirmation}
        onCancelDeletion={() => cancelDeletion()}
        onDelete={() => deleteTask()}
        task={state.tasks.find((task) => task._id === state.taskToDelete)}
      />
      <TaskDetail
        show={state.showTaskDetail}
        task={state.tasks.find((task) => task._id === state.taskToShowId)}
        closeDetail={() => toggleDetailWindow(state.taskToShowId)}
        setTasks={updateState}
        allTasks={state.tasks}
      />
    </section>
  );
}
