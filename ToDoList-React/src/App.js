import React, { useState } from 'react';
import Layout from './components/Layout';
import TodoList from './components/TodoList';

const App = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAddClick = () => {
    if (task.trim() === '') return;

    const newTodo = {
      id: Date.now(),
      text: task,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setTask('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Görev Listesi
        </h1>

        <div className="card mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Yeni görev ekleyin..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddClick()}
            />
            <button
              className="btn-primary"
              onClick={handleAddClick}
            >
              Ekle
            </button>
          </div>
        </div>

        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
    </Layout>
  );
};

export default App;