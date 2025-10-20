"use client";

import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar';
import AddTodoModal from './components/AddTodoModal';
import TodoList from './components/TodoList';
import { Todo, TodoType } from './types/todo';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    const savedTodos = localStorage.getItem('todos');
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }
  }, [darkMode, mounted]);

  const addTodo = (text: string, type: TodoType) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      date: selectedDate,
      type
    };
    
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const getTodosForDate = (date: string) => {
    return todos.filter(todo => todo.date === date);
  };

  const getTodoCountByDate = (date: string) => {
    return todos.filter(todo => todo.date === date).length;
  };

  const formatSelectedDate = () => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const todosForSelectedDate = getTodosForDate(selectedDate);

  if (!mounted) return null;

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-[#191919]' : 'bg-white'}`}>
      
      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        getTodoCountByDate={getTodoCountByDate}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top Bar */}
        <div className={`h-14 flex items-center justify-between px-6 border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-md transition-colors ${
              darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`px-3 py-2 rounded-md transition-colors flex gap-2 text-sm ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {darkMode ? '☀️' : '🌙'}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>


          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {formatSelectedDate()}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Tasks
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {todosForSelectedDate.length} {todosForSelectedDate.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </div>

            <TodoList
              todos={todosForSelectedDate}
              darkMode={darkMode}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
            />
          </div>
        </div>
      </div>

      <AddTodoModal
        isOpen={isModalOpen}
        darkMode={darkMode}
        selectedDate={selectedDate}
        onClose={() => setIsModalOpen(false)}
        onAdd={addTodo}
      />
    </div>
  );
}