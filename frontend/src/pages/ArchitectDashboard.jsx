import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, Users, Plus, TrendingUp, MoreHorizontal, ArrowUpRight, Zap, Clock, CheckCircle2, Circle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const miniSparkline = (data, color) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default function ArchitectDashboard() {
  const navigate = useNavigate();
  const [chartFilter, setChartFilter] = useState('7D');
  const [pulse, setPulse] = useState(false);
  const [animatedBars, setAnimatedBars] = useState(false);

  const chartSets = {
    '7D': [40, 62, 55, 100, 48, 72, 58],
    '30D': [55, 70, 45, 88, 62, 95, 80],
    '90D': [30, 55, 70, 60, 85, 78, 92],
  };

  useEffect(() => {
    const t = setTimeout(() => setAnimatedBars(true), 100);
    const iv = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 4000);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  const bars = chartSets[chartFilter];
  const days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

  const stats = [
    {
      label: 'Active Postings',
      value: '24',
      change: '+12%',
      up: true,
      icon: Briefcase,
      color: '#60a5fa',
      bg: 'rgba(96,165,250,0.1)',
      border: 'rgba(96,165,250,0.2)',
      spark: [18,22,19,24,21,23,24],
    },
    {
      label: 'Applications',
      value: '148',
      change: '+31',
      up: true,
      icon: FileText,
      color: '#a855f7',
      bg: 'rgba(168,85,247,0.1)',
      border: 'rgba(168,85,247,0.2)',
      spark: [80,110,95,130,118,140,148],
    },
    {
      label: 'Talent Reach',
      value: '12.4k',
      change: 'TOP 5%',
      up: true,
      icon: Users,
      color: '#2dd4bf',
      bg: 'rgba(45,212,191,0.1)',
      border: 'rgba(45,212,191,0.2)',
      spark: [9000,10200,9800,11000,11500,12000,12400],
    },
  ];

  const activity = [
    { avatar: 'SC', color: '#fb923c', name: 'Sarah Chen', action: 'applied for', highlight: 'Sr. Solutions Architect', time: '2m ago', status: 'new' },
    { avatar: '✓', color: '#10b981', icon: CheckCircle2, name: 'Requirement Fulfilled', action: 'Mobile Lead Engineer closed', time: '1h ago', status: 'done' },
    { avatar: 'MT', color: '#a855f7', name: 'Marcus Thorne', action: 'shortlisted for', highlight: 'Audio Engineer', time: '3h ago', status: 'review' },
    { avatar: 'ER', color: '#60a5fa', name: 'Elena Rodriguez', action: 'viewed your posting', time: '5h ago', status: 'view' },
  ];

  return (
    <div className="dashboard-main animate-fade-in">
      {/* Page header */}
      <header className="page-header">
        <div className="page-header-left">
          <div className="page-title-row">
            <h1 className="page-title">Architect's View</h1>
            <span className="live-badge">
              <span className="live-dot"></span>
              LIVE
            </span>
          </div>
          <p className="page-subtitle">Real-time telemetry of your elite talent pipeline.</p>
        </div>
        <div className="page-header-actions">
          <button className="btn glass-btn">
            <TrendingUp size={15} /> Report
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/create-event/step1')}>
            <Plus size={15} /> New Event
          </button>
        </div>
      </header>

      {/* Stats row */}
      <div className="stats-row">
        {stats.map((s, i) => (
          <div key={i} className="stat-tile" style={{ '--tile-color': s.color, '--tile-bg': s.bg, '--tile-border': s.border }}>
            <div className="stat-tile-top">
              <div className="stat-tile-icon" style={{ background: s.bg, border: `1px solid ${s.border}` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
              <div className="stat-tile-spark">
                {miniSparkline(s.spark, s.color)}
              </div>
            </div>
            <div className="stat-tile-value">{s.value}</div>
            <div className="stat-tile-bottom">
              <span className="stat-tile-label">{s.label}</span>
              <span className="stat-tile-change" style={{ color: s.up ? '#10b981' : '#f87171' }}>
                {s.up ? <TrendingUp size={11} /> : null}
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="dash-grid">
        {/* Chart card */}
        <div className="chart-card card">
          <div className="chart-card-header">
            <div>
              <h3 className="chart-title">Application Inflow
                {pulse && <span className="pulse-dot"></span>}
              </h3>
              <p className="chart-subtitle">Incoming application trajectory</p>
            </div>
            <div className="chart-filters">
              {['7D','30D','90D'].map(f => (
                <button
                  key={f}
                  className={`chart-filter-btn ${chartFilter === f ? 'active' : ''}`}
                  onClick={() => { setChartFilter(f); setAnimatedBars(false); setTimeout(() => setAnimatedBars(true), 50); }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="chart-area">
            <div className="chart-y-labels">
              {['100','75','50','25','0'].map(v => <span key={v}>{v}</span>)}
            </div>
            <div className="chart-bars-wrap">
              <div className="chart-gridlines">
                {[0,25,50,75,100].map(v => <div key={v} className="gridline" style={{ bottom: `${v}%` }} />)}
              </div>
              <div className="chart-bars">
                {bars.map((h, i) => (
                  <div key={`${chartFilter}-${i}`} className="bar-group">
                    <div className="bar-hover-zone">
                      <div className="bar-tooltip-mini">{h} apps</div>
                      <div
                        className={`bar-visual ${i === bars.indexOf(Math.max(...bars)) ? 'bar-peak' : ''}`}
                        style={{ height: animatedBars ? `${h}%` : '0%' }}
                      />
                    </div>
                    <span className="bar-day">{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="dash-right-col">
          {/* AI Insight */}
          <div className="insight-card card">
            <div className="insight-glow-orb"></div>
            <div className="insight-header">
              <div className="insight-icon"><Zap size={16} /></div>
              <span className="insight-label">AI Insight</span>
            </div>
            <p className="insight-body">
              Booking <strong>Technical Crew</strong> 14+ days early cut your hourly spend by{' '}
              <span className="insight-highlight">18% in Q4.</span>
            </p>
            <button className="insight-cta">View full analysis <ArrowUpRight size={13} /></button>
          </div>

          {/* Talent distribution */}
          <div className="card p-6">
            <h3 className="section-heading mb-5">Talent Distribution</h3>
            <div className="dist-list">
              {[
                { label: 'Engineering', pct: 65, color: 'var(--primary)' },
                { label: 'Product', pct: 25, color: '#a855f7' },
                { label: 'Design', pct: 10, color: '#38bdf8' },
              ].map(({ label, pct, color }) => (
                <div key={label} className="dist-item">
                  <div className="dist-item-header">
                    <span className="dist-label">{label}</span>
                    <span className="dist-pct" style={{ color }}>{pct}%</span>
                  </div>
                  <div className="dist-track">
                    <div className="dist-fill" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="card p-5">
            <h3 className="section-heading mb-4">Quick Actions</h3>
            <div className="quick-actions">
              <button className="quick-action-btn" onClick={() => navigate('/create-event/step1')}>
                <div className="qa-icon"><Plus size={16} /></div>
                <span>Post Requirement</span>
                <ArrowUpRight size={14} className="qa-arrow" />
              </button>
              <button className="quick-action-btn" onClick={() => navigate('/talent')}>
                <div className="qa-icon"><Users size={16} /></div>
                <span>Browse Talent</span>
                <ArrowUpRight size={14} className="qa-arrow" />
              </button>
            </div>
          </div>
        </div>

        {/* Activity feed */}
        <div className="activity-card card p-6">
          <div className="activity-header">
            <h3 className="section-heading">Live Activity</h3>
            <button className="activity-more"><MoreHorizontal size={18} /></button>
          </div>
          <div className="activity-feed">
            {activity.map((item, i) => (
              <div key={i} className="activity-item">
                <div className="activity-avatar" style={{ background: item.color + '22', border: `1px solid ${item.color}44`, color: item.color }}>
                  {item.avatar}
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    <strong>{item.name}</strong>
                    {item.action && ` ${item.action} `}
                    {item.highlight && <span className="activity-highlight">{item.highlight}</span>}
                  </p>
                  <div className="activity-meta">
                    <Clock size={11} />
                    <span>{item.time}</span>
                  </div>
                </div>
                <div className={`activity-status status-${item.status}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
