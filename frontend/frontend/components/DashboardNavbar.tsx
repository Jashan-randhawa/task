'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboard',  label: 'Dashboard' },
  { href: '/analytics',  label: 'Analytics' },
  { href: '/',           label: 'Post Requirement' },
];

export default function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 w-full z-50 flex justify-between items-center px-7 h-[58px]"
      style={{
        background: 'rgba(245,244,240,0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <div className="flex items-center gap-10">
        <Link href="/dashboard">
          <span
            className="cursor-pointer select-none"
            style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--ink)' }}
          >
            Stitch<span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-pop)', marginLeft: 2, marginBottom: 6 }} />
          </span>
        </Link>
        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={label} href={href}>
                <span
                  className="cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 'var(--r-sm)',
                    background: isActive ? 'var(--surface-container)' : 'transparent',
                    transition: 'all var(--t)',
                    display: 'inline-block',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="nav-icon-btn"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>notifications</span>
        </button>
        <button
          className="nav-icon-btn"
          aria-label="Settings"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.15rem' }}>settings</span>
        </button>
        <div className="nav-avatar">JD</div>
      </div>
    </nav>
  );
}
