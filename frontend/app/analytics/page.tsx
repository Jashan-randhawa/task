import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardSidebar from '../../components/DashboardSidebar';

/* ─── Static data ─── */
const metrics = [
  {
    icon: 'payments',
    label: 'Total Spend',
    value: '$284,500',
    badge: '+12.5%',
    badgeBg: 'rgba(107,216,203,0.2)',
    badgeColor: '#0c9488',
  },
  {
    icon: 'timer',
    label: 'Time to Hire',
    value: '14 Days',
    badge: '-2 days',
    badgeBg: 'rgba(255,218,214,0.5)',
    badgeColor: '#93000a',
  },
  {
    icon: 'star',
    label: 'Performer Rating',
    value: '4.82/5.0',
    badge: '● ELITE',
    badgeBg: 'rgba(107,216,203,0.2)',
    badgeColor: '#0c9488',
    iconFill: true,
  },
  {
    icon: 'rocket_launch',
    label: 'Active Projects',
    value: '42',
    badge: 'Active',
    badgeBg: 'rgba(107,216,203,0.2)',
    badgeColor: '#0c9488',
  },
];

const talentDist = [
  { label: 'Development', pct: 42 },
  { label: 'Design',      pct: 28 },
  { label: 'Marketing',   pct: 18 },
  { label: 'Data Science',pct: 12 },
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
    <div className="min-h-screen bg-surface" style={{ fontFamily: 'Inter, sans-serif', color: '#0b1c30' }}>
      <DashboardNavbar />

      <div className="flex pt-16 min-h-screen w-full">
        <DashboardSidebar />

        <main className="flex-1 min-w-0">

          {/* Sticky header */}
          <header
            className="sticky top-16 z-10 px-10 py-7 flex justify-between items-end"
            style={{ background: 'rgba(248,249,255,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(198,198,205,0.15)' }}
          >
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                Talent Analytics Overview
              </h1>
              <p className="text-sm mt-1" style={{ color: '#515f74' }}>
                Monitor your talent pipeline and performance metrics.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
                style={{ background: '#fff', border: '1px solid rgba(198,198,205,0.3)' }}
              >
                <span className="material-symbols-outlined text-lg" style={{ color: '#76777d' }}>calendar_today</span>
                <span>Last 30 Days</span>
                <span className="material-symbols-outlined text-lg" style={{ color: '#76777d' }}>expand_more</span>
              </div>
              <button
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors hover:bg-surface-container"
                style={{ background: '#fff', border: '1px solid rgba(198,198,205,0.3)' }}
              >
                <span className="material-symbols-outlined text-lg">download</span>
                Export Report
              </button>
            </div>
          </header>

          <div className="px-10 pb-12 pt-8 space-y-8">

            {/* Key Metrics */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map(({ icon, label, value, badge, badgeBg, badgeColor, iconFill }) => (
                <div
                  key={label}
                  className="bg-white p-6 rounded-xl hover:shadow-md transition-shadow"
                  style={{ border: '1px solid rgba(198,198,205,0.15)' }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#e5eeff' }}>
                      <span
                        className="material-symbols-outlined text-xl"
                        style={{ color: '#4d44e3', ...(iconFill ? { fontVariationSettings: "'FILL' 1" } : {}) }}
                      >
                        {icon}
                      </span>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: badgeBg, color: badgeColor }}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#515f74' }}>{label}</p>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{value}</h3>
                </div>
              ))}
            </section>

            {/* Marketplace Trends */}
            <section className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid rgba(198,198,205,0.15)' }}>
              <div className="px-8 py-6 flex justify-between items-center" style={{ borderBottom: '1px solid #eff4ff' }}>
                <div>
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Marketplace Trends</h3>
                  <p className="text-sm mt-0.5" style={{ color: '#515f74' }}>Budget vs Hiring volume comparison</p>
                </div>
                <div className="flex gap-5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#4d44e3' }} />
                    <span className="text-xs font-medium">Budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ background: '#b9c7e0' }} />
                    <span className="text-xs font-medium">Hiring</span>
                  </div>
                </div>
              </div>

              {/* Chart area */}
              <div className="relative px-8 pt-8 pb-10" style={{ height: '320px' }}>
                {/* Grid lines */}
                <div className="absolute inset-x-8 top-8" style={{ bottom: '40px' }}>
                  {[0,1,2,3,4].map(i => (
                    <div
                      key={i}
                      className="absolute w-full border-t"
                      style={{ borderColor: 'rgba(198,198,205,0.2)', top: `${i * 25}%` }}
                    />
                  ))}
                </div>

                {/* SVG line chart */}
                <svg
                  className="absolute inset-x-8 top-8"
                  style={{ bottom: '40px', width: 'calc(100% - 4rem)', height: 'calc(100% - 80px)' }}
                  viewBox="0 0 1000 240"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4d44e3" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#4d44e3" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Area */}
                  <path
                    d="M0,200 C80,170 140,185 200,175 S320,125 400,130 S520,140 600,75 S720,60 800,55 S920,80 1000,90 L1000,240 L0,240 Z"
                    fill="url(#areaGrad)"
                  />
                  {/* Budget line */}
                  <path
                    d="M0,200 C80,170 140,185 200,175 S320,125 400,130 S520,140 600,75 S720,60 800,55 S920,80 1000,90"
                    fill="none" stroke="#4d44e3" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                  />
                  {/* Hiring line */}
                  <path
                    d="M0,220 C80,200 140,210 200,205 S320,175 400,180 S520,190 600,155 S720,140 800,145 S920,160 1000,165"
                    fill="none" stroke="#b9c7e0" strokeWidth="2" strokeDasharray="8 5" strokeLinecap="round"
                  />
                  {/* Dots on budget line */}
                  {[[0,200],[200,175],[400,130],[600,75],[800,55],[1000,90]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="5" fill="#fff" stroke="#4d44e3" strokeWidth="2.5" />
                  ))}
                </svg>

                {/* Month labels */}
                <div className="absolute left-8 right-8 flex justify-between" style={{ bottom: '8px' }}>
                  {months.map(m => (
                    <span key={m} className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#c6c6cd' }}>{m}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom row */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Talent Distribution */}
              <div className="bg-white p-8 rounded-xl" style={{ border: '1px solid rgba(198,198,205,0.15)' }}>
                <div className="mb-8">
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Talent Distribution</h3>
                  <p className="text-sm mt-0.5" style={{ color: '#515f74' }}>Engagement by functional expertise</p>
                </div>
                <div className="space-y-7">
                  {talentDist.map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-semibold">{label}</span>
                        <span className="text-sm font-bold" style={{ color: '#4d44e3' }}>{pct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: '#e5eeff' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #0f0069 0%, #4d44e3 100%)' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Categories */}
              <div className="bg-white rounded-xl overflow-hidden flex flex-col" style={{ border: '1px solid rgba(198,198,205,0.15)' }}>
                <div className="p-8" style={{ borderBottom: '1px solid #eff4ff' }}>
                  <h3 className="text-lg font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Top Categories</h3>
                  <p className="text-sm mt-0.5" style={{ color: '#515f74' }}>Highest growth skills in the network</p>
                </div>
                <div className="flex-1">
                  <table className="w-full text-left">
                    <thead>
                      <tr style={{ background: 'rgba(239,244,255,0.6)' }}>
                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#c6c6cd' }}>Category</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#c6c6cd' }}>Growth</th>
                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-right" style={{ color: '#c6c6cd' }}>Avg Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCategories.map(({ name, growth, rate }) => (
                        <tr
                          key={name}
                          className="group transition-colors cursor-default"
                          style={{ borderTop: '1px solid #eff4ff' }}
                        >
                          <td className="px-8 py-5 text-sm font-semibold group-hover:text-[#4d44e3] transition-colors">{name}</td>
                          <td className="px-6 py-5">
                            <span className="text-xs font-bold flex items-center gap-1" style={{ color: '#0c9488' }}>
                              <span className="material-symbols-outlined text-sm">trending_up</span>
                              {growth}
                            </span>
                          </td>
                          <td className="px-8 py-5 text-sm font-medium text-right" style={{ color: '#45464d' }}>{rate}</td>
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
