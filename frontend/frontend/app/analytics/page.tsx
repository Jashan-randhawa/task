import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardSidebar from '../../components/DashboardSidebar';

const metrics = [
  { icon: 'payments',      label: 'Total Spend',       value: '$284,500', badge: '+12.5%', badgeBg: '#f0fdf4', badgeColor: '#166534' },
  { icon: 'timer',         label: 'Time to Hire',      value: '14 Days',  badge: '-2 days', badgeBg: '#fef2f2', badgeColor: '#991b1b' },
  { icon: 'star',          label: 'Performer Rating',  value: '4.82/5',   badge: '● ELITE', badgeBg: '#f0fdf4', badgeColor: '#166534', iconFill: true },
  { icon: 'rocket_launch', label: 'Active Projects',   value: '42',       badge: 'Active',  badgeBg: '#eff6ff', badgeColor: '#1d4ed8' },
];

const talentDist = [
  { label: 'Development',  pct: 42 },
  { label: 'Design',       pct: 28 },
  { label: 'Marketing',    pct: 18 },
  { label: 'Data Science', pct: 12 },
];

const topCategories = [
  { name: 'Cloud Architecture', growth: '+24%', rate: '$145/hr' },
  { name: 'UX Strategy',        growth: '+18%', rate: '$120/hr' },
  { name: 'Data Engineering',   growth: '+15%', rate: '$135/hr' },
  { name: 'Growth Marketing',   growth: '+11%', rate: '$110/hr' },
];

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-surface" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}>
      <DashboardNavbar />

      <div className="flex pt-[58px] min-h-screen w-full">
        <DashboardSidebar />

        <main className="flex-1 min-w-0">

          {/* Sticky header */}
          <header
            className="sticky z-10 px-8 py-5 flex justify-between items-end flex-wrap gap-3"
            style={{
              top: 58,
              background: 'rgba(245,244,240,0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid var(--surface-border)',
            }}
          >
            <div>
              <h1
                className="text-2xl font-semibold tracking-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', fontWeight: 400, letterSpacing: '-0.03em' }}
              >
                Talent Analytics
              </h1>
              <p className="text-sm mt-0.5" style={{ color: 'var(--ink-soft)' }}>
                Monitor your talent pipeline and performance metrics.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer"
                style={{ background: 'var(--surface-card)', border: '1px solid var(--surface-border)', color: 'var(--ink-mid)', fontWeight: 500 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--ink-faint)' }}>calendar_today</span>
                <span style={{ fontSize: '0.8rem' }}>Last 30 Days</span>
                <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', color: 'var(--ink-faint)' }}>expand_more</span>
              </div>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
                style={{
                  background: 'var(--surface-card)',
                  border: '1px solid var(--surface-border)',
                  color: 'var(--ink-mid)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  transition: 'all var(--t)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1rem' }}>download</span>
                Export
              </button>
            </div>
          </header>

          <div className="px-8 pb-10 pt-6 space-y-6">

            {/* Key Metrics */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map(({ icon, label, value, badge, badgeBg, badgeColor, iconFill }, i) => (
                <div
                  key={label}
                  className="animate-fade-up"
                  style={{
                    background: 'var(--surface-card)',
                    border: '1px solid var(--surface-border)',
                    borderRadius: 'var(--r-xl)',
                    padding: '1.4rem',
                    animationDelay: `${i * 0.06}s`,
                    transition: 'box-shadow var(--t), transform var(--t)',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--r-md)', background: 'var(--surface-low)', border: '1px solid var(--surface-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: '1rem', color: 'var(--ink-mid)', fontVariationSettings: iconFill ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {icon}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.67rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 'var(--r-full)', background: badgeBg, color: badgeColor }}>
                      {badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.67rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-faint)', marginBottom: '0.3rem' }}>
                    {label}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 400, color: 'var(--ink)', letterSpacing: '-0.03em' }}>
                    {value}
                  </h3>
                </div>
              ))}
            </section>

            {/* Marketplace Trends Chart */}
            <section
              className="animate-fade-up animate-fade-up-2"
              style={{ background: 'var(--surface-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--surface-border)', overflow: 'hidden' }}
            >
              <div
                className="px-7 py-5 flex justify-between items-center flex-wrap gap-3"
                style={{ borderBottom: '1px solid var(--surface-border)' }}
              >
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                    Marketplace Trends
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: 'var(--ink-soft)', fontSize: '0.8rem' }}>Budget vs Hiring volume comparison</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5">
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.77rem', fontWeight: 500, color: 'var(--ink-soft)' }}>Budget</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--surface-high)', display: 'inline-block' }} />
                    <span style={{ fontSize: '0.77rem', fontWeight: 500, color: 'var(--ink-soft)' }}>Hiring</span>
                  </div>
                </div>
              </div>

              <div className="relative px-7 pt-6 pb-8" style={{ height: 280 }}>
                {/* Grid lines */}
                <div className="absolute" style={{ inset: '24px 28px 32px' }}>
                  {[0,1,2,3,4].map(i => (
                    <div
                      key={i}
                      className="absolute w-full border-t"
                      style={{ borderColor: 'var(--surface-container)', top: `${i * 25}%` }}
                    />
                  ))}
                </div>

                <svg
                  className="absolute"
                  style={{ inset: '24px 28px 32px', width: 'calc(100% - 56px)', height: 'calc(100% - 56px)' }}
                  viewBox="0 0 1000 220"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#1a1a2e" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#1a1a2e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,190 C80,160 140,175 200,165 S320,115 400,120 S520,130 600,65 S720,50 800,45 S920,70 1000,80 L1000,220 L0,220 Z"
                    fill="url(#areaGrad)"
                  />
                  <path
                    d="M0,190 C80,160 140,175 200,165 S320,115 400,120 S520,130 600,65 S720,50 800,45 S920,70 1000,80"
                    fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  />
                  <path
                    d="M0,210 C80,192 140,202 200,197 S320,167 400,172 S520,182 600,147 S720,132 800,137 S920,152 1000,157"
                    fill="none" stroke="var(--surface-high)" strokeWidth="2" strokeDasharray="7 4" strokeLinecap="round"
                  />
                  {[[0,190],[200,165],[400,120],[600,65],[800,45],[1000,80]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="5" fill="var(--surface-card)" stroke="var(--accent)" strokeWidth="2.5" />
                  ))}
                </svg>

                <div className="absolute left-7 right-7 flex justify-between" style={{ bottom: 8 }}>
                  {months.map(m => (
                    <span key={m} style={{ fontSize: '0.6rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink-faint)' }}>{m}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom Row */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {/* Talent Distribution */}
              <div
                className="animate-fade-up animate-fade-up-2"
                style={{ background: 'var(--surface-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--surface-border)', padding: '1.75rem' }}
              >
                <div className="mb-5">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                    Talent Distribution
                  </h3>
                  <p style={{ fontSize: '0.8rem', marginTop: 2, color: 'var(--ink-soft)' }}>Engagement by functional expertise</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {talentDist.map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between items-end mb-1.5">
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink-mid)' }}>{label}</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>{pct}%</span>
                      </div>
                      <div style={{ height: 6, background: 'var(--surface-low)', borderRadius: 'var(--r-full)', overflow: 'hidden', border: '1px solid var(--surface-border)' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--accent) 0%, #4444cc 100%)', borderRadius: 'var(--r-full)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Categories */}
              <div
                className="animate-fade-up animate-fade-up-3"
                style={{ background: 'var(--surface-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--surface-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ padding: '1.75rem 1.75rem 1.25rem', borderBottom: '1px solid var(--surface-border)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
                    Top Categories
                  </h3>
                  <p style={{ fontSize: '0.8rem', marginTop: 2, color: 'var(--ink-soft)' }}>Highest growth skills in the network</p>
                </div>
                <div style={{ flex: 1 }}>
                  <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--surface-low)' }}>
                        <th style={{ padding: '0.65rem 1.75rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)' }}>Category</th>
                        <th style={{ padding: '0.65rem 1rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)' }}>Growth</th>
                        <th style={{ padding: '0.65rem 1.75rem', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-faint)', textAlign: 'right' }}>Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCategories.map(({ name, growth, rate }) => (
                        <tr
                          key={name}
                          style={{ borderTop: '1px solid var(--surface-border)', cursor: 'default', transition: 'background var(--t)' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-low)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ padding: '0.85rem 1.75rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)' }}>{name}</td>
                          <td style={{ padding: '0.85rem 1rem' }}>
                            <span style={{ fontSize: '0.77rem', fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: 3 }}>
                              <span className="material-symbols-outlined" style={{ fontSize: '0.9rem' }}>trending_up</span>
                              {growth}
                            </span>
                          </td>
                          <td style={{ padding: '0.85rem 1.75rem', fontSize: '0.82rem', fontWeight: 500, color: 'var(--ink-soft)', textAlign: 'right' }}>{rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
