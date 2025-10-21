"use client";

import { useState, useEffect } from 'react';
import Sidebar from './components/sidebar';
import Calendar from './components/calendar';
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
  const [filter, setFilter] = useState('all');

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

  const getFilteredTodos = () => {
    const todosForDate = getTodosForDate(selectedDate);
    
    if (filter === 'done') {
      return todosForDate.filter(todo => todo.completed);
    }
    if (filter === 'inProgress') {
      return todosForDate.filter(todo => !todo.completed);
    }
    return todosForDate; 
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
  const filteredTodos = getFilteredTodos();

  const todoStats = {
    all: todosForSelectedDate.length,
    completed: todosForSelectedDate.filter(t => t.completed).length,
    inProgress: todosForSelectedDate.filter(t => !t.completed).length
  };

  if (!mounted) return null;

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-[#191919]' : 'bg-white'}`}>
      
      <Sidebar
        darkMode={darkMode}
        sidebarOpen={sidebarOpen}
        selectedDate={selectedDate}
        filter={filter}
        onFilterChange={setFilter}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        todoStats={todoStats}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        
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

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto px-8 py-8">
            
            <div className="mb-8">
              <Calendar
                darkMode={darkMode}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                getTodoCountByDate={getTodoCountByDate}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Tasks
                  </h1>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add New Task</span>
                </button>
              </div>

              <div className={`rounded-lg ${
                darkMode ? 'bg-[#202020]' : 'bg-white border border-gray-200'
              }`}>
                <TodoList
                  todos={filteredTodos}
                  darkMode={darkMode}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTodo}
                />
              </div>
            </div>
            
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