import React from 'react';
import Task from './task/task';
const tasks = [
  { name: 'Eat breakfast', status: 0, id: 3 },
  { name: 'Dormir', status: 1, id: 32 },
  { name: 'Wathever', status: 0, id: 4 },
];

export default function Tasks(props) {
  const uncompletedTasks = tasks.filter((task) => task.status === 0);
  const completedTasks = tasks.filter((task) => task.status === 1);
  return (
    <section style={{ padding: '15px' }}>
      <h1> All Task</h1>
      {uncompletedTasks.map((task) => {
        return <Task task={task} key={task.id} />;
      })}
      {completedTasks && (
        <div>
          <h3> Completed </h3>
          {completedTasks.map((task) => {
            return <Task task={task} key={task.id} />;
          })}
        </div>
      )}
    </section>
  );
}
