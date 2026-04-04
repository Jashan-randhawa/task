'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { icon: 'leaderboard', label: 'Analytics Overview', href: '/dashboard' },
  { icon: 'work',        label: 'Job Postings',       href: '#' },
  { icon: 'group',       label: 'Talent Pool',        href: '#' },
  { icon: 'analytics',   label: 'Analytics',          href: '/analytics' },
  { icon: 'description', label: 'Contracts',          href: '#' },
  { icon: 'payments',    label: 'Payments',           href: '#' },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-[calc(100vh-64px)] w-64 bg-surface flex-col p-4 space-y-2 sticky top-16 shrink-0 border-r border-outline-variant/10">
      {/* Workspace Info */}
      <div className="mb-6 px-2 py-4">
        <p className="text-lg font-bold text-on-surface" style={{ fontFamily: 'Manrope, sans-serif' }}>
          EventScale Pro
        </p>
        <p className="text-xs font-medium text-secondary mt-0.5">Enterprise Tier</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-1">
        {navItems.map(({ icon, label, href }) => {
          const isActive = pathname === href;
          return (
            <Link key={label} href={href}>
              <div
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-[#4d44e3] shadow-sm'
                    : 'text-slate-600 hover:bg-surface-container-low hover:translate-x-1'
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {icon}
                </span>
                <span className="text-sm font-medium">{label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Create New Event CTA */}
      <Link href="/">
        <button
          className="mt-2 w-full py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 text-white transition-all hover:opacity-90 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #0f0069 0%, #4d44e3 100%)',
            boxShadow: '0 4px 14px rgba(77,68,227,0.3)',
          }}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Post New Requirement
        </button>
      </Link>

      {/* Bottom Links */}
      <div className="pt-4 space-y-1">
        {[
          { icon: 'help', label: 'Help Center' },
          { icon: 'logout', label: 'Log Out' },
        ].map(({ icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-3 p-3 text-slate-600 hover:bg-surface-container-low hover:translate-x-1 transition-all duration-200 cursor-pointer rounded-lg"
          >
            <span className="material-symbols-outlined text-xl">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
