import React, { useState, useEffect, useContext } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from '../../api/index';
import AddTaskForm from './addTaskForm/addTask';
import DeleteConfirmation from './deleteConfirmation/deleteConfirmation';
import TaskDetail from './taskDetail/taskDetail';
import TaskList from './taskList/taskList';
import Filters from './filters/filters';
import { AlertMessageContext } from '../../app';
import { getErrorMessages } from '../../utils/errorHandler';
import { displayAlertMessages } from '../../utils/alertMessage';

export default function TaskDisplay(props) {
  const setAlertState = useContext(AlertMessageContext);
  const [state, setState] = useState({
    tasks: [],
    isLoading: true,
    showDeleteConfirmation: false,
    showTaskDetail: false,
    taskToDelete: null,
    category: 'None',
    categoryList: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      // fetch the users tasks
      try {
        const requestTasks = await axios.get('/tasks');
        const requestCategories = await axios.get('/category/all');
        setState({
          ...state,
          tasks: requestTasks.data,
          isLoading: false,
          categoryList: requestCategories.data,
        });
      } catch (error) {
        displayAlertMessages(
          { messages: getErrorMessages(error), type: 'error' },
          setAlertState
        );
        setState({ ...state, isLoading: false });
      }
    };
    fetchData();
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
      displayAlertMessages(
        { messages: getErrorMessages(error), type: 'error' },
        setAlertState
      );
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
      displayAlertMessages(
        { messages: ['task has been deleted'], type: 'success' },
        setAlertState
      );
    } catch (error) {
      displayAlertMessages(
        { messages: getErrorMessages(error), type: 'error' },
        setAlertState
      );
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
    <>
      <section>
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h1>
              {state.category === 'None' ? 'All' : `${state.category.name}`}{' '}
              Tasks
            </h1>
            <Filters
              tasks={state.tasks}
              categoryList={state.categoryList}
              updateState={updateState}
              category={state.category}
            />
          </div>

          {state.isLoading && <CircularProgress />}
          {!state.isLoading && (
            <AddTaskForm
              setState={updateState}
              tasks={state.tasks}
              category={state.category}
            />
          )}

          <TaskList
            tasks={state.tasks}
            category={state.category}
            onChange={handleChange}
            handleDelete={handleDelete}
            toggleDetailWindow={toggleDetailWindow}
          />
        </div>
        <div>
          <TaskDetail
            show={state.showTaskDetail}
            task={state.tasks.find((task) => task._id === state.taskToShowId)}
            closeDetail={() => toggleDetailWindow(state.taskToShowId)}
            setTasks={updateState}
            allTasks={state.tasks}
            categoryList={state.categoryList}
          />
        </div>
      </section>

      <DeleteConfirmation
        show={state.showDeleteConfirmation}
        onCancelDeletion={() => cancelDeletion()}
        onDelete={() => deleteTask()}
        task={state.tasks.find((task) => task._id === state.taskToDelete)}
      />
    </>
  );
}
