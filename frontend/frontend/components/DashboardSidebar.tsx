'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'grid_view',   label: 'Overview',      href: '/dashboard' },
  { icon: 'work',        label: 'Job Postings',  href: '#' },
  { icon: 'group',       label: 'Talent Pool',   href: '#' },
  { icon: 'analytics',   label: 'Analytics',     href: '/analytics' },
  { icon: 'description', label: 'Contracts',     href: '#' },
  { icon: 'payments',    label: 'Payments',      href: '#' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex flex-col sticky shrink-0"
      style={{
        width: 240,
        top: 58,
        height: 'calc(100vh - 58px)',
        background: 'var(--surface-card)',
        borderRight: '1px solid var(--surface-border)',
        padding: '1.5rem 1rem',
        overflowY: 'auto',
        fontFamily: 'var(--font-body)',
      }}
    >
      {/* Workspace */}
      <div style={{ marginBottom: '1.75rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--surface-border)' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
          EventScale Pro
        </p>
        <p style={{ fontSize: '0.68rem', fontWeight: 600, color: 'var(--accent-pop)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '0.2rem' }}>
          Enterprise Tier
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        {navItems.map(({ icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link key={label} href={href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--r-md)',
                  cursor: 'pointer',
                  transition: 'all var(--t)',
                  background: isActive ? 'var(--surface-low)' : 'transparent',
                  color: isActive ? 'var(--ink)' : 'var(--ink-soft)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: '0.82rem',
                }}
                onMouseEnter={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'var(--surface-low)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; } }}
                onMouseLeave={e => { if (!isActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)'; } }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {icon}
                </span>
                <span>{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <Link href="/" style={{ textDecoration: 'none', marginTop: '1rem' }}>
        <button
          style={{
            width: '100%',
            padding: '0.65rem',
            background: 'var(--ink)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--r-md)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            transition: 'opacity var(--t)',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>add</span>
          Post Requirement
        </button>
      </Link>

      {/* Bottom */}
      <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--surface-border)', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
        {[
          { icon: 'help', label: 'Help Center' },
          { icon: 'logout', label: 'Log Out' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.6rem 0.75rem',
              borderRadius: 'var(--r-md)',
              cursor: 'pointer',
              color: 'var(--ink-soft)',
              fontSize: '0.82rem',
              fontWeight: 500,
              transition: 'all var(--t)',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--surface-low)'; (e.currentTarget as HTMLElement).style.color = 'var(--ink)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--ink-soft)'; }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
