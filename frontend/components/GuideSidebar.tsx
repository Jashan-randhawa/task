'use client';

interface GuideSidebarProps {
  step: number;
}

const STEP_TIPS = [
  {
    title: 'Event Details',
    sub: 'Provide clear event info so candidates can assess fit before applying.',
    items: [
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2.5" width="12" height="11" rx="1.5"/>
            <path d="M5 2v2M11 2v2M2 7h12"/>
          </svg>
        ),
        title: 'Specific Dates Matter',
        desc: 'Listing exact dates filters out unavailable talent, reducing inbox noise by up to 60%.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5z"/>
            <circle cx="8" cy="6" r="1.5"/>
          </svg>
        ),
        title: 'Include the Venue',
        desc: 'Venue type (club, arena, outdoor) helps performers assess technical requirements in advance.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="6.5"/>
            <path d="M8 5v3.5l2 2"/>
          </svg>
        ),
        title: 'Pro Tip',
        desc: 'Requirements posted before 48h of an event get 3× fewer quality responses. Plan ahead.',
      },
    ],
  },
  {
    title: 'Choose a Category',
    sub: 'Matching the right category ensures your post reaches the most relevant talent pool.',
    items: [
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1.5l1.8 3.5 3.9.6-2.8 2.7.65 3.85L8 10.4l-3.55 1.85.65-3.85L2.3 5.6l3.9-.6L8 1.5z"/>
          </svg>
        ),
        title: 'Planner vs. Crew',
        desc: 'Planners own strategy & vendor relations. Crew is for hands-on day-of execution. Both can co-exist.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8a4 4 0 008 0"/>
            <path d="M2 8h12M8 2v2M8 12v2"/>
          </svg>
        ),
        title: 'Performer Reach',
        desc: 'Performers listed under the correct genre tag get 2× more relevant inquiries from curated events.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12l4-4 3 3 5-6"/>
          </svg>
        ),
        title: 'Pro Tip',
        desc: 'You can post multiple requirements for the same event — one for a performer, one for crew.',
      },
    ],
  },
  {
    title: 'Role Specifics',
    sub: 'Precision here reduces back-and-forth negotiation significantly.',
    items: [
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h10M3 8h6M3 12h8"/>
          </svg>
        ),
        title: 'Be Specific',
        desc: 'Technical riders, stage dimensions and power requirements avoid day-of setup delays.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="5" r="3"/>
            <path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6"/>
          </svg>
        ),
        title: 'Experience Verification',
        desc: 'Elite status talent requires a verifiable portfolio with recent bookings to unlock premium placements.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1v9M4.5 6l3.5 4 3.5-4M3 13.5h10"/>
          </svg>
        ),
        title: 'Pro Tip',
        desc: 'Adding a portfolio link to your requirement lifts response quality by filtering passive interest.',
      },
    ],
  },
  {
    title: 'Review & Submit',
    sub: 'Double-check every detail — once posted, your requirement goes live immediately.',
    items: [
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8l4 4 8-8"/>
          </svg>
        ),
        title: 'Accuracy First',
        desc: 'Incorrect dates or locations are the #1 cause of qualified talent declining an offer.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 6H3M13 10H3"/>
            <circle cx="8" cy="8" r="6.5"/>
          </svg>
        ),
        title: 'What Happens Next',
        desc: 'After submitting, matched talent is notified within minutes. Expect responses in 2–24 hours.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 1.5l1.8 3.5 3.9.6-2.8 2.7.65 3.85L8 10.4l-3.55 1.85.65-3.85L2.3 5.6l3.9-.6L8 1.5z"/>
          </svg>
        ),
        title: 'Elite Partner Program',
        desc: 'Premium clients get priority matching and a dedicated talent concierge at no extra cost.',
      },
    ],
  },
];

export default function GuideSidebar({ step }: GuideSidebarProps) {
  const tip = STEP_TIPS[step - 1];

  return (
    <aside className="page-sidebar">
      <div className="guide-card">
        {/* Mini step progress */}
        <div className="sidebar-steps">
          {[1, 2, 3, 4].map(n => (
            <div
              key={n}
              className={`sidebar-step${n < step ? ' done' : n === step ? ' active' : ''}`}
            />
          ))}
        </div>

        <div>
          <div className="guide-title">Nexus Direct Guide</div>
          <p className="guide-sub">{tip.sub}</p>
        </div>

        <div className="guide-items">
          {tip.items.map((item, i) => (
            <div className="guide-item" key={i}>
              <div className="guide-icon">{item.icon}</div>
              <div>
                <div className="guide-item-title">{item.title}</div>
                <div className="guide-item-desc">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Promo card */}
        <div className="promo-card">
          <div className="promo-text">
            <div className="promo-badge">
              <span className="promo-badge-dot" />
              Elite Access
            </div>
            <div className="promo-title">Nexus Direct<br />Partner Program</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
