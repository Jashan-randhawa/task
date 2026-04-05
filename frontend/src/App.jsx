import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ArchitectDashboard from './pages/ArchitectDashboard';
import CreateEvent from './pages/CreateEvent';
import SuccessPage from './pages/SuccessPage';
import EventsPage from './pages/EventsPage';
import TalentPage from './pages/TalentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SettingsPage from './pages/SettingsPage';
import ContractsPage from './pages/ContractsPage';

function AppContent() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen overflow-hidden relative">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/signup" replace />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/dashboard" element={<ArchitectDashboard />} />
            <Route path="/talent" element={<TalentPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/create-event/*" element={<CreateEvent />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/contracts" element={<ContractsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
