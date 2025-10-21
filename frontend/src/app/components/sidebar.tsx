"use client";

type SidebarProps = {
  darkMode: boolean;
  sidebarOpen: boolean;
  selectedDate: string;
  filter : string;
  onFilterChange: (filter: string) => void;
  onToggleDarkMode: () => void;
  todoStats: {
     all: number;
     completed: number;
     inProgress: number;
  }
};

export default function Sidebar({
  darkMode,
  sidebarOpen,
  filter,
  onFilterChange,
  onToggleDarkMode,
  todoStats
}: SidebarProps) {
     return(
          <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 ${darkMode ? 'bg-[#202020] border-r border-gray-800' : 'bg-[#f7f6f3] border-r border-gray-200' } flex flex-col overflow-hidden` }>
               <div className="p4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                         <div className={`w-8 h-8 rounded-md flex item-center justify-center text-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                              📝
                         </div>
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              Todo List
                         </span>
                    </div>
               </div>
               <div className="flex-1 px-3 py-2 space-y-1">
                    <button
                    onClick={() => onFilterChange('all')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center transition-colors ${
                         filter ==='all'
                         ? darkMode ? 'bg-gray-700 text-white': 'bg-white text-gray-900' 
                         : darkMode ? 'text-gray-400 hover:bg-gray-800' :  'text-gray-600 hover:bg-gray-100'
                         }`}
                         >
                         <span>📋</span>
                         <span>All Tasks</span>
                         <span className="ml-auto text-xs" >{todoStats.all}</span>
                    </button>

                    <button
                    onClick={() => onFilterChange('inProgress')}
                    className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm transition-colors ${
                         filter ==='inProgress'
                         ? darkMode ? 'bg-gray-700 text-white': 'bg-white text-gray-900' 
                         : darkMode ? 'text-gray-400 hover:bg-gray-800' :  'text-gray-600 hover:bg-gray-100'
                    }`}
                    >
                         <span>⏳</span>
                         <span>In Progress</span>
                         <span className="ml-auto text-xs" >{todoStats.inProgress}</span>
                    </button>

                    <button onClick={() => onFilterChange('done')}
                         className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm transition-colors ${
                              filter ==='done'
                              ? darkMode ? 'bg-gray-700 text-white': 'bg-white text-gray-900' 
                              : darkMode ? 'text-gray-400 hover:bg-gray-800' :  'text-gray-600 hover:bg-gray-100'
                         }`}>
                              <span>✅</span>
                              <span>Completed</span>
                              <span className="ml-auto text-xs" >{todoStats.completed}</span>
                    </button>
               </div>
          </div>
     )
}