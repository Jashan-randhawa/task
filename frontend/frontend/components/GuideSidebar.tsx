'use client';

interface GuideSidebarProps {
  step: number;
}

const STEP_TIPS = [
  {
    title: 'Event Details',
    sub: 'Clear event info helps candidates assess fit before applying.',
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
        desc: 'Venue type helps performers assess technical requirements in advance.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="6.5"/>
            <path d="M8 5v3.5l2 2"/>
          </svg>
        ),
        title: 'Plan Ahead',
        desc: 'Requirements posted before 48h of an event get 3× fewer quality responses.',
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
        desc: 'Planners own strategy & vendor relations. Crew handles hands-on day-of execution.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 8a4 4 0 008 0"/>
            <path d="M2 8h12M8 2v2M8 12v2"/>
          </svg>
        ),
        title: 'Performer Reach',
        desc: 'Performers listed under the correct genre get 2× more relevant inquiries.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12l4-4 3 3 5-6"/>
          </svg>
        ),
        title: 'Multiple Requirements',
        desc: 'You can post multiple requirements for the same event — one per role type.',
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
        desc: 'Technical riders, stage dimensions, and power requirements avoid day-of delays.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="5" r="3"/>
            <path d="M2 14c0-3.31 2.69-6 6-6s6 2.69 6 6"/>
          </svg>
        ),
        title: 'Experience Verification',
        desc: 'Elite status talent requires a verifiable portfolio with recent bookings.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="12" height="9" rx="1.5"/>
            <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/>
          </svg>
        ),
        title: 'Budget Transparency',
        desc: 'Posts with clear budget ranges receive 40% more qualified applications.',
      },
    ],
  },
  {
    title: 'Review & Submit',
    sub: 'Double-check everything before broadcasting to thousands of professionals.',
    items: [
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 8a6 6 0 1012 0A6 6 0 002 8z"/>
            <path d="M8 5v4l2.5 2.5"/>
          </svg>
        ),
        title: 'Response Time',
        desc: 'Most verified talent responds within 42 minutes of a requirement going live.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 4.5l-7 7L3 8"/>
          </svg>
        ),
        title: 'Auto-Matching',
        desc: 'Our engine scores all candidates against your criteria instantly after submission.',
      },
      {
        icon: (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5 6.5 5z"/>
          </svg>
        ),
        title: 'Quality Guarantee',
        desc: 'Every applicant is pre-screened. You only see top-tier, verified professionals.',
      },
    ],
  },
];

export default function GuideSidebar({ step }: GuideSidebarProps) {
  const tipSet = STEP_TIPS[step - 1];
  if (!tipSet) return null;

  return (
    <aside className="guide-sidebar">
      <div className="guide-header">
        <span className="guide-eyebrow">Pro Tips</span>
        <div className="guide-title">{tipSet.title}</div>
        <p className="guide-sub">{tipSet.sub}</p>
      </div>

      <div className="guide-items">
        {tipSet.items.map((item, i) => (
          <div key={i} className="guide-item">
            <div className="guide-item-top">
              <div className="guide-icon">{item.icon}</div>
              <div className="guide-item-title">{item.title}</div>
            </div>
            <p className="guide-item-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
