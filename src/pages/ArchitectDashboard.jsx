import React, { useState, useEffect } from 'react';
import { Briefcase, FileText, Users, FileCheck, Plus, Search, TrendingUp, MoreHorizontal, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export default function ArchitectDashboard() {
  const navigate = useNavigate();
  const [chartFilter, setChartFilter] = useState('Last 7 Days');
  const [pulse, setPulse] = useState(false);
  
  const chartData = {
    'Last 7 Days': [40, 60, 80, 100, 50, 45, 30],
    'Last 30 Days': [70, 90, 60, 85, 40, 75, 55]
  };

  useEffect(() => {
     // Simulate real-time data ticks
     const interval = setInterval(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
     }, 4000);
     return () => clearInterval(interval);
  }, []);

  const toggleFilter = () => {
    setChartFilter(prev => prev === 'Last 7 Days' ? 'Last 30 Days' : 'Last 7 Days');
  };

  return (
    <div className="dashboard-main animate-fade-in">
      <header className="page-header mb-8 flex justify-between items-end">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">Architect's View</h1>
              <span className="badge badge-success bg-teal-500/10 text-teal-400 border-teal-500/20">LIVE</span>
           </div>
           <p className="text-gray">Real-time telemetry of your elite talent pipeline and strategic reach.</p>
        </div>
        <div className="flex gap-3">
           <button className="btn glass-btn text-gray"><Copy size={16} /> Report</button>
           <button className="btn btn-primary shadow-glow" onClick={() => navigate('/create-event/step1')}>
              <Plus size={16} /> New Event
           </button>
        </div>
      </header>

      <div className="stats-grid mb-8">
        <div className="card stat-card relative overflow-hidden group">
          <div className="stat-glow bg-blue-500/20 group-hover:bg-blue-500/30"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
             <div className="stat-icon-wrapper rounded-xl bg-blue-500/10 border border-blue-500/20">
               <Briefcase size={20} className="text-blue-400" />
             </div>
             <div className="stat-badge flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full border border-emerald-400/20">
                <TrendingUp size={12} /> +12%
             </div>
          </div>
          <div className="relative z-10">
             <p className="text-gray text-sm mb-1 font-medium">Active Postings</p>
             <h2 className="text-4xl font-bold tracking-tight flex items-center gap-3">
               24 {pulse && <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>}
             </h2>
          </div>
        </div>

        <div className="card stat-card relative overflow-hidden group">
          <div className="stat-glow bg-purple-500/20 group-hover:bg-purple-500/30"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
             <div className="stat-icon-wrapper rounded-xl bg-purple-500/10 border border-purple-500/20">
               <FileText size={20} className="text-purple-400" />
             </div>
             <div className="stat-badge flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-full border border-amber-400/20">
                NEW
             </div>
          </div>
          <div className="relative z-10">
             <p className="text-gray text-sm mb-1 font-medium">Pending Applications</p>
             <h2 className="text-4xl font-bold tracking-tight">148</h2>
          </div>
        </div>

        <div className="card stat-card relative overflow-hidden group">
          <div className="stat-glow bg-teal-500/20 group-hover:bg-teal-500/30"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
             <div className="stat-icon-wrapper rounded-xl bg-teal-500/10 border border-teal-500/20">
               <Users size={20} className="text-teal-400" />
             </div>
             <div className="stat-badge flex items-center gap-1 text-xs font-bold text-teal-400 bg-teal-400/10 px-2 py-1 rounded-full border border-teal-400/20">
                TOP 5%
             </div>
          </div>
          <div className="relative z-10">
             <p className="text-gray text-sm mb-1 font-medium">Total Talent Reach</p>
             <h2 className="text-4xl font-bold tracking-tight">12.4k</h2>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="main-col">
          {/* Advanced Chart Area */}
          <div className="card p-6 mb-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="font-bold text-lg flex items-center gap-2">Application Inflow <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div></h3>
                <p className="text-sm text-gray">Real-time incoming applications trajectory</p>
              </div>
              <button className="chart-filter border border-slate-700 bg-slate-800/50 hover:bg-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors" onClick={toggleFilter}>
                {chartFilter}
              </button>
            </div>
            
            <div className="advanced-chart relative h-[250px] w-full flex items-end justify-between px-2 pb-6 border-b border-slate-800">
               {/* Grid lines */}
               <div className="absolute inset-0 flex flex-col justify-between pb-6 pointer-events-none opacity-20">
                  <div className="border-t border-slate-600 w-full"></div>
                  <div className="border-t border-slate-600 w-full"></div>
                  <div className="border-t border-slate-600 w-full"></div>
                  <div className="border-t border-slate-600 w-full"></div>
               </div>

              {chartData[chartFilter].map((h, i) => (
                <div key={i} className="bar-column group relative flex flex-col justify-end items-center h-full w-[10%] cursor-pointer">
                  {/* Tooltip trigger space */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 border border-slate-700 text-xs py-1 px-2 rounded font-bold shadow-lg z-20">
                    {h} Apps
                  </div>
                  <div 
                    className={`chart-bar-smooth w-full max-w-[40px] rounded-t-lg transition-all duration-700 ease-out ${i === 3 ? 'bg-gradient-to-t from-teal-500/20 to-teal-400' : 'bg-gradient-to-t from-purple-500/10 to-purple-500/50 group-hover:to-purple-400/80'}`} 
                    style={{ height: `${h}%` }}
                  >
                     <div className="absolute top-0 left-0 w-full h-[2px] bg-white/40"></div>
                  </div>
                  <span className="absolute -bottom-6 text-xs font-semibold text-slate-500 group-hover:text-slate-300">{'MONTUEWEDTHUFRISATSUN'.slice(i*3, i*3+3)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             {/* Recent Activity Mini */}
             <div className="card p-6">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="font-bold text-base tracking-tight">Recent Activity</h3>
                 <button className="text-slate-400 hover:text-white"><MoreHorizontal size={18} /></button>
               </div>
               <div className="activity-list space-y-4">
                 <div className="activity-item flex gap-3 text-sm">
                   <div className="avatar shrink-0 w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-rose-400 flex items-center justify-center text-white font-bold text-xs shadow-md">SC</div>
                   <div>
                     <p className="text-slate-300"><strong className="text-white">Sarah Chen</strong> applied for <span className="text-teal-400 font-medium">Senior Solutions Architect</span></p>
                     <p className="text-xs text-slate-500 mt-1">2 mins ago</p>
                   </div>
                 </div>
                 <div className="activity-item flex gap-3 text-sm">
                   <div className="icon-circle shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                     <FileCheck size={14} className="text-emerald-400" />
                   </div>
                   <div>
                     <p className="text-slate-300"><strong className="text-white">Requirement Fulfilled</strong> Mobile Lead Engineer closed.</p>
                     <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                   </div>
                 </div>
               </div>
             </div>
             
             {/* Optimization Hint */}
             <div className="card bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 p-6 relative overflow-hidden group">
                 <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-colors"></div>
                 <h3 className="font-bold text-base tracking-tight mb-2 text-white">AI Optimization Insight</h3>
                 <p className="text-sm text-slate-400 mb-4 leading-relaxed">Booking 'Technical Crew' more than 14 days in advance has actively reduced your hourly expenditure by 18% in Q4.</p>
                 <button className="text-teal-400 text-sm font-semibold hover:underline">View Full Analysis &rarr;</button>
             </div>
          </div>
        </div>
        
        <div className="side-col">
          {/* Action Center */}
          <div className="card p-1">
             <div className="bg-slate-800/50 rounded-lg p-5 border border-slate-700/50">
               <h3 className="font-bold text-sm text-slate-400 mb-4 uppercase tracking-wider">Action Center</h3>
               <button className="btn w-full bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600 justify-start mb-3" onClick={() => navigate('/create-event/step1')}>
                 <div className="w-6 h-6 rounded bg-slate-600 flex items-center justify-center mr-2"><Plus size={14}/></div>
                 Post Requirement
               </button>
               <button className="btn w-full bg-slate-700/50 hover:bg-slate-700 text-white border border-slate-600 justify-start" onClick={() => navigate('/talent')}>
                 <div className="w-6 h-6 rounded bg-slate-600 flex items-center justify-center mr-2"><Search size={14}/></div>
                 Search Network
               </button>
             </div>
          </div>

          <div className="card p-6 mt-6">
            <h3 className="font-bold text-base tracking-tight mb-6">Talent Distribution</h3>
            <div className="space-y-5">
               <div className="distribution-item">
                 <div className="flex justify-between items-end mb-2"><span className="text-xs font-semibold text-slate-300">ENGINEERING</span> <span className="text-xs font-bold text-teal-400">65%</span></div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]" style={{width: '65%'}}></div>
                 </div>
               </div>
               <div className="distribution-item">
                 <div className="flex justify-between items-end mb-2"><span className="text-xs font-semibold text-slate-300">PRODUCT</span> <span className="text-xs font-bold text-purple-400">25%</span></div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" style={{width: '25%'}}></div>
                 </div>
               </div>
               <div className="distribution-item">
                 <div className="flex justify-between items-end mb-2"><span className="text-xs font-semibold text-slate-300">DESIGN</span> <span className="text-xs font-bold text-sky-400">10%</span></div>
                 <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-400 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]" style={{width: '10%'}}></div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
