import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Search, Bell, Settings, ChevronDown, User, LogOut } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (location.pathname === '/signup' || location.pathname === '/signin') return null;

  return (
    <header className="global-header flex items-center justify-between px-8 py-4 border-b">
      
      {/* Global Search */}
      <div className="header-search-container">
        <div className="header-search-icon">
          <Search size={16} />
        </div>
        <input 
          type="text" 
          className="header-search-input"
          placeholder="Search talents, events, or ask AI..."
        />
        <button className="header-ai-btn" aria-label="Ask AI">
          <Sparkles size={13} />
        </button>
      </div>

      <div className="header-actions flex items-center gap-3">
        {/* Notification bell */}
        <button className="icon-btn relative">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>

        {/* Settings */}
        <button className="icon-btn" onClick={() => navigate('/settings')}>
          <Settings size={19} />
        </button>

        {/* Divider */}
        <div className="header-divider"></div>

        {/* User profile */}
        <div className="relative" ref={dropdownRef}>
          <button className="user-profile-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="header-avatar">JD</div>
            <div className="header-user-info">
              <span className="header-user-name">James D.</span>
              <span className="header-user-role">Admin</span>
            </div>
            <ChevronDown 
              size={14} 
              className="text-gray transition-all duration-200" 
              style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} 
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 glass-panel rounded-xl shadow-glow z-50 animate-fade-in border border-slate-700/50 overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-700/50 bg-gradient-to-r from-slate-800 to-slate-900 flex items-center gap-3">
                <div className="w-10 h-10 shrink-0 rounded-full bg-primary flex items-center justify-center text-slate-900 font-bold text-sm shadow-md">
                  JD
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">James D.</p>
                  <p className="text-xs text-slate-400 truncate">james.d@talentarch.com</p>
                </div>
              </div>
              
              <div className="p-2 space-y-1">
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg flex items-center gap-3 transition-all duration-200 group"
                  onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}
                >
                  <div className="p-1.5 rounded-md bg-slate-800 group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <User size={14} />
                  </div>
                  <span className="font-medium">My Profile</span>
                </button>
                
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg flex items-center gap-3 transition-all duration-200 group"
                  onClick={() => { setIsDropdownOpen(false); navigate('/settings'); }}
                >
                  <div className="p-1.5 rounded-md bg-slate-800 group-hover:bg-primary group-hover:text-slate-900 transition-colors">
                    <Settings size={14} />
                  </div>
                  <span className="font-medium">Account Settings</span>
                </button>
              </div>

              <div className="border-t border-slate-700/50"></div>
              
              <div className="p-2">
                <button 
                  className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors group"
                  onClick={() => { setIsDropdownOpen(false); navigate('/signup'); }}
                >
                  <div className="p-1.5 rounded-md bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                    <LogOut size={14} />
                  </div>
                  <span className="font-medium">Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
