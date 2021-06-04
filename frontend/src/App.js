import React from 'react';
import './App.css';
import Routes from './routes';
import TodoList from './components/TodoList';
import TodoLista from './components/TodoLista';

function App() {
  return (
    

    <div className='todo-app container'>
    {/* //   <TodoLista /> */}
    <Routes/>
     </div>
  );
}

export default App;
