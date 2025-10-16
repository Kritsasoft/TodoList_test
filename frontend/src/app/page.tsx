"use client";

import { useState, useEffect } from 'react';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
};

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [mounted, setMounted] = useState(false);
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
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

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('en-US', options);
  };

  const getFilteredTodos = () => {
    if (filter === 'done') return todos.filter(t => t.completed);
    if (filter === 'notdone') return todos.filter(t => !t.completed);
    return todos;
  };

  const filteredTodos = getFilteredTodos();

  if (!mounted) {
    return null;
  }

  return (
    <div className={`flex h-screen ${darkMode ? 'bg-[#191919]' : 'bg-white'}`}>
      
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ${
        darkMode ? 'bg-[#202020] border-r border-gray-800' : 'bg-[#f7f6f3] border-r border-gray-200'
      } flex flex-col overflow-hidden`}>
        
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-md flex items-center justify-center text-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white'
            }`}>
              📝
            </div>
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Workspace
            </span>
          </div>
        </div>

        <div className="flex-1 px-3 py-2 space-y-1">
          <button
            onClick={() => setFilter('all')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 text-sm ${
              filter === 'all'
                ? darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>📋</span>
            <span>All Tasks</span>
            <span className="ml-auto text-xs">{todos.length}</span>
          </button>

          <button
            onClick={() => setFilter('notdone')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 text-sm ${
              filter === 'notdone'
                ? darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>⏳</span>
            <span>In Progress</span>
            <span className="ml-auto text-xs">{todos.filter(t => !t.completed).length}</span>
          </button>

          <button
            onClick={() => setFilter('done')}
            className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2 text-sm ${
              filter === 'done'
                ? darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>✅</span>
            <span>Completed</span>
            <span className="ml-auto text-xs">{todos.filter(t => t.completed).length}</span>
          </button>
        </div>

      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <div className={`h-14 flex items-center justify-between px-6 border-b ${
          darkMode ? 'border-gray-800' : 'border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
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
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-3 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-full px-3 py-2 rounded-md transition-colors flex items-center gap-2 text-sm ${darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {darkMode ? '☀️' : '🌙'}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {getCurrentDate()}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-12">
            
            <div className="mb-8">
              <h1 className={`text-4xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {filter === 'all' ? 'All Tasks' : filter === 'done' ? 'Completed Tasks' : 'In Progress'}
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}
              </p>
            </div>

            <div className="mb-6">
              <div className={`flex items-center gap-3 p-2 rounded-lg border ${
                darkMode ? 'bg-[#202020] border-gray-800' : 'bg-white border-gray-200'
              }`}>
                <div className="pl-2">
                  <div className={`w-5 h-5 rounded border-2 ${
                    darkMode ? 'border-gray-600' : 'border-gray-300'
                  }`}></div>
                </div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a task..."
                  className={`flex-1 bg-transparent outline-none text-base ${
                    darkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                  }`}
                />
                {inputValue && (
                  <button
                    onClick={addTodo}
                    className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                      darkMode 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-1">
              {filteredTodos.length === 0 ? (
                <div className={`text-center py-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  <div className="text-5xl mb-4">
                    {filter === 'done' ? '🎉' : filter === 'notdone' ? '📝' : '📭'}
                  </div>
                  <p className="text-lg">
                    {filter === 'done' && 'No completed tasks yet'}
                    {filter === 'notdone' && 'All tasks completed!'}
                    {filter === 'all' && 'No tasks yet'}
                  </p>
                  <p className="text-sm mt-2 opacity-60">
                    {filter === 'all' && 'Click above to add your first task'}
                  </p>
                </div>
              ) : (
                filteredTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`group flex items-start gap-3 p-3 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-[#202020]' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div
                      onClick={() => toggleComplete(todo.id)}
                      className="cursor-pointer pt-0.5"
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        todo.completed 
                          ? 'bg-blue-500 border-blue-500' 
                          : darkMode 
                            ? 'border-gray-600 hover:border-gray-500'
                            : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        {todo.completed && (
                          <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      onClick={() => toggleComplete(todo.id)}
                      className="flex-1 cursor-pointer min-w-0"
                    >
                      <p className={`text-base break-words ${
                        todo.completed 
                          ? darkMode ? 'line-through text-gray-500' : 'line-through text-gray-400'
                          : darkMode ? 'text-gray-200' : 'text-gray-900'
                      }`}>
                        {todo.text}
                      </p>
                      <span className={`text-xs mt-0.5 inline-block ${
                        darkMode ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {formatDate(todo.createdAt)}
                      </span>
                    </div>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className={`opacity-0 group-hover:opacity-100 p-1.5 rounded transition-all ${
                        darkMode 
                          ? 'hover:bg-gray-800 text-gray-500 hover:text-gray-300' 
                          : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}