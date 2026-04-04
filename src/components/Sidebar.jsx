import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, FileText, Users, FileCheck, CircleDollarSign, Plus, Settings, LogOut, ChevronRight, HelpCircle } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/signup') return null;

  return (
    <aside className="global-sidebar">
      <div className="sidebar-header">
        <div className="flex items-center gap-2">
          <div className="logo-orb"></div>
          <span className="font-bold text-lg tracking-tight">TalentArch</span>
        </div>
        <div className="workspace-selector mt-4">
          <div className="flex justify-between items-center text-sm">
            <span className="w-name">EventScale Pro</span>
            <ChevronRight size={14} className="text-gray" />
          </div>
          <div className="w-tier">Enterprise</div>
        </div>
      </div>
      
      <div className="sidebar-content">
        <button className="new-action-btn" onClick={() => navigate('/create-event/step1')}>
           <Plus size={16} />
           <span>New Action</span>
        </button>

        <nav className="nav-group">
          <div className="nav-label">MAIN</div>
          <NavLink to="/dashboard" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Briefcase size={18} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/events" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={18} /> <span>Job Postings</span>
          </NavLink>
          <NavLink to="/talent" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={18} /> <span>Talent Pool</span>
          </NavLink>
          <NavLink to="/analytics" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <CircleDollarSign size={18} /> <span>Analytics</span>
          </NavLink>
        </nav>

        <nav className="nav-group mt-6">
          <div className="nav-label">SYSTEM</div>
          <a href="#" className="nav-item">
            <Settings size={18} /> <span>Settings</span>
          </a>
          <a href="#" className="nav-item">
            <FileCheck size={18} /> <span>Contracts</span>
          </a>
        </nav>
      </div>

      <div className="sidebar-footer">
        <a href="#" className="nav-item">
          <HelpCircle size={18} /> <span>Help & Support</span>
        </a>
        <button onClick={() => navigate('/signup')} className="nav-item mt-1 w-full flex text-left text-gray hover:text-red-400 hover:bg-red-500/10">
          <LogOut size={18} /> <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
