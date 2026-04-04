'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/',          label: 'Post Requirement' },
  { href: '#',          label: 'Events' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-left">
          <Link href="/dashboard" className="nav-logo">
            Stitch<span>.</span>
          </Link>
          <div className="nav-links">
            {navLinks.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className={`nav-link ${pathname === href ? 'active' : ''}`}
              >
                {label}
              </Link>
            ))}
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
          <Link href="/">
            <button className="nav-cta">Post Requirement</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
