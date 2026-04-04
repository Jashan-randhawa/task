import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardSidebar from '../../components/DashboardSidebar';
import Link from 'next/link';

const chartBars = [
  { day: 'Mon', height: '48%' },
  { day: 'Tue', height: '64%' },
  { day: 'Wed', height: '72%' },
  { day: 'Thu', height: '100%', active: true },
  { day: 'Fri', height: '52%' },
  { day: 'Sat', height: '38%' },
  { day: 'Sun', height: '30%' },
];

const recentActivity = [
  {
    type: 'person',
    initials: 'SC',
    color: '#1a1a2e',
    name: 'Sarah Chen',
    action: 'applied for',
    highlight: 'Senior Solutions Architect',
    meta: '2 hours ago · New York, NY',
  },
  {
    type: 'system',
    icon: 'check_circle',
    name: 'Requirement Fulfilled:',
    action: 'Mobile Lead Engineer closed for',
    highlight: 'Project Phoenix',
    meta: '5 hours ago · System Update',
  },
  {
    type: 'person',
    initials: 'MT',
    color: '#2563eb',
    name: 'Marcus Thorne',
    action: 'moved 3 candidates to',
    highlight: 'Technical Interview',
    meta: 'Yesterday · Global Recruitment',
  },
];

const talentDist = [
  { label: 'Engineering', pct: 65 },
  { label: 'Product',     pct: 25 },
  { label: 'Design',      pct: 10 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface" style={{ fontFamily: 'var(--font-body)', color: 'var(--ink)' }}>
      <DashboardNavbar />

      <div className="flex pt-[58px] min-h-screen w-full">
        <DashboardSidebar />

        <main className="flex-1 min-w-0 p-8 xl:px-10">

          {/* Header */}
          <header className="mb-8 animate-fade-up">
            <h1
              className="text-3xl font-semibold tracking-tight mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)', letterSpacing: '-0.03em', fontWeight: 400 }}
            >
              Architect&apos;s View
            </h1>
            <p className="text-sm" style={{ color: 'var(--ink-soft)' }}>
              Welcome back — managing your elite talent pipeline and strategic reach.
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

            {/* Left / Center */}
            <div className="xl:col-span-8 space-y-6">

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: 'work',            badge: '+12%',  badgeColor: '#166534', badgeBg: '#f0fdf4',  label: 'Active Postings',      value: '24'    },
                  { icon: 'assignment_late', badge: 'New',   badgeColor: '#1d4ed8', badgeBg: '#eff6ff',  label: 'Pending Applications', value: '148'   },
                  { icon: 'hub',             badge: 'Top 5%',badgeColor: '#7e22ce', badgeBg: '#faf5ff',  label: 'Total Talent Reach',   value: '12.4k' },
                ].map(({ icon, badge, badgeColor, badgeBg, label, value }, i) => (
                  <div
                    key={label}
                    className="animate-fade-up"
                    style={{
                      background: 'var(--surface-card)',
                      borderRadius: 'var(--r-xl)',
                      border: '1px solid var(--surface-border)',
                      padding: '1.4rem 1.5rem',
                      animationDelay: `${i * 0.06}s`,
                      transition: 'box-shadow var(--t), transform var(--t)',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-md)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div
                        style={{
                          width: 38, height: 38, borderRadius: 'var(--r-md)',
                          background: 'var(--surface-low)',
                          border: '1px solid var(--surface-border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem', color: 'var(--ink-mid)' }}>{icon}</span>
                      </div>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '0.2rem 0.55rem', borderRadius: 'var(--r-full)', background: badgeBg, color: badgeColor }}>{badge}</span>
                    </div>
                    <p className="text-xs font-medium mb-1" style={{ color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem' }}>{label}</p>
                    <h3 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', color: 'var(--ink)', fontWeight: 400 }}>{value}</h3>
                  </div>
                ))}
              </div>

              {/* Application Inflow Chart */}
              <section
                style={{ background: 'var(--surface-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--surface-border)', padding: '1.75rem 2rem' }}
                className="animate-fade-up animate-fade-up-2"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-base font-semibold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                      Application Inflow
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--ink-soft)' }}>Incoming applications over the last 7 days</p>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: 'var(--r-full)', background: 'var(--surface-low)', color: 'var(--ink-soft)', border: '1px solid var(--surface-border)' }}>
                    Last 7 Days
                  </span>
                </div>

                <div className="flex items-end justify-between gap-2" style={{ height: '160px' }}>
                  {chartBars.map(({ day, height, active }) => (
                    <div key={day} className="relative group w-full h-full flex flex-col justify-end">
                      <div
                        style={{
                          height,
                          borderRadius: '6px 6px 0 0',
                          background: active ? 'linear-gradient(180deg, var(--accent) 0%, #2d2d5e 100%)' : 'var(--surface-low)',
                          border: `1px solid ${active ? 'transparent' : 'var(--surface-border)'}`,
                          transition: 'all var(--t)',
                          boxShadow: active ? '0 4px 16px rgba(26,26,46,0.2)' : 'none',
                        }}
                      />
                      <span
                        style={{
                          marginTop: '0.5rem',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          textAlign: 'center',
                          display: 'block',
                          color: active ? 'var(--ink)' : 'var(--ink-faint)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section
                style={{ background: 'var(--surface-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--surface-border)', padding: '1.75rem 2rem' }}
                className="animate-fade-up animate-fade-up-3"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-base font-semibold" style={{ color: 'var(--ink)', fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}>
                    Recent Activity
                  </h2>
                  <button style={{ fontSize: '0.77rem', fontWeight: 600, color: 'var(--accent-blue)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    View all
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  {recentActivity.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.85rem',
                        padding: '0.85rem',
                        borderRadius: 'var(--r-lg)',
                        transition: 'background var(--t)',
                        cursor: 'default',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-low)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: '50%',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          color: item.type === 'system' ? 'var(--ink-mid)' : '#fff',
                          background: item.type === 'system' ? 'var(--surface-low)' : item.color,
                          border: '1px solid var(--surface-border)',
                        }}
                      >
                        {item.type === 'system'
                          ? <span className="material-symbols-outlined" style={{ fontSize: '1rem', color: 'var(--success)' }}>check_circle</span>
                          : item.initials}
                      </div>
                      <div>
                        <p style={{ fontSize: '0.82rem', lineHeight: 1.5 }}>
                          <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{item.name} </span>
                          <span style={{ color: 'var(--ink-soft)' }}>{item.action} </span>
                          <span style={{ fontWeight: 600, color: 'var(--accent-blue)' }}>{item.highlight}</span>
                        </p>
                        <p style={{ fontSize: '0.72rem', color: 'var(--ink-faint)', marginTop: '0.2rem' }}>{item.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Sidebar */}
            <div className="xl:col-span-4 space-y-5">

              {/* Quick Actions */}
              <section
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--r-xl)',
                  background: 'var(--accent)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="animate-fade-up animate-fade-up-1"
              >
                <div style={{ position: 'absolute', top: '-30%', right: '-20%', width: '70%', aspectRatio: '1', background: 'radial-gradient(circle, rgba(232,97,26,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>
                    Quick Actions
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <Link href="/" style={{ textDecoration: 'none' }}>
                      <button
                        style={{
                          width: '100%',
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: 'var(--r-lg)',
                          padding: '0.85rem 1rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          color: '#fff',
                          cursor: 'pointer',
                          transition: 'all var(--t)',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.18)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>add_circle</span>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Post New Requirement</span>
                        </div>
                        <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', opacity: 0.6 }}>arrow_forward</span>
                      </button>
                    </Link>
                    <button
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--r-lg)',
                        padding: '0.85rem 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: 'rgba(255,255,255,0.7)',
                        cursor: 'pointer',
                        transition: 'all var(--t)',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.1rem' }}>person_search</span>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Search Talent</span>
                      </div>
                      <span className="material-symbols-outlined" style={{ fontSize: '0.9rem', opacity: 0.5 }}>arrow_forward</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Talent Distribution */}
              <section
                style={{ background: 'var(--surface-card)', borderRadius: 'var(--r-xl)', border: '1px solid var(--surface-border)', padding: '1.75rem' }}
                className="animate-fade-up animate-fade-up-2"
              >
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
                  Talent Distribution
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {talentDist.map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--ink-mid)' }}>{label}</span>
                        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>{pct}%</span>
                      </div>
                      <div style={{ height: 6, background: 'var(--surface-low)', borderRadius: 'var(--r-full)', overflow: 'hidden', border: '1px solid var(--surface-border)' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, var(--accent) 0%, #4444cc 100%)', borderRadius: 'var(--r-full)' }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', borderRadius: 'var(--r-lg)', background: 'var(--surface-low)', border: '1px solid var(--surface-border)' }}>
                  <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--ink-soft)', lineHeight: 1.6, textAlign: 'center' }}>
                    &ldquo;Scaling intelligence through human architecture.&rdquo;
                  </p>
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
