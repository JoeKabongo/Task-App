import React, { useState } from 'react';
import Task from './task/task';

const allTasks = [
  { name: 'Eat breakfast', isCompleted: false, id: 3 },
  { name: 'Dormir', isCompleted: false, id: 32 },
  { name: 'Wathever', isCompleted: false, id: 4 },
];

export default function Tasks(props) {
  const [tasks, setTasks] = useState(allTasks);
  const x = [];

  const uncompletedTasks = tasks.filter((task) => task.isCompleted);
  const completedTasks = tasks.filter((task) => !task.isCompleted);

  console.log(uncompletedTasks);
  console.log(completedTasks);

  function handleChange(taskId) {
    console.log('here');
    setTasks((tasks) => {
      return tasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      );
    });
  }
  return (
    <section style={{ padding: '15px' }}>
      <h1> All Task</h1>
      {tasks
        .filter((task) => !task.isCompleted)
        .map((task) => {
          return (
            <Task
              task={task}
              key={task.id}
              onChange={() => handleChange(task.id)}
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
                />
              );
            })}
        </section>
      ) : (
        <br />
      )}
    </section>
  );
}
