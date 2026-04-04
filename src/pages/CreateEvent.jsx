import React from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import './CreateEvent.css';

// We will inline the step components for simplicity in this demo,
// but in a real app they would be separate files.

const Step1Basics = ({ onNext }) => (
  <div className="step-content animate-fade-in">
    <div className="step-header mb-8">
      <div className="step-tagline"></div>
      <h2 className="text-3xl font-bold">Step 1: Event Basics</h2>
      <p className="text-gray mt-2">Establish the core identity and logistics of your project.</p>
    </div>

    <div className="form-group mb-6">
      <label className="input-label mb-2">Event Name</label>
      <input type="text" className="input-field" placeholder="e.g. Annual Tech Symposium 2024" />
    </div>

    <div className="form-row flex gap-6 mb-6">
      <div className="flex-1">
        <label className="input-label mb-2">Event Type</label>
        <select className="input-field">
          <option>Corporate Conference</option>
          <option>Music Festival</option>
          <option>Private Gala</option>
        </select>
      </div>
      <div className="flex-1">
        <label className="input-label mb-2">Date / Range</label>
        <div className="input-with-icon">
          <input type="text" className="input-field pl-10" placeholder="Oct 24 - Oct 26, 2024" readOnly />
        </div>
      </div>
    </div>

    <div className="form-row flex gap-6 mb-8">
      <div className="flex-1">
        <label className="input-label mb-2">Location</label>
        <div className="input-with-icon">
          <input type="text" className="input-field" placeholder="City, State" />
        </div>
      </div>
      <div className="flex-1">
        <label className="input-label mb-2">Venue <span>(Optional)</span></label>
        <div className="input-with-icon">
          <input type="text" className="input-field" placeholder="Convention Center or Hotel Name" />
        </div>
      </div>
    </div>

    <div className="looking-for-section mb-8 pb-8 border-b">
      <h3 className="font-bold text-lg mb-2">What are you looking for?</h3>
      <p className="text-gray text-sm mb-4">Select all roles you intend to hire through TalentArch for this event.</p>
      
      <div className="role-cards">
        <div className="role-card">
          <div className="role-icon blue"><span className="icon-calendar">📅</span></div>
          <h4 className="font-bold">Event Planner</h4>
          <p className="text-sm text-gray mt-2">End-to-end logistics, vendor management, and coordination.</p>
        </div>
        <div className="role-card">
          <div className="role-icon purple"><span className="icon-masks">🎭</span></div>
          <h4 className="font-bold">Performer</h4>
          <p className="text-sm text-gray mt-2">Musicians, speakers, entertainers, or specialized artists.</p>
        </div>
        <div className="role-card">
          <div className="role-icon indigo"><span className="icon-crew">👥</span></div>
          <h4 className="font-bold">Crew</h4>
          <p className="text-sm text-gray mt-2">Audio/Visual technicians, catering staff, and security.</p>
        </div>
      </div>
    </div>

    <div className="step-actions flex justify-between items-center">
      <button className="btn btn-ghost">Cancel</button>
      <div className="flex gap-4">
        <button className="btn btn-secondary">Save Draft</button>
        <button className="btn btn-primary bg-black" onClick={onNext} style={{backgroundColor: '#000'}}>Next Step: Talent Selection</button>
      </div>
    </div>
  </div>
);

