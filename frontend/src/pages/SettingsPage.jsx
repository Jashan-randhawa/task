import React, { useState } from 'react';
import { User, Shield, Bell, Sliders, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';
import './SettingsPage.css';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="glass-panel p-6 animate-fade-in">
            <h3 className="settings-section-title">Public Profile</h3>
            
            <div className="avatar-upload">
              <div className="avatar-preview">
                <Camera size={24} />
              </div>
              <div className="avatar-actions">
                <button className="btn btn-secondary text-sm">Upload new picture</button>
                <div className="text-xs text-gray">JPG, GIF or PNG. Max size of 800K</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="input-group">
                <label className="input-label">First Name</label>
                <input type="text" className="input-field" defaultValue="Alex" />
              </div>
              <div className="input-group">
                <label className="input-label">Last Name</label>
                <input type="text" className="input-field" defaultValue="Rivera" />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Professional Title</label>
              <input type="text" className="input-field" defaultValue="Senior Event Architect" />
            </div>

            <div className="input-group">
              <label className="input-label">Bio <span>(Optional)</span></label>
              <textarea className="input-field h-32" style={{ resize: 'none' }} placeholder="Write a short bio about yourself..."></textarea>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button className="btn btn-ghost">Cancel</button>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="glass-panel p-6 animate-fade-in">
            <h3 className="settings-section-title">Security Settings</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-4 text-dark">Change Password</h4>
                <div className="input-group">
                  <label className="input-label">Current Password</label>
                  <input type="password" className="input-field" placeholder="••••••••" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="input-group">
                    <label className="input-label">New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Confirm New Password</label>
                    <input type="password" className="input-field" placeholder="••••••••" />
                  </div>
                </div>
                <button className="btn btn-secondary mt-2">Update Password</button>
              </div>

              <div className="border-t border-slate-800 pt-6 mt-6">
                <h4 className="text-sm font-medium mb-4 text-dark">Two-Factor Authentication</h4>
                <div className="setting-item bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <div className="setting-info flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h4 className="text-emerald-400 font-semibold flex items-center gap-2">
                        2FA is On <CheckCircle2 size={16} />
                      </h4>
                      <p>Your account is secured with a secondary authentication method.</p>
                    </div>
                  </div>
                  <button className="btn btn-secondary">Manage</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="glass-panel p-6 animate-fade-in">
            <h3 className="settings-section-title">Notification Preferences</h3>
            
            <div className="space-y-2">
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive updates about new talent applications directly in your inbox.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="setting-item">
                <div className="setting-info">
                  <h4>Push Notifications</h4>
                  <p>Get real-time alerts when a contract is signed.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Weekly Digest</h4>
                  <p>A weekly summary of your workspace activity and analytics.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Marketing Updates</h4>
                  <p>Receive news, feature announcements, and personalized offers.</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              <button className="btn btn-primary">Save Preferences</button>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="glass-panel p-6 animate-fade-in">
            <h3 className="settings-section-title">Workspace Preferences</h3>
            
            <div className="space-y-6">
              <div className="input-group">
                <label className="input-label">Language</label>
                <select className="input-field" defaultValue="en">
                  <option value="en">English (US)</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div className="input-group">
                <label className="input-label">Timezone</label>
                <select className="input-field" defaultValue="pst">
                  <option value="pst">Pacific Time (PT)</option>
                  <option value="est">Eastern Time (ET)</option>
                  <option value="utc">Coordinated Universal Time (UTC)</option>
                </select>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-header animate-fade-in">
        <h1>Settings & Preferences</h1>
        <p>Manage your account settings, preferences and security configurations.</p>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <button 
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button 
            className={`settings-tab ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} />
            <span>Security</span>
          </button>
          <button 
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} />
            <span>Notifications</span>
          </button>
          <button 
            className={`settings-tab ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
          >
            <Sliders size={18} />
            <span>Preferences</span>
          </button>
        </aside>

        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
