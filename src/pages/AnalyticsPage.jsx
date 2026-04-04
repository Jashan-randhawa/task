import React from 'react';
import { TrendingUp, Clock, DollarSign, Target, Award, Download, Calendar as CalendarIcon } from 'lucide-react';
import './AnalyticsPage.css';

export default function AnalyticsPage() {
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
         <div className="stat-card">
           <div className="stat-icon-wrapper green">
             <Target size={20} color="#10b981" />
           </div>
           <p className="text-gray text-sm mt-4">Fulfillment Rate</p>
           <h2 className="text-3xl font-bold mb-1">94.2%</h2>
           <p className="text-xs text-green-600 font-bold flex items-center gap-1"><TrendingUp size={12}/> +2.4% vs last month</p>
         </div>

         <div className="stat-card">
           <div className="stat-icon-wrapper blue">
             <Clock size={20} color="#60a5fa" />
           </div>
           <p className="text-gray text-sm mt-4">Avg. Time-to-Hire</p>
           <h2 className="text-3xl font-bold mb-1">42m</h2>
           <p className="text-xs text-green-600 font-bold flex items-center gap-1"><TrendingUp size={12}/> -15% vs industry avg</p>
         </div>

         <div className="stat-card">
           <div className="stat-icon-wrapper purple">
             <DollarSign size={20} color="#a855f7" />
           </div>
           <p className="text-gray text-sm mt-4">Total Expenditure</p>
           <h2 className="text-3xl font-bold mb-1">$124.5k</h2>
           <p className="text-xs text-gray font-bold">Allocated across 14 events</p>
         </div>
         
         <div className="stat-card">
           <div className="stat-icon-wrapper orange">
             <Award size={20} color="#f97316" />
           </div>
           <p className="text-gray text-sm mt-4">Top Rated Talent</p>
           <h2 className="text-3xl font-bold mb-1">4.9/5.0</h2>
           <p className="text-xs text-gray font-bold">Avg rating from your events</p>
         </div>
      </div>

      <div className="content-grid">
         {/* Large Chart Component */}
         <div className="main-col">
            <div className="card p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-bold text-lg">Sourcing Volume & Cost Trend</h3>
                  <p className="text-sm text-gray mt-1">Comparison of talent hired vs average rate per hour</p>
                </div>
                <div className="chart-legend flex gap-4">
                  <div className="flex items-center gap-2"><span className="legend-dot bg-primary"></span> Volume</div>
                  <div className="flex items-center gap-2"><span className="legend-dot bg-purple-500"></span> Cost Trend</div>
                </div>
              </div>
              
              <div className="complex-chart flex-1 flex items-end justify-between px-4 pb-2">
                 {[40, 60, 45, 80, 50, 90, 75].map((h, i) => (
                    <div key={i} className="chart-group relative">
                       {/* Line point simulator */}
                       <div className="trend-point absolute z-10 w-3 h-3 bg-white border-2 border-purple-500 rounded-full" style={{ bottom: `${h + 10}%`, left: '50%', transform: 'translateX(-50%)' }}></div>
                       {/* Volume Bar */}
                       <div className="bar bg-primary opacity-20 hover:opacity-40 hover:bg-primary transition-all rounded-t-md" style={{ height: `${h}%`, width: '32px' }}></div>
                       
                       <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray">{'W'+(i+1)}</span>
                    </div>
                 ))}
                 
                 {/* Decorative connecting line SVG element overlay */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <path d="M50 200 L170 160 L290 190 L410 120 L530 180 L650 100 L770 130" stroke="#a855f7" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" />
                 </svg>
              </div>
            </div>
         </div>

         <div className="side-col flex flex-col gap-6">
            <div className="card p-6">
               <h3 className="font-bold text-lg mb-4">Budget Distribution</h3>
               
               <div className="flex flex-col gap-4">
                 <div className="distribution-item">
                   <div className="dist-header"><span className="text-sm font-bold flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Technical Crew</span> <span className="text-sm font-bold">45%</span></div>
                   <div className="progress-bar"><div className="progress bg-blue-500" style={{width: '45%'}}></div></div>
                 </div>
                 <div className="distribution-item">
                   <div className="dist-header"><span className="text-sm font-bold flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Performers</span> <span className="text-sm font-bold">35%</span></div>
                   <div className="progress-bar"><div className="progress bg-purple-500" style={{width: '35%'}}></div></div>
                 </div>
                 <div className="distribution-item">
                   <div className="dist-header"><span className="text-sm font-bold flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400"></span> Event Planners</span> <span className="text-sm font-bold">20%</span></div>
                   <div className="progress-bar"><div className="progress bg-orange-400" style={{width: '20%'}}></div></div>
                 </div>
               </div>
            </div>

            <div className="card bg-slate-800 text-white p-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
               <h3 className="font-bold text-lg mb-2 relative z-10">Optimization Insight</h3>
               <p className="text-sm text-slate-300 relative z-10 mb-6 leading-relaxed">
                  Booking 'Technical Crew' more than 14 days in advance has actively reduced your hourly expenditure by 18% in Q4.
               </p>
               <button className="btn w-full btn-secondary justify-center font-bold relative z-10 text-white border-slate-600 hover:bg-slate-700">View Full Insights</button>
            </div>
         </div>
      </div>
    </div>
  );
}