const Step2Performer = ({ onNext, onBack }) => (
  <div className="step-layout flex gap-8 animate-fade-in">
    <div className="step-main">
      <p className="text-primary text-sm font-bold tracking-wider mb-2 uppercase">STEP 02 OF 04</p>
      <div className="flex justify-between items-end border-b pb-4 mb-8">
        <h2 className="text-3xl font-bold">Performer Details</h2>
        <span className="text-sm font-semibold">50% Complete</span>
      </div>

      <h3 className="font-bold text-lg mb-4">What type of performance are you listing?</h3>
      <div className="performer-types flex gap-4 mb-8">
        <div className="performer-card">
          <div className="icon mb-4">👥</div>
          <h4 className="font-bold">Live Band</h4>
          <p className="text-sm text-gray mt-2">Full musical ensembles for high-energy live experiences.</p>
        </div>
        <div className="performer-card active">
          <div className="absolute top-3 right-3 text-primary"><Check size={16} /></div>
          <div className="icon mb-4">💿</div>
          <h4 className="font-bold">DJ</h4>
          <p className="text-sm text-gray mt-2">Curated soundscapes and professional mixing for any atmosphere.</p>
        </div>
        <div className="performer-card">
          <div className="icon mb-4">🎤</div>
          <h4 className="font-bold">Speaker</h4>
          <p className="text-sm text-gray mt-2">Keynotes, panels, and professional hosting services.</p>
        </div>
      </div>

      <div className="form-row flex gap-6 mb-6">
        <div className="flex-1">
          <label className="input-label mb-2">Experience Level</label>
          <select className="input-field"><option>Elite (7+ years)</option></select>
        </div>
        <div className="flex-1">
          <label className="input-label mb-2">Portfolio / Website Link</label>
          <input type="text" className="input-field" placeholder="https://yourportfolio.com" />
        </div>
      </div>

      <div className="form-group mb-8">
        <label className="input-label mb-2">Special Requirements</label>
        <textarea className="input-field h-32" placeholder="Mention specific technical riders, stage size needs, or travel arrangements..."></textarea>
        <p className="text-xs text-gray mt-2">This information helps clients prepare for your technical needs in advance.</p>
      </div>

      <div className="step-actions flex justify-between items-center mt-auto">
        <button className="btn btn-ghost" onClick={onBack}>Back</button>
        <button className="btn btn-primary bg-black" onClick={onNext} style={{backgroundColor: '#000'}}>Continue to Budget ➔</button>
      </div>
    </div>
    <div className="step-sidebar-right">
      <div className="guide-card">
        <h3 className="font-bold text-lg mb-2">Nexus Direct Guide</h3>
        <p className="text-sm text-gray mb-6">Your performer profile is the first thing premium clients see. Precision here reduces back-and-forth negotiations by 40%.</p>
        
        <div className="guide-items">
          <div className="guide-item">
            <div className="icon-badge blue"><Check size={14}/></div>
            <div>
              <h4 className="text-sm font-bold">Experience Verification</h4>
              <p className="text-xs text-gray mt-1">Elite status requires a verifiable portfolio link with recent bookings.</p>
            </div>
          </div>
          <div className="guide-item">
            <div className="icon-badge purple">⚡</div>
            <div>
              <h4 className="text-sm font-bold">Technical Riders</h4>
              <p className="text-xs text-gray mt-1">Include stage dimensions and power requirements to avoid setup delays.</p>
            </div>
          </div>
          <div className="guide-item">
            <div className="icon-badge indigo">💡</div>
            <div>
              <h4 className="text-sm font-bold">Pro Tip</h4>
              <p className="text-xs text-gray mt-1">DJs with curated Spotify playlists in their portfolio see 2x more inquiries.</p>
            </div>
          </div>
        </div>

        <div className="nexus-promo mt-8">
          <div className="promo-bg"></div>
          <p className="text-white text-xs font-bold relative z-10 bottom-0 left-0 p-4 pt-16">Nexus Direct Elite Partner Program</p>
        </div>
      </div>
    </div>
  </div>
);

