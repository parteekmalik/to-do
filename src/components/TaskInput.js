import React from 'react';

function TaskInput({ taskInput, setTaskInput, addTask }) {
  return (
    <div className='TaskInput'>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default TaskInput;