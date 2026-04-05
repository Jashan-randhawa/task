import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Briefcase, FileText, Users, FileCheck, CircleDollarSign, Plus, Settings, LogOut, ChevronRight, HelpCircle } from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/signup' || location.pathname === '/signin') return null;

  return (
    <aside className="global-sidebar">
      <div className="sidebar-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div className="logo-orb"></div>
          <span className="sidebar-brand">TalentArch</span>
        </div>
        <div className="workspace-selector">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="w-name">EventScale Pro</span>
            <ChevronRight size={13} style={{ color: 'var(--text-light)' }} />
          </div>
          <div className="w-tier">Enterprise</div>
        </div>
      </div>

      <div className="sidebar-content">
        <button className="new-action-btn" onClick={() => navigate('/create-event/step1')}>
          <Plus size={15} />
          <span>New Action</span>
        </button>

        <nav className="nav-group" style={{ marginBottom: '1.5rem' }}>
          <div className="nav-section-label">Main</div>
          <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Briefcase size={17} /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/events" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileText size={17} /> <span>Job Postings</span>
          </NavLink>
          <NavLink to="/talent" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={17} /> <span>Talent Pool</span>
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <CircleDollarSign size={17} /> <span>Analytics</span>
          </NavLink>
        </nav>

        <nav className="nav-group">
          <div className="nav-section-label">System</div>
          <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Settings size={17} /> <span>Settings</span>
          </NavLink>
          <NavLink to="/contracts" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <FileCheck size={17} /> <span>Contracts</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <a href="#" className="nav-item">
          <HelpCircle size={17} /> <span>Help & Support</span>
        </a>
        <button
          className="nav-item-logout"
          onClick={() => navigate('/signup')}
        >
          <LogOut size={17} /> <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