const Step3Budget = ({ onNext, onBack }) => (
  <div className="step-content animate-fade-in max-w-3xl">
    <p className="text-primary text-sm font-bold tracking-wider mb-2 uppercase">STEP 03 OF 04</p>
    <div className="flex justify-between items-end border-b pb-4 mb-8">
      <h2 className="text-3xl font-bold">Budget & Terms</h2>
      <span className="text-sm font-semibold text-primary">75% Complete</span>
    </div>

    <div className="form-row flex gap-6 mb-8">
      <div className="flex-1">
        <label className="input-label mb-2">Estimated Budget Range</label>
        <div className="flex gap-4 items-center">
          <div className="input-with-icon flex-1">
            <span className="absolute left-4 top-3 text-gray font-bold">$</span>
            <input type="text" className="input-field pl-8" placeholder="4,500" />
          </div>
          <span className="text-gray flex-shrink-0">to</span>
          <div className="input-with-icon flex-1">
            <span className="absolute left-4 top-3 text-gray font-bold">$</span>
            <input type="text" className="input-field pl-8" placeholder="6,000" />
          </div>
        </div>
      </div>
      <div className="flex-1">
        <label className="input-label mb-2">Duration / Hours</label>
        <div className="input-with-icon">
          <span className="absolute left-4 top-3 text-gray">⏱️</span>
          <input type="text" className="input-field pl-10" placeholder="e.g. 4 Days (32 Hours)" />
        </div>
      </div>
    </div>

    <h3 className="font-bold text-lg mb-4">Allowances & Coverage</h3>
    <div className="flex flex-col gap-3 mb-8">
      <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary bg-slate-50">
        <input type="checkbox" className="w-5 h-5 accent-primary rounded" defaultChecked />
        <div>
           <div className="font-bold">Travel Covered</div>
           <div className="text-sm text-gray">Flights and regional transit paid by client.</div>
        </div>
      </label>
      <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary bg-slate-50">
        <input type="checkbox" className="w-5 h-5 accent-primary rounded" defaultChecked />
        <div>
           <div className="font-bold">Lodging Included</div>
           <div className="text-sm text-gray">Hotel or premium accommodation provided.</div>
        </div>
      </label>
      <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer hover:border-primary">
        <input type="checkbox" className="w-5 h-5 accent-primary rounded" />
        <div>
           <div className="font-bold">Per Diem (Meals)</div>
           <div className="text-sm text-gray">Daily stipend for food and incidentals.</div>
        </div>
      </label>
    </div>

    <div className="step-actions flex justify-between items-center mt-12">
      <button className="btn btn-ghost" onClick={onBack}>Back</button>
      <button className="btn btn-primary bg-black" onClick={onNext} style={{backgroundColor: '#000'}}>Review Post ➔</button>
    </div>
  </div>
);

const Step4Review = ({ onBack, onSubmit }) => (
  <div className="step-content animate-fade-in w-full max-w-4xl mx-auto">
    <div className="border-b-2 border-primary mb-6"></div>
    <h2 className="text-3xl font-bold mb-2">Requirement Summary</h2>
    <p className="text-gray mb-8">Please verify all details below before submitting to the talent pool.</p>

    <div className="flex gap-6">
      <div className="flex-1 flex flex-col gap-6">
        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-primary tracking-wider">SECTION 01</span>
            <button className="text-primary text-sm font-semibold flex items-center gap-1">✎ Edit</button>
          </div>
          <h3 className="text-xl font-bold mb-4">General Information</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray font-bold mb-1">EVENT NAME</p>
              <p className="font-semibold">Global Fintech Summit 2024</p>
            </div>
            <div>
              <p className="text-xs text-gray font-bold mb-1">DATE</p>
              <p className="font-semibold">Oct 12 - Oct 15, 2024</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray font-bold mb-1">LOCATION</p>
            <p className="font-semibold flex items-center gap-2"><span className="text-primary">📍</span> Moscone Center, San Francisco, CA</p>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-primary tracking-wider">SECTION 02</span>
            <button className="text-primary text-sm font-semibold flex items-center gap-1">✎ Edit</button>
          </div>
          <h3 className="text-xl font-bold mb-4">Requirement Details</h3>
          <div className="flex gap-4">
            <div className="bg-slate-50 p-4 rounded-lg flex-1">
              <p className="text-xs text-gray font-bold mb-1">CATEGORY</p>
              <p className="font-semibold flex items-center gap-2"><span className="text-primary">🪑</span> Stage Management</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex-1">
              <p className="text-xs text-gray font-bold mb-1">TYPE</p>
              <p className="font-semibold flex items-center gap-2"><span className="text-primary">💼</span> On-site Lead</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex-1">
              <p className="text-xs text-gray font-bold mb-1">DURATION</p>
              <p className="font-semibold flex items-center gap-2"><span className="text-primary">⏱️</span> 4 Days (32 Hours)</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg flex-1">
              <p className="text-xs text-gray font-bold mb-1">BUDGET</p>
              <p className="font-semibold flex items-center gap-2"><span className="text-primary">💵</span> $4,500 - $6,000</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-bold text-primary tracking-wider">SECTION 03</span>
            <button className="text-primary text-sm font-semibold flex items-center gap-1">✎ Edit</button>
          </div>
          <h3 className="text-xl font-bold mb-4">Attached Brief</h3>
          <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4">
            <div className="bg-red-50 text-red-500 p-3 rounded-lg font-bold">PDF</div>
            <div>
              <p className="font-semibold">Fintech_Summit_Scope_v2.pdf</p>
              <p className="text-xs text-gray">2.4 MB • Uploaded Sept 14</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-1/3 flex flex-col gap-6">
        <div className="bg-blue-50 p-8 rounded-xl flex flex-col items-center justify-center text-center h-48 border border-blue-100">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 text-primary shadow-sm">
            <Check size={24} />
          </div>
          <h3 className="font-bold text-lg">Ready to Launch</h3>
          <p className="text-sm text-gray mt-2">All mandatory fields are completed and verified.</p>
        </div>
        
        <div className="card overflow-hidden h-64 relative bg-slate-800">
           {/* Mock Map Image Representation */}
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
             <div className="flex items-center gap-2 text-white">
               <div className="w-2 h-2 rounded-full bg-primary"></div>
               <span className="text-xs font-bold tracking-wider">EVENT VENUE CONTEXT</span>
             </div>
           </div>
        </div>
      </div>
    </div>

    <div className="mt-8 pt-8 border-t flex justify-between items-center">
      <button className="btn btn-ghost" onClick={onBack}>← Back to Docs</button>
      <div className="flex gap-4">
        <button className="btn btn-secondary">Save Draft</button>
        <button className="btn btn-primary" onClick={onSubmit}>Submit Requirement</button>
      </div>
    </div>
  </div>
);

