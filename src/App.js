
import { useState } from 'react';
import './App.css';
import TaskItem from './components/TaskItem';
import TaskInput from './components/TaskInput';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((x, i) => {
      if (i === index) x.completed = !x.completed
      return x
    });
    setTasks(updatedTasks);
  };

  const handleDelete = (index)=>{
    const updatedTasks = tasks.filter((_, i) => {return i !== index ? true : !tasks[index].completed});
    setTasks(updatedTasks);
  }

  return (
    <div className='to-do'>
      <h1>ToDo App</h1>
      <TaskInput taskInput={taskInput} setTaskInput={setTaskInput} addTask={addTask} />
      <ul className='TaskItem'>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            toggleTaskCompletion={toggleTaskCompletion}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};


export default App;
