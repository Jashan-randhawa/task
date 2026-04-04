import React, { useState } from 'react';
import { Search, Filter, ShieldCheck, MapPin, Star, Bookmark } from 'lucide-react';
import './TalentPage.css';

export default function TalentPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const talents = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Solutions Architect',
      type: 'speaker',
      location: 'New York, NY',
      rate: '$250/hr',
      rating: 4.9,
      reviews: 124,
      verified: true,
      skills: ['Keynotes', 'Technical Panels', 'Systems Design'],
      image: 'SC'
    },
    {
      id: 2,
      name: 'Marcus Thorne',
      role: 'Technical Audio Engineer',
      type: 'crew',
      location: 'Global (Remote/Travel)',
      rate: '$120/hr',
      rating: 4.8,
      reviews: 86,
      verified: true,
      skills: ['Live Mixing', 'Acoustics', 'Equipment Setup'],
      image: 'MT'
    },
    {
      id: 3,
      name: 'The Synthetics',
      role: 'Live Electronic Band',
      type: 'performer',
      location: 'Los Angeles, CA',
      rate: '$4,000/gig',
      rating: 5.0,
      reviews: 42,
      verified: true,
      skills: ['Corporate Galas', 'Tech Afterparties', 'Original Scores'],
      image: 'TS',
      bgColor: '#fae8ff',
      textColor: '#9333ea'
    },
    {
      id: 4,
      name: 'Elena Rodriguez',
      role: 'Event Director',
      type: 'crew',
      location: 'Miami, FL',
      rate: '$180/hr',
      rating: 4.9,
      reviews: 215,
      verified: true,
      skills: ['End-to-End Logistics', 'Vendor Mgmt', 'VIPs'],
      image: 'ER'
    },
    {
      id: 5,
      name: 'DJ Nova',
      role: 'Atmosphere Curator',
      type: 'performer',
      location: 'Chicago, IL',
      rate: '$150/hr',
      rating: 4.7,
      reviews: 64,
      verified: false,
      skills: ['Deep House', 'Lounge Sets', 'Custom Playlists'],
      image: 'DN'
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'Motivational Speaker',
      type: 'speaker',
      location: 'Austin, TX',
      rate: '$500/hr',
      rating: 4.9,
      reviews: 180,
      verified: true,
      skills: ['Leadership', 'Team Building', 'Growth Mindset'],
      image: 'JW'
    }
  ];

  const filteredTalents = talents.filter(t => {
    if (activeFilter === 'all') return true;
    return t.type === activeFilter;
  });

  return (
    <div className="talent-layout animate-fade-in">
      <div className="talent-header">
        <h1 className="text-3xl font-bold text-dark mb-2">Elite Talent Network</h1>
        <p className="text-gray mb-8">Discover, filter, and connect with highly vetted professionals for your next event.</p>
        
        <div className="talent-controls flex justify-between items-center mb-8">
          <div className="search-bar flex-1 max-w-md flex items-center">
            <Search size={16} className="text-gray ml-4" />
            <input type="text" placeholder="Search by name, role, or skill..." className="search-input w-full" />
          </div>

          <div className="flex gap-4">
            <div className="filters-group p-1 flex gap-1">
              <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Roles</button>
              <button className={`filter-btn ${activeFilter === 'speaker' ? 'active' : ''}`} onClick={() => setActiveFilter('speaker')}>Speakers</button>
              <button className={`filter-btn ${activeFilter === 'performer' ? 'active' : ''}`} onClick={() => setActiveFilter('performer')}>Performers</button>
              <button className={`filter-btn ${activeFilter === 'crew' ? 'active' : ''}`} onClick={() => setActiveFilter('crew')}>Crew</button>
            </div>
            <button className="btn btn-secondary"><Filter size={16} /> More Filters</button>
          </div>
        </div>
      </div>

      <div className="talent-grid">
        {filteredTalents.map(talent => (
          <div key={talent.id} className="talent-card card p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div 
                className="talent-avatar text-xl font-bold flex items-center justify-center shrink-0" 
                style={{ backgroundColor: talent.bgColor || '#1e293b', color: talent.textColor || 'white' }}
              >
                {talent.image}
              </div>
              <button className="icon-btn text-gray hover:text-dark shrink-0"><Bookmark size={20} /></button>
            </div>
            
            <div className="talent-info mb-4">
               <h2 className="text-xl font-bold flex items-center gap-2">
                 {talent.name}
                 {talent.verified && <ShieldCheck size={18} className="text-primary fill-blue-50" />}
               </h2>
               <p className="text-primary font-semibold text-sm mt-1">{talent.role}</p>
            </div>
            
            <div className="flex flex-col gap-2 mb-6 text-sm text-gray flex-1">
               <div className="flex items-center gap-2"><MapPin size={16}/> {talent.location}</div>
               <div className="flex items-center gap-2"><Star size={16} className="text-yellow-500 fill-yellow-500"/> <span className="font-bold text-dark">{talent.rating}</span> ({talent.reviews} reviews)</div>
            </div>

            <div className="skills-wrap mb-6 flex flex-wrap gap-2">
               {talent.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
               ))}
            </div>
            
            <div className="card-footer border-t pt-4 mt-auto flex justify-between items-center">
              <div className="font-bold text-lg">{talent.rate}</div>
              <button className="btn btn-primary px-6">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
