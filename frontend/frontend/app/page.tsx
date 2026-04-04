import Navbar from '../components/Navbar';
import MultiStepRequirementForm from '../components/MultiStepRequirementForm';

export default function HomePage() {
  return (
    <>
      <Navbar />

      <div className="root-layout">
        {/* LEFT: brand + step progress */}
        <aside className="page-aside">
          <div className="aside-brand">
            <div className="aside-logo">Stitch</div>
            <div className="aside-tagline">Event Talent Platform</div>
          </div>

          <div className="aside-body">
            <h2 className="aside-headline">
              Find the <em>perfect</em> team for your event
            </h2>
            <p className="aside-sub">
              Connect with vetted planners, performers, and crew — post your requirement in under 4 minutes.
            </p>
            <div className="aside-stats" aria-label="Platform metrics">
              <div className="aside-stat">
                <strong>45k+</strong>
                <span>Verified talent</span>
              </div>
              <div className="aside-stat">
                <strong>92%</strong>
                <span>Match accuracy</span>
              </div>
            </div>
          </div>

          <nav className="step-progress" aria-label="Form steps">
            {[
              { n: 1, label: 'Event Details'   },
              { n: 2, label: 'Role & Category' },
              { n: 3, label: 'Specifics'       },
              { n: 4, label: 'Review'          },
            ].map(({ n, label }) => (
              <div key={n} className="step-item" id={`aside-step-${n}`}>
                <div className="step-dot">
                  <span className="step-dot-n">{n}</span>
                </div>
                <span className="step-label">{label}</span>
              </div>
            ))}
          </nav>

          <p className="aside-footer">© 2025 Stitch. All rights reserved.</p>
        </aside>

        {/* CENTER + RIGHT */}
        <MultiStepRequirementForm />
      </div>

      <footer className="site-footer">
        <div className="footer-brand">
          Stitch<span>The Curated Marketplace</span>
        </div>
        <div className="footer-links">
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Support</a>
        </div>
        <p className="footer-copy">© 2025 Stitch. All rights reserved.</p>
      </footer>
    </>
  );
}
