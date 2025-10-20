"use client";

import { Todo } from '@/app/types/todo';

type TodoListProps = {
  todos: Todo[];
  darkMode: boolean;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  study: { bg: 'bg-blue-100', text: 'text-blue-700' },
  exercise: { bg: 'bg-green-100', text: 'text-green-700' },
  work: { bg: 'bg-purple-100', text: 'text-purple-700' },
  personal: { bg: 'bg-orange-100', text: 'text-orange-700' },
  other: { bg: 'bg-gray-100', text: 'text-gray-700' },
};

const TYPE_COLORS_DARK: Record<string, { bg: string; text: string }> = {
  study: { bg: 'bg-blue-900', text: 'text-blue-300' },
  exercise: { bg: 'bg-green-900', text: 'text-green-300' },
  work: { bg: 'bg-purple-900', text: 'text-purple-300' },
  personal: { bg: 'bg-orange-900', text: 'text-orange-300' },
  other: { bg: 'bg-gray-700', text: 'text-gray-300' },
};

export default function TodoList({
  todos,
  darkMode,
  onToggleComplete,
  onDelete
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className={`text-center py-16 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        <div className="text-5xl mb-4">📝</div>
        <p className="text-lg">No tasks for this day</p>
        <p className="text-sm mt-2 opacity-60">Click the + button to add a task</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {todos.map((todo) => {
        const colors = darkMode ? TYPE_COLORS_DARK[todo.type] : TYPE_COLORS[todo.type];
        
        return (
          <div
            key={todo.id}
            className={`group flex items-start gap-3 p-4 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-[#282828]' : 'hover:bg-gray-50'
            }`}
          >
            <div
              onClick={() => onToggleComplete((todo.id))}
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
            
            <div className="flex-1 cursor-pointer min-w-0" onClick={() => onToggleComplete((todo.id))}>
              <div className="flex items-center gap-2 mb-1">
                <p className={`text-base break-words ${
                  todo.completed 
                    ? darkMode ? 'line-through text-gray-500' : 'line-through text-gray-400'
                    : darkMode ? 'text-gray-200' : 'text-gray-900'
                }`}>
                  {todo.text}
                </p>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text}`}>
                {todo.type}
              </span>
            </div>

            <button
              onClick={() => onDelete((todo.id))}
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
        );
      })}
    </div>
  );
}