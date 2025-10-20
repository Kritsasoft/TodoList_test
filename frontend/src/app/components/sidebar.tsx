"use client";

type SidebarProps = {
  darkMode: boolean;
  sidebarOpen: boolean;
  selectedDate: string;
  onDateSelect: (date: string) => void;
  onToggleSidebar: () => void;
  onToggleDarkMode: () => void;
  getTodoCountByDate: (date: string) => number;
};

export default function Sidebar({
  darkMode,
  sidebarOpen,
  selectedDate,
  onDateSelect,
  getTodoCountByDate
}: SidebarProps) {

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const formatDateDisplay = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ${
      darkMode ? 'bg-[#202020] border-r border-gray-800' : 'bg-[#f7f6f3] border-r border-gray-200'
    } flex flex-col overflow-hidden`}>
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-md flex items-center justify-center text-lg ${
            darkMode ? 'bg-gray-700' : 'bg-white'
          }`}>
            📅
          </div>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Calendar
          </span>
        </div>
      </div>

      <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {dates.map((date) => {
          const dateStr = getDateString(date);
          const count = getTodoCountByDate(dateStr);
          const isSelected = dateStr === selectedDate;

          return (
            <button
              key={dateStr}
              onClick={() => onDateSelect(dateStr)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between text-sm ${
                isSelected
                  ? darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                  : darkMode ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{formatDateDisplay(date)}</span>
              {count > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  isSelected
                    ? darkMode ? 'bg-gray-600' : 'bg-gray-100'
                    : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}