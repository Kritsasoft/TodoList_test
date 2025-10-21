"use client";

import { useState } from 'react';

type CalendarProps = {
  darkMode: boolean;
  selectedDate: string;
  onDateSelect: (date: string) => void;
  getTodoCountByDate: (date: string) => number;
};

export default function Calendar({
  darkMode,
  selectedDate,
  onDateSelect,
  getTodoCountByDate
}: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today.toISOString().split('T')[0]);
  };

  const getDateString = (day: number) => {
    return new Date(year, month, day).toISOString().split('T')[0];
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           month === today.getMonth() && 
           year === today.getFullYear();
  };

  const isSelected = (day: number) => {
    const dateStr = getDateString(day);
    return dateStr === selectedDate;
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                     'July', 'August', 'September', 'October', 'November', 'December'];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="h-12"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = getDateString(day);
    const count = getTodoCountByDate(dateStr);
    const today = isToday(day);
    const selected = isSelected(day);

    days.push(
      <button
        key={day}
        onClick={() => onDateSelect(dateStr)}
        className={`h-12 rounded-lg flex flex-col items-center justify-center transition-all relative ${
          selected
            ? 'bg-blue-500 text-white shadow-lg'
            : today
              ? darkMode 
                ? 'bg-gray-700 text-white border-2 border-blue-500'
                : 'bg-blue-50 text-blue-600 border-2 border-blue-500'
              : darkMode
                ? 'hover:bg-gray-800 text-gray-300'
                : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        <span className="text-sm font-medium">{day}</span>
        {count > 0 && (
          <span className={`text-xs absolute bottom-0.5 ${
            selected ? 'text-white' : darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            •
          </span>
        )}
      </button>
    );
  }

  return (
    <div className={`rounded-xl p-6 ${
      darkMode ? 'bg-[#202020]' : 'bg-white border border-gray-200'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {monthNames[month]} {year}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            Today
          </button>
          <button
            onClick={previousMonth}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextMonth}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((name) => (
          <div
            key={name}
            className={`text-center text-xs font-medium ${
              darkMode ? 'text-gray-500' : 'text-gray-500'
            }`}
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
}
