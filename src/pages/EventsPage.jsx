import React, { useState } from 'react';
import { Calendar, MapPin, Users, MoreVertical, Plus, Search, Filter, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './EventsPage.css';

export default function EventsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');

  const events = [
    {
      id: 1,
      title: 'Global Fintech Summit 2024',
      date: 'Oct 12 - Oct 15, 2024',
      location: 'Moscone Center, SF',
      status: 'upcoming',
      talentFilled: 4,
      talentTotal: 5,
      budget: '$4,500 - $6,000',
      type: 'Corporate Conference',
      lastActive: '2h ago'
    },
    {
      id: 2,
      title: 'Neon Nights Music Festival',
      date: 'Nov 05 - Nov 07, 2024',
      location: 'Desert Valley, NV',
      status: 'upcoming',
      talentFilled: 12,
      talentTotal: 20,
      budget: '$25,000+',
      type: 'Music Festival',
      lastActive: '1d ago'
    },
    {
      id: 3,
      title: 'Q4 Leadership Offsite',
      date: 'Dec 01 - Dec 03, 2024',
      location: 'Aspen, CO',
      status: 'draft',
      talentFilled: 0,
      talentTotal: 2,
      budget: 'TBD',
      type: 'Private Retreat',
      lastActive: '1w ago'
    }
  ];

  const filteredEvents = events.filter(e => {
    if (activeTab === 'all') return true;
    return e.status === activeTab;
  });

  return (
    <div className="events-layout animate-fade-in">
      <div className="events-header">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark mb-2">Events Summary</h1>
            <p className="text-gray">Manage and track your premium event lifecycle and talent deployments.</p>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/create-event/step1')}>
            <Plus size={18} /> New Event
          </button>
        </div>

        <div className="events-controls flex justify-between items-center mb-6">
          <div className="tabs flex gap-2">
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Events</button>
            <button className={`tab-btn ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming</button>
            <button className={`tab-btn ${activeTab === 'draft' ? 'active' : ''}`} onClick={() => setActiveTab('draft')}>Drafts</button>
            <button className={`tab-btn ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Completed</button>
          </div>

          <div className="flex gap-4">
            <div className="search-bar flex items-center">
              <Search size={16} className="text-gray ml-3" />
              <input type="text" placeholder="Search events..." className="search-input" />
            </div>
            <button className="btn btn-secondary"><Filter size={16} /> Filter</button>
          </div>
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card card">
            <div className="event-card-header p-6 pb-4 border-b">
              <div className="flex justify-between items-start mb-4">
                <div className={`status-pill ${event.status}`}>{event.status.toUpperCase()}</div>
                <button className="icon-btn text-gray hover:text-dark"><MoreVertical size={20} /></button>
              </div>
              <h2 className="text-xl font-bold mb-2 cursor-pointer hover:text-primary transition-colors">{event.title}</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center text-sm text-gray gap-2">
                  <Calendar size={16} className="text-primary" /> {event.date}
                </div>
                <div className="flex items-center text-sm text-gray gap-2">
                  <MapPin size={16} className="text-primary" /> {event.location}
                </div>
              </div>
            </div>
            
            <div className="event-card-body p-6">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray flex items-center gap-1"><Briefcase size={14}/> {event.type}</span>
                <span className="font-semibold">{event.budget}</span>
              </div>
              
              <div className="talent-progress">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-gray">TALENT FILLED</span>
                  <span className="font-bold">{event.talentFilled} / {event.talentTotal}</span>
                </div>
                <div className="progress-bar mb-1">
                  <div 
                    className={`progress ${event.talentFilled === event.talentTotal ? 'fill-success' : 'fill-primary'}`} 
                    style={{ width: `${(event.talentFilled / event.talentTotal) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="event-card-footer p-4 flex justify-between items-center text-xs text-gray border-t">
               <span>Last active {event.lastActive}</span>
               <button className="font-semibold text-primary hover:underline" onClick={() => navigate(`/create-event/step4`)}>View Details</button>
            </div>
          </div>
        ))}
        
        {filteredEvents.length === 0 && (
           <div className="col-span-full py-16 flex flex-col items-center justify-center text-gray border-2 border-dashed rounded-xl">
              <Calendar size={48} className="mb-4 opacity-50" />
              <h3 className="text-lg font-bold">No Events Found</h3>
              <p>There are no events matching this criteria.</p>
           </div>
        )}
      </div>
    </div>
  );
}
