"use client";

import { useState } from 'react';
import { TodoType } from '@/app/types/todo';

type AddTodoModalProps = {
  isOpen: boolean;
  darkMode: boolean;
  selectedDate: string;
  onClose: () => void;
  onAdd: (text: string, type: TodoType) => void;
};

const TODO_TYPES: { value: TodoType; label: string; emoji: string; color: string }[] = [
  { value: 'study', label: 'Study', emoji: '📚', color: 'bg-blue-500' },
  { value: 'exercise', label: 'Exercise', emoji: '💪', color: 'bg-green-500' },
  { value: 'work', label: 'Work', emoji: '💼', color: 'bg-purple-500' },
  { value: 'personal', label: 'Personal', emoji: '🏠', color: 'bg-orange-500' },
  { value: 'others', label: 'Other', emoji: '📌', color: 'bg-gray-500' },
];

export default function AddTodoModal({
  isOpen,
  darkMode,
  selectedDate,
  onClose,
  onAdd
}: AddTodoModalProps) {
  const [text, setText] = useState('');
  const [selectedType, setSelectedType] = useState<TodoType>('study');

  const handleSubmit = () => {
    if (text.trim() === '') return;
    onAdd(text, selectedType);
    setText('');
    setSelectedType('study');
    onClose();
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-md mx-4 rounded-2xl shadow-2xl ${
        darkMode ? 'bg-[#202020]' : 'bg-white'
      }`}>
        
        <div className={`p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Add New Task
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDate(selectedDate)}
          </p>
        </div>

        <div className="p-6 space-y-4">
          {/* Task Input */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Task Description
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="What do you want to do?"
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500' 
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500'
              }`}
              autoFocus
            />
          </div>

          {/* Type Selection */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {TODO_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setSelectedType(type.value)}
                  className={`px-4 py-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                    selectedType === type.value
                      ? `${type.color} border-transparent text-white`
                      : darkMode
                        ? 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="text-xl">{type.emoji}</span>
                  <span className="font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`p-6 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex gap-3`}>
          <button
            onClick={onClose}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={text.trim() === ''}
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium transition-colors ${
              text.trim() === ''
                ? darkMode 
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}