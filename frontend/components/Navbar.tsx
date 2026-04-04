export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-left">
          <a href="/" className="nav-logo">Stitch<span>.</span></a>
          <div className="nav-links">
            <a href="#" className="nav-link">Dashboard</a>
            <a href="#" className="nav-link active">Post Requirement</a>
            <a href="#" className="nav-link">Events</a>
            <a href="#" className="nav-link">Analytics</a>
          </div>
        </div>
        <div className="nav-actions">
          <button className="nav-icon-btn" title="Notifications" aria-label="Notifications">
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>notifications</span>
          </button>
          <button className="nav-icon-btn" title="Settings" aria-label="Settings">
            <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>settings</span>
          </button>
          <div className="nav-avatar" aria-label="User profile">JD</div>
          <button className="nav-cta">Post Requirement</button>
        </div>
      </div>
    </nav>
  );
}
