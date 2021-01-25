import React from 'react';
import Task from '../task/task';
export default function TaskList(props) {
  const [state, setState] = React.useState({
    tasks: [],
    category: 'None',
  });

  React.useEffect(() => {
    setState({
      tasks: props.tasks,
      category: props.category,
      handleChange: props.onChange,
      handleDelete: props.handleDelete,
      toggleDetailWindow: props.toggleDetailWindow,
    });
  }, [props]);
  return (
    <>
      {state.tasks
        .filter(
          (task) =>
            !task.isCompleted &&
            (state.category === 'None' || task.category === state.category._id)
        )
        .map((task) => {
          return (
            <Task
              task={task}
              key={task._id}
              showDetail={() => state.toggleDetailWindow(task._id)}
              onChange={() => state.handleChange(task._id)}
              onDelete={() => state.handleDelete(task._id)}
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
                  onChange={() => state.handleChange(task._id)}
                  onDelete={() => state.handleDelete(task._id)}
                  showDetail={() => state.toggleDetailWindow(task._id)}
                />
              );
            })}
        </section>
      ) : (
        <br />
      )}
    </>
  );
}
