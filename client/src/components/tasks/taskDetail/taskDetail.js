import React from 'react';

export function TaskDetail(props) {
  const { show, task } = props;
  console.log(task);
  return (
    <div>
      <h2> Task</h2>
    </div>
  );
}
