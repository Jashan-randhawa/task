'use client';

interface SuccessPageProps {
  onPostAnother: () => void;
}

const ACTION_CARDS = [
  {
    icon: 'visibility',
    title: 'Visibility Live',
    desc: 'Your posting is now discoverable by top-tier talent. Initial reach estimates: 2,400+ professionals.',
    link: 'Check Status',
  },
  {
    icon: 'bolt',
    title: 'Instant Alerts',
    desc: "Push notifications are active. We'll alert you the moment a verified candidate applies for the role.",
    link: 'Manage Alerts',
  },
  {
    icon: 'verified_user',
    title: 'Nexus Verified',
    desc: 'Every response you receive will pass through our multi-step identity and skill verification process.',
    link: 'View Ethics Policy',
  },
];

const AVATAR_COLORS = ['#d3e4fe', '#e5eeff', '#eff4ff'];

export default function SuccessPage({ onPostAnother }: SuccessPageProps) {
  return (
    <div className="success-shell">
      {/* Left sidebar nav */}
      <aside className="success-sidebar">
        <div className="success-sidebar-brand">
          <div className="success-sidebar-logo-box">
            <span className="material-symbols-outlined" style={{ color: 'var(--surface-tint)', fontSize: '1.4rem' }}>apartment</span>
          </div>
          <div>
            <div className="success-sidebar-company">EventPro B2B</div>
            <div className="success-sidebar-tier">Elite Tier</div>
          </div>
        </div>

        <nav className="success-sidebar-nav">
          {[
            { icon: 'dashboard',     label: 'Overview',    active: false },
            { icon: 'assignment',    label: 'My Postings', active: true  },
            { icon: 'groups',        label: 'Talent Pool', active: false },
            { icon: 'description',   label: 'Contracts',   active: false },
            { icon: 'receipt_long',  label: 'Invoices',    active: false },
          ].map(({ icon, label, active }) => (
            <a key={label} href="#" className={`success-nav-item${active ? ' active' : ''}`}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="success-sidebar-footer">
          <button className="success-upgrade-btn">Upgrade Plan</button>
          <div className="success-sidebar-util">
            <a href="#" className="success-util-link">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>help</span>
              Help Center
            </a>
            <a href="#" className="success-util-link">
              <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>logout</span>
              Log Out
            </a>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="success-main">
        {/* Success hero */}
        <div className="success-hero">
          <div className="success-check-ring">
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '3rem',
                color: 'var(--surface-tint)',
                fontVariationSettings: "'FILL' 1",
              }}
            >
              check_circle
            </span>
          </div>

          <h1 className="success-headline">
            Requirement Posted<br />Successfully!
          </h1>

          <p className="success-sub">
            Your request has been broadcasted to our elite network. You will
            receive tailored responses within the hour.
          </p>

          <div className="success-cta-row">
            <a href="#" className="btn btn-indigo success-cta-primary">
              View Dashboard
            </a>
            <button
              type="button"
              className="btn btn-ghost success-cta-secondary"
              onClick={onPostAnother}
            >
              Post Another
            </button>
          </div>
        </div>

        {/* Action cards bento grid */}
        <div className="success-cards-grid">
          {ACTION_CARDS.map((card) => (
            <div key={card.title} className="success-card">
              <div className="success-card-icon-wrap">
                <span className="material-symbols-outlined" style={{ fontSize: '1.6rem', color: 'var(--surface-tint)' }}>
                  {card.icon}
                </span>
              </div>
              <h3 className="success-card-title">{card.title}</h3>
              <p className="success-card-desc">{card.desc}</p>
              <a href="#" className="success-card-link">
                {card.link}
                <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>arrow_forward</span>
              </a>
            </div>
          ))}
        </div>

        {/* What's next section */}
        <div className="success-next">
          <div className="success-next-left">
            <h4 className="success-next-title">What's next?</h4>
            <p className="success-next-body">
              Our AI matching engine is currently analyzing over 45,000 profiles
              to find the perfect intersection of skill and culture for your
              event. You can expect a curated shortlist in your inbox shortly.
            </p>
            <div className="success-avatars">
              <div className="success-avatar-stack">
                {AVATAR_COLORS.map((color, i) => (
                  <div
                    key={i}
                    className="success-avatar-placeholder"
                    style={{ background: color, zIndex: 3 - i }}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '1.1rem', color: 'var(--secondary)' }}
                    >
                      person
                    </span>
                  </div>
                ))}
                <div className="success-avatar-count">+12k</div>
              </div>
              <span className="success-avatars-label">Verified talent matching your criteria</span>
            </div>
          </div>

          <div className="success-next-right">
            <div className="success-response-card">
              <div className="success-response-label">Response Time</div>
              <div className="success-response-value">~42 mins</div>
              <div className="success-response-track">
                <div className="success-response-fill" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
