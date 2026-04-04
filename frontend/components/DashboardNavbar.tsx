'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/dashboard',  label: 'Dashboard' },
  { href: '/',           label: 'Post Requirement' },
  { href: '/analytics',  label: 'Analytics' },
  { href: '#',           label: 'Reports' },
];

export default function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16"
      style={{ background: 'rgba(248,249,255,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(198,198,205,0.15)' }}
    >
      <div className="flex items-center gap-12">
        <Link href="/dashboard">
          <span
            className="text-xl font-bold tracking-tighter cursor-pointer select-none"
            style={{ fontFamily: 'Manrope, sans-serif', color: '#0f0069' }}
          >
            Stitch
          </span>
        </Link>
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link key={label} href={href}>
                <span
                  className={`font-semibold tracking-tight text-sm transition-colors duration-200 cursor-pointer pb-1 ${
                    isActive ? 'text-[#4d44e3] border-b-2 border-[#4d44e3]' : 'text-slate-500 hover:text-[#4d44e3]'
                  }`}
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="material-symbols-outlined text-secondary hover:text-primary transition-all active:scale-95 text-xl">
          notifications
        </button>
        <button className="material-symbols-outlined text-secondary hover:text-primary transition-all active:scale-95 text-xl">
          settings
        </button>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white cursor-pointer select-none active:scale-95 transition-transform"
          style={{ background: 'linear-gradient(135deg, #0f0069 0%, #4d44e3 100%)' }}
        >
          JD
        </div>
      </div>
    </nav>
  );
}