export default function CreateEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentStep = location.pathname.split('/').pop();

  return (
    <div className="create-event-layout">
      {/* Left Sidebar Steps */}
      <aside className="create-sidebar">
        <h1 className="text-xl font-bold mb-2">Create Event</h1>
        <p className="text-sm text-gray mb-10">Fill in the core details to start building your professional event requirement.</p>
        
        <div className="steps-container">
          <div className={`step-indicator ${currentStep === 'step1' ? 'active' : 'completed'}`}>
            <div className="step-num">1</div>
            <div className="step-details">
              <div className="font-bold">Event Basics</div>
              <div className="text-xs text-primary">In Progress</div>
            </div>
          </div>
          <div className={`step-indicator ${currentStep === 'step2' ? 'active' : (currentStep === 'step3' || currentStep === 'step4' ? 'completed' : 'locked')}`}>
            <div className="step-num">2</div>
            <div className="step-details">
              <div className="font-bold">Talent Selection</div>
              <div className="text-xs text-gray">{currentStep === 'step2' ? 'In Progress' : 'Locked'}</div>
            </div>
          </div>
          <div className={`step-indicator ${currentStep === 'step3' ? 'active' : (currentStep === 'step4' ? 'completed' : 'locked')}`}>
            <div className="step-num">3</div>
            <div className="step-details">
              <div className="font-bold">Budget & Terms</div>
              <div className="text-xs text-gray">{currentStep === 'step3' ? 'In Progress' : (currentStep === 'step4' ? 'Completed' : 'Locked')}</div>
            </div>
          </div>
          <div className={`step-indicator ${currentStep === 'step4' ? 'active' : 'locked'}`}>
            <div className="step-num">4</div>
            <div className="step-details">
              <div className="font-bold">Review & Launch</div>
              <div className="text-xs text-gray">Locked</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="create-main">
        <div className="create-container bg-white rounded-xl border p-8 shadow-sm min-h-full">
          <Routes>
            <Route path="/" element={<Navigate to="step1" replace />} />
            <Route path="step1" element={<Step1Basics onNext={() => navigate('/create-event/step2')} />} />
            <Route path="step2" element={<Step2Performer onBack={() => navigate('/create-event/step1')} onNext={() => navigate('/create-event/step3')} />} />
            <Route path="step3" element={<Step3Budget onBack={() => navigate('/create-event/step2')} onNext={() => navigate('/create-event/step4')} />} />
            <Route path="step4" element={<Step4Review onBack={() => navigate('/create-event/step3')} onSubmit={() => navigate('/success')} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
