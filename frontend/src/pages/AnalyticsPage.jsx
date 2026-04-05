import React, { useState } from 'react';
import { TrendingUp, Clock, DollarSign, Target, Award, Download, Calendar as CalendarIcon } from 'lucide-react';
import './AnalyticsPage.css';

const chartData = [
  { week: 'W1', volume: 40, cost: 55 },
  { week: 'W2', volume: 60, cost: 48 },
  { week: 'W3', volume: 45, cost: 62 },
  { week: 'W4', volume: 80, cost: 40 },
  { week: 'W5', volume: 50, cost: 70 },
  { week: 'W6', volume: 90, cost: 35 },
  { week: 'W7', volume: 75, cost: 52 },
];

const CHART_H = 220;
const BAR_W = 32;

export default function AnalyticsPage() {
  const [hovered, setHovered] = useState(null);

  // Build the SVG polyline for the cost trend
  const pts = chartData.map((d, i) => {
    const totalWidth = 7 * (BAR_W + 24); // approx spacing
    const x = i * (totalWidth / 6);
    const y = CHART_H - (d.cost / 100) * CHART_H;
    return { x, y };
  });

  return (
    <div className="analytics-layout animate-fade-in">
      <div className="analytics-header">
        <div>
          <h1 className="text-3xl font-bold text-dark mb-2">Performance Analytics</h1>
          <p className="text-gray">Analyze engagement, sourcing velocity, and expenditure across your event portfolio.</p>
        </div>
        <div className="flex gap-4">
          <button className="btn btn-secondary">
            <CalendarIcon size={16} /> Last 30 Days
          </button>
          <button className="btn btn-primary">
            <Download size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="stats-grid mb-8">
        <div className="card stat-card">
          <div className="stat-icon-wrapper green">
            <Target size={20} color="#10b981" />
          </div>
          <p className="text-gray text-sm mt-4">Fulfillment Rate</p>
          <h2 className="text-3xl font-bold mb-1">94.2%</h2>
          <p className="analytics-trend success">
            <TrendingUp size={12} /> +2.4% vs last month
          </p>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper blue">
            <Clock size={20} color="#60a5fa" />
          </div>
          <p className="text-gray text-sm mt-4">Avg. Time-to-Hire</p>
          <h2 className="text-3xl font-bold mb-1">42m</h2>
          <p className="analytics-trend success">
            <TrendingUp size={12} /> -15% vs industry avg
          </p>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper purple">
            <DollarSign size={20} color="#a855f7" />
          </div>
          <p className="text-gray text-sm mt-4">Total Expenditure</p>
          <h2 className="text-3xl font-bold mb-1">$124.5k</h2>
          <p className="analytics-trend neutral">Allocated across 14 events</p>
        </div>

        <div className="card stat-card">
          <div className="stat-icon-wrapper orange">
            <Award size={20} color="#f97316" />
          </div>
          <p className="text-gray text-sm mt-4">Top Rated Talent</p>
          <h2 className="text-3xl font-bold mb-1">4.9/5.0</h2>
          <p className="analytics-trend neutral">Avg rating from your events</p>
        </div>
      </div>

      <div className="content-grid">
        <div className="main-col">
          <div className="card p-6" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-bold text-lg">Sourcing Volume & Cost Trend</h3>
                <p className="text-sm text-gray" style={{ marginTop: '0.25rem' }}>Talent hired per week vs average hourly rate</p>
              </div>
              <div className="chart-legend flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="legend-dot" style={{ background: 'var(--primary)' }}></span>
                  <span>Volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="legend-dot" style={{ background: '#a855f7' }}></span>
                  <span>Cost Trend</span>
                </div>
              </div>
            </div>

            <div className="analytics-chart-wrap">
              {/* Y-axis labels */}
              <div className="chart-y-axis">
                {[100, 75, 50, 25, 0].map(v => (
                  <span key={v}>{v}</span>
                ))}
              </div>

              {/* Chart body */}
              <div className="chart-body">
                {/* Grid lines */}
                <div className="chart-grid">
                  {[0, 25, 50, 75, 100].map(v => (
                    <div key={v} className="grid-line" style={{ bottom: `${v}%` }} />
                  ))}
                </div>

                {/* SVG trend line */}
                <svg className="trend-svg" preserveAspectRatio="none" viewBox={`0 0 600 ${CHART_H}`}>
                  <defs>
                    <linearGradient id="trendGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points={chartData.map((d, i) => {
                      const x = (i / (chartData.length - 1)) * 600;
                      const y = CHART_H - (d.cost / 100) * CHART_H;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="url(#trendGrad)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {chartData.map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 600;
                    const y = CHART_H - (d.cost / 100) * CHART_H;
                    return (
                      <circle key={i} cx={x} cy={y} r="4" fill="#a855f7" stroke="var(--surface)" strokeWidth="2" />
                    );
                  })}
                </svg>

                {/* Bars */}
                <div className="bars-row">
                  {chartData.map((d, i) => (
                    <div
                      key={i}
                      className="bar-col"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      {hovered === i && (
                        <div className="bar-tooltip">
                          <div className="tooltip-row"><span>Volume</span><strong>{d.volume}</strong></div>
                          <div className="tooltip-row"><span>Cost</span><strong>${d.cost}/hr</strong></div>
                        </div>
                      )}
                      <div
                        className="bar-fill"
                        style={{
                          height: `${d.volume}%`,
                          opacity: hovered === i ? 0.7 : 0.25,
                          background: hovered === i
                            ? 'linear-gradient(to top, var(--primary), rgba(45,212,191,0.6))'
                            : 'linear-gradient(to top, var(--primary), rgba(45,212,191,0.4))',
                        }}
                      />
                      <span className="bar-label">{d.week}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="side-col" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card p-6">
            <h3 className="font-bold text-lg mb-4">Budget Distribution</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { label: 'Technical Crew', pct: 45, color: '#60a5fa' },
                { label: 'Performers', pct: 35, color: '#a855f7' },
                { label: 'Event Planners', pct: 20, color: '#fb923c' },
              ].map(({ label, pct, color }) => (
                <div key={label} className="distribution-item">
                  <div className="dist-header">
                    <span className="text-sm font-bold flex items-center gap-2">
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }}></span>
                      {label}
                    </span>
                    <span className="text-sm font-bold">{pct}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 insight-card">
            <div className="insight-glow"></div>
            <h3 className="font-bold text-lg mb-2" style={{ position: 'relative', zIndex: 1 }}>Optimization Insight</h3>
            <p className="text-sm text-gray mb-6 leading-relaxed" style={{ position: 'relative', zIndex: 1 }}>
              Booking 'Technical Crew' more than 14 days in advance has actively reduced your hourly expenditure by <strong style={{ color: 'var(--primary)' }}>18%</strong> in Q4.
            </p>
            <button className="btn btn-secondary w-full justify-center font-bold" style={{ position: 'relative', zIndex: 1 }}>
              View Full Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
