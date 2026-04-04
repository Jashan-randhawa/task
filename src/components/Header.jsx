import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Search, Bell, Settings, User } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/signup' || location.pathname === '/signin') return null;

  return (
    <header className="global-header flex items-center justify-between px-8 py-4 border-b">
      
      {/* Global Search Bar with AI Inside */}
      <div className="search-container flex-1 max-w-xl relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-gray" />
        </div>
        <input 
          type="text" 
          className="search-input w-full pl-10 pr-12 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm text-dark transition-all placeholder:text-slate-500"
          placeholder="Search talents, events, or ask AI..."
        />
        <button className="absolute inset-y-0 right-1 top-1 bottom-1 px-2 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 flex items-center justify-center hover:opacity-90 transition-opacity group">
           <Sparkles size={14} className="text-white group-hover:animate-spin" />
        </button>
      </div>

      <div className="header-actions flex items-center gap-4">
        <button className="icon-btn relative">
          <Bell size={20} className="text-gray hover:text-dark transition-colors" />
          <span className="notification-dot absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full border border-surface animate-pulse"></span>
        </button>
        <button className="icon-btn">
          <Settings size={20} className="text-gray hover:text-dark transition-colors" />
        </button>
        <div className="user-profile flex items-center gap-2 ml-4 cursor-pointer pl-4 border-l border-slate-800">
           <div className="avatar w-8 h-8 rounded-full bg-gradient-to-tr from-teal-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-md">
             JD
           </div>
        </div>
      </div>
    </header>
  );
}
