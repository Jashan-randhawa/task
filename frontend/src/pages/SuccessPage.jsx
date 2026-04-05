import React from 'react';
import { Check, ArrowRight, Eye, Zap, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="success-main flex-1 flex flex-col items-center py-16 px-8 relative overflow-y-auto w-full animate-fade-in">
        <div className="success-icon-wrapper mb-8">
          <div className="success-icon-inner pulse">
            <Check size={32} />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-center mb-4 leading-tight">
          Requirement Posted<br/>Successfully!
        </h1>
        
        <p className="text-lg text-gray text-center max-w-2xl mb-10">
          Your request has been broadcasted to our elite network. You will receive tailored responses within the hour.
        </p>
        
        <div className="flex gap-4 mb-16">
          <button className="btn btn-primary px-8" onClick={() => navigate('/dashboard')}>View Dashboard</button>
          <button className="btn btn-secondary px-8" onClick={() => navigate('/create-event')}>Post Another</button>
        </div>

        <div className="features-grid grid grid-cols-3 gap-6 w-full max-w-5xl mb-8">
          <div className="feature-card">
            <div className="f-icon blue mb-4"><Eye size={20}/></div>
            <h3 className="font-bold text-lg mb-2">Visibility Live</h3>
            <p className="text-gray text-sm mb-6">Your posting is now discoverable by top-tier talent. Initial reach estimates: 2,400+ professionals.</p>
            <a href="#" className="text-primary text-sm font-semibold flex items-center mt-auto">Check Status <ArrowRight size={14} className="ml-1"/></a>
          </div>
          
          <div className="feature-card">
            <div className="f-icon blue mb-4"><Zap size={20}/></div>
            <h3 className="font-bold text-lg mb-2">Instant Alerts</h3>
            <p className="text-gray text-sm mb-6">Push notifications are active. We'll alert you the moment a verified candidate applies for the role.</p>
            <a href="#" className="text-primary text-sm font-semibold flex items-center mt-auto">Manage Alerts <ArrowRight size={14} className="ml-1"/></a>
          </div>

          <div className="feature-card">
            <div className="f-icon blue mb-4"><Shield size={20}/></div>
            <h3 className="font-bold text-lg mb-2">Nexus Verified</h3>
            <p className="text-gray text-sm mb-6">Every response you receive will pass through our multi-step identity and skill verification process.</p>
            <a href="#" className="text-primary text-sm font-semibold flex items-center mt-auto">View Ethics Policy <ArrowRight size={14} className="ml-1"/></a>
          </div>
        </div>

        <div className="next-steps-card w-full max-w-5xl p-8 flex items-center justify-between">
          <div className="max-w-xl">
            <h3 className="font-bold text-xl mb-3">What's next?</h3>
            <p className="text-gray mb-6">Our AI matching engine is currently analyzing over 45,000 profiles to find the perfect intersection of skill and culture for your event. You can expect a curated shortlist in your inbox shortly.</p>
            <div className="flex items-center gap-3">
               <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-800"></div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-600"></div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">+12k</div>
               </div>
               <span className="text-sm font-medium">Verified talent matching your criteria</span>
            </div>
          </div>
          <div className="success-stat-card w-64">
            <div className="text-xs font-bold text-gray tracking-wider uppercase mb-1">RESPONSE TIME</div>
            <div className="text-3xl font-bold mb-4">~42 mins</div>
            <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden" style={{background: 'var(--surface-2)'}}>
               <div className="h-full w-3/4 rounded-full" style={{background: 'var(--primary)'}}></div>
            </div>
          </div>
        </div>
      </div>
  );
}
