import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, MapPin, Star, Bookmark, ArrowUpRight } from 'lucide-react';
import './TalentPage.css';

const talents = [
  { id:1, name:'Sarah Chen', role:'Sr. Solutions Architect', type:'speaker', location:'New York, NY', rate:'$250/hr', rating:4.9, reviews:124, verified:true, skills:['Keynotes','Technical Panels','Systems Design'], initials:'SC', hue:'30' },
  { id:2, name:'Marcus Thorne', role:'Technical Audio Engineer', type:'crew', location:'Global (Remote)', rate:'$120/hr', rating:4.8, reviews:86, verified:true, skills:['Live Mixing','Acoustics','Setup'], initials:'MT', hue:'270' },
  { id:3, name:'The Synthetics', role:'Live Electronic Band', type:'performer', location:'Los Angeles, CA', rate:'$4,000/gig', rating:5.0, reviews:42, verified:true, skills:['Corporate Galas','Afterparties','Original Scores'], initials:'TS', hue:'290' },
  { id:4, name:'Elena Rodriguez', role:'Event Director', type:'crew', location:'Miami, FL', rate:'$180/hr', rating:4.9, reviews:215, verified:true, skills:['End-to-End Logistics','Vendor Mgmt','VIPs'], initials:'ER', hue:'210' },
  { id:5, name:'DJ Nova', role:'Atmosphere Curator', type:'performer', location:'Chicago, IL', rate:'$150/hr', rating:4.7, reviews:64, verified:false, skills:['Deep House','Lounge Sets','Custom Playlists'], initials:'DN', hue:'330' },
  { id:6, name:'James Wilson', role:'Motivational Speaker', type:'speaker', location:'Austin, TX', rate:'$500/hr', rating:4.9, reviews:180, verified:true, skills:['Leadership','Team Building','Growth Mindset'], initials:'JW', hue:'160' },
];

const TYPE_COLORS = { speaker: '#2dd4bf', performer: '#a855f7', crew: '#60a5fa' };

export default function TalentPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [bookmarked, setBookmarked] = useState(new Set());

  const filtered = talents.filter(t => {
    const matchFilter = activeFilter === 'all' || t.type === activeFilter;
    const matchQuery = !query || t.name.toLowerCase().includes(query.toLowerCase()) || t.role.toLowerCase().includes(query.toLowerCase());
    return matchFilter && matchQuery;
  });

  return (
    <div className="talent-layout animate-fade-in">
      <div className="talent-page-header">
        <div>
          <h1 className="page-heading">Elite Talent Network</h1>
          <p className="page-subheading">Discover and connect with vetted professionals for your next event.</p>
        </div>
        <div className="talent-header-stats">
          <div className="talent-stat-pill"><span>{talents.length}</span> Verified</div>
          <div className="talent-stat-pill accent"><span>98%</span> Response Rate</div>
        </div>
      </div>

      <div className="talent-toolbar">
        <div className="talent-search">
          <Search size={16} className="talent-search-icon" />
          <input
            type="text"
            placeholder="Search by name, role, or skill..."
            className="talent-search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="talent-filters">
          {['all','speaker','performer','crew'].map(f => (
            <button
              key={f}
              className={`talent-filter-btn ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              style={activeFilter === f && f !== 'all' ? { '--filter-color': TYPE_COLORS[f] } : {}}
            >
              {f === 'all' ? 'All Roles' : f.charAt(0).toUpperCase() + f.slice(1) + 's'}
            </button>
          ))}
        </div>

        <button className="btn btn-secondary">
          <Filter size={15} /> More Filters
        </button>
      </div>

      <div className="talent-grid">
        {filtered.map(t => (
          <div key={t.id} className="talent-card card">
            <div className="talent-card-top">
              <div
                className="talent-initials"
                style={{
                  background: `hsl(${t.hue} 60% 20%)`,
                  color: `hsl(${t.hue} 80% 70%)`,
                  border: `1px solid hsl(${t.hue} 60% 30%)`,
                }}
              >
                {t.initials}
              </div>
              <div className="talent-card-actions">
                <span
                  className={`type-chip`}
                  style={{ background: TYPE_COLORS[t.type] + '18', color: TYPE_COLORS[t.type], border: `1px solid ${TYPE_COLORS[t.type]}33` }}
                >
                  {t.type}
                </span>
                <button
                  className={`bookmark-btn ${bookmarked.has(t.id) ? 'saved' : ''}`}
                  onClick={() => setBookmarked(prev => { const n = new Set(prev); n.has(t.id) ? n.delete(t.id) : n.add(t.id); return n; })}
                >
                  <Bookmark size={16} fill={bookmarked.has(t.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            <div className="talent-name-row">
              <h2 className="talent-name">{t.name}</h2>
              {t.verified && <ShieldCheck size={16} className="verified-icon" />}
            </div>
            <p className="talent-role">{t.role}</p>

            <div className="talent-meta">
              <span className="talent-meta-item"><MapPin size={13} />{t.location}</span>
              <span className="talent-meta-item">
                <Star size={13} className="star-icon" />
                <strong>{t.rating}</strong>
                <span className="review-count">({t.reviews})</span>
              </span>
            </div>

            <div className="skill-tags">
              {t.skills.map((s,i) => <span key={i} className="skill-tag">{s}</span>)}
            </div>

            <div className="talent-card-footer">
              <span className="talent-rate">{t.rate}</span>
              <button className="btn btn-primary talent-cta">
                View Profile <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="talent-empty">
            <div className="empty-icon">👤</div>
            <h3>No talent found</h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
