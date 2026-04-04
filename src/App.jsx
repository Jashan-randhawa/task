import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
            <Route path="/dashboard" element={<ArchitectDashboard />} />
            <Route path="/talent" element={<TalentPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/create-event/*" element={<CreateEvent />} />
            <Route path="/success" element={<SuccessPage />} />
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
    </BrowserRouter>
  );
}

export default App;
