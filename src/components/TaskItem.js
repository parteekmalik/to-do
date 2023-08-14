import React from 'react';

function TaskItem({ task, index, toggleTaskCompletion, handleDelete }) {
  return (
    <div key={index} >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(index)}
      />
      <span className='tasks'>{task.text}</span>
      <button onClick={() => handleDelete(index)}>X</button>
    </div>
  );
}

export default TaskItem;