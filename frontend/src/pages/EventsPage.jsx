import React, { useState } from 'react';
import { Calendar, MapPin, Users, MoreVertical, Plus, Search, Filter, Briefcase, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './EventsPage.css';

const events = [
  { id:1, title:'Global Fintech Summit 2024', date:'Oct 12–15, 2024', location:'Moscone Center, SF', status:'upcoming', talentFilled:4, talentTotal:5, budget:'$4,500–$6,000', type:'Corporate Conference', lastActive:'2h ago' },
  { id:2, title:'Neon Nights Music Festival', date:'Nov 05–07, 2024', location:'Desert Valley, NV', status:'upcoming', talentFilled:12, talentTotal:20, budget:'$25,000+', type:'Music Festival', lastActive:'1d ago' },
  { id:3, title:'Q4 Leadership Offsite', date:'Dec 01–03, 2024', location:'Aspen, CO', status:'draft', talentFilled:0, talentTotal:2, budget:'TBD', type:'Private Retreat', lastActive:'1w ago' },
  { id:4, title:'Product Launch Gala 2024', date:'Sep 28, 2024', location:'The Standard, NYC', status:'completed', talentFilled:8, talentTotal:8, budget:'$18,000', type:'Private Gala', lastActive:'2w ago' },
];

const STATUS_META = {
  upcoming: { color: '#2dd4bf', bg: 'rgba(45,212,191,0.1)', border: 'rgba(45,212,191,0.2)', label: 'Upcoming' },
  draft:    { color: '#8b99b0', bg: 'rgba(139,153,176,0.08)', border: 'rgba(139,153,176,0.15)', label: 'Draft' },
  completed:{ color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', label: 'Completed' },
};

export default function EventsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = events.filter(e => {
    const matchTab = activeTab === 'all' || e.status === activeTab;
    const matchQuery = !query || e.title.toLowerCase().includes(query.toLowerCase());
    return matchTab && matchQuery;
  });

  return (
    <div className="events-layout animate-fade-in">
      <div className="events-page-header">
        <div>
          <h1 className="page-heading">Event Portfolio</h1>
          <p className="page-subheading">Manage your premium event lifecycle and talent deployments.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create-event/step1')}>
          <Plus size={16} /> New Event
        </button>
      </div>

      <div className="events-toolbar">
        <div className="events-tabs">
          {['all','upcoming','draft','completed'].map(tab => (
            <button
              key={tab}
              className={`events-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'all' ? 'All Events' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="tab-count">
                {tab === 'all' ? events.length : events.filter(e => e.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        <div className="events-search">
          <Search size={15} className="events-search-icon" />
          <input
            type="text"
            placeholder="Search events..."
            className="events-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <button className="btn btn-secondary">
          <Filter size={15} /> Filter
        </button>
      </div>

      <div className="events-grid">
        {filtered.map(event => {
          const meta = STATUS_META[event.status];
          const fillPct = (event.talentFilled / event.talentTotal) * 100;
          return (
            <div key={event.id} className="event-card card">
              <div className="event-card-head">
                <span className="status-chip" style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}>
                  {meta.label}
                </span>
                <button className="event-more-btn"><MoreVertical size={17} /></button>
              </div>

              <div className="event-card-body">
                <p className="event-type">{event.type}</p>
                <h2 className="event-title">{event.title}</h2>

                <div className="event-details">
                  <div className="event-detail-item">
                    <Calendar size={14} style={{ color: meta.color }} />
                    <span>{event.date}</span>
                  </div>
                  <div className="event-detail-item">
                    <MapPin size={14} style={{ color: meta.color }} />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="event-budget-row">
                  <div className="event-budget-label">
                    <Briefcase size={13} />
                    Budget
                  </div>
                  <span className="event-budget-value">{event.budget}</span>
                </div>

                <div className="talent-fill-section">
                  <div className="talent-fill-header">
                    <div className="talent-fill-label">
                      <Users size={13} />
                      Talent filled
                    </div>
                    <span className="talent-fill-count">
                      {event.talentFilled}<span>/{event.talentTotal}</span>
                    </span>
                  </div>
                  <div className="talent-fill-track">
                    <div
                      className="talent-fill-bar"
                      style={{
                        width: `${fillPct}%`,
                        background: fillPct === 100 ? '#10b981' : meta.color,
                        boxShadow: `0 0 8px ${fillPct === 100 ? 'rgba(16,185,129,0.4)' : meta.color + '44'}`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="event-card-footer">
                <span className="event-last-active">Active {event.lastActive}</span>
                <button
                  className="event-view-btn"
                  onClick={() => navigate('/create-event/step4')}
                >
                  View Details <ArrowUpRight size={13} />
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="events-empty">
            <Calendar size={40} />
            <h3>No events found</h3>
            <p>No events match this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
