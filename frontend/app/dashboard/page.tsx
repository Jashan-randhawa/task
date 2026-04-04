import DashboardNavbar from '../../components/DashboardNavbar';
import DashboardSidebar from '../../components/DashboardSidebar';
import Link from 'next/link';

const chartBars = [
  { day: 'Mon', height: '50%' },
  { day: 'Tue', height: '66%' },
  { day: 'Wed', height: '75%' },
  { day: 'Thu', height: '100%', active: true },
  { day: 'Fri', height: '50%' },
  { day: 'Sat', height: '40%' },
  { day: 'Sun', height: '33%' },
];

const recentActivity = [
  {
    type: 'person',
    initials: 'SC',
    color: '#4d44e3',
    name: 'Sarah Chen',
    action: 'applied for',
    highlight: 'Senior Solutions Architect',
    meta: '2 hours ago • New York, NY',
  },
  {
    type: 'system',
    icon: 'check_circle',
    name: 'Requirement Fulfilled:',
    action: 'Mobile Lead Engineer position closed for',
    highlight: 'Project Phoenix',
    meta: '5 hours ago • System Update',
  },
  {
    type: 'person',
    initials: 'MT',
    color: '#0f0069',
    name: 'Marcus Thorne',
    action: 'moved 3 candidates to',
    highlight: 'Technical Interview',
    meta: 'Yesterday • Global Recruitment',
  },
];

const talentDist = [
  { label: 'Engineering', pct: 65, opacity: 1 },
  { label: 'Product', pct: 25, opacity: 0.7 },
  { label: 'Design', pct: 10, opacity: 0.4 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface" style={{ fontFamily: 'Inter, sans-serif', color: '#0b1c30' }}>
      <DashboardNavbar />

      <div className="flex pt-16 min-h-screen w-full">
        <DashboardSidebar />

        {/* ── Main Content ── */}
        <main className="flex-1 min-w-0 p-8 xl:px-12">

          {/* Header */}
          <header className="mb-10">
            <h1
              className="text-4xl font-extrabold tracking-tight mb-2"
              style={{ fontFamily: 'Manrope, sans-serif', color: '#0b1c30' }}
            >
              Architect&apos;s View
            </h1>
            <p className="text-sm" style={{ color: '#515f74' }}>
              Welcome back — managing your elite talent pipeline and strategic reach.
            </p>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

            {/* ── Left / Center column ── */}
            <div className="xl:col-span-9 space-y-8">

              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: 'work', badge: '+12%', badgeColor: 'bg-green-100 text-green-700', label: 'Active Postings', value: '24' },
                  { icon: 'assignment_late', badge: 'New', badgeColor: 'bg-blue-100 text-blue-700', label: 'Pending Applications', value: '148' },
                  { icon: 'hub', badge: 'Top 5%', badgeColor: 'bg-purple-100 text-purple-700', label: 'Total Talent Reach', value: '12.4k' },
                ].map(({ icon, badge, badgeColor, label, value }) => (
                  <div
                    key={label}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-default"
                    style={{ border: '1px solid rgba(198,198,205,0.15)' }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className="material-symbols-outlined p-2 rounded-lg text-[#4d44e3]"
                        style={{ background: '#dce9ff' }}
                      >
                        {icon}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>
                    </div>
                    <p className="text-sm font-medium mb-1" style={{ color: '#515f74' }}>{label}</p>
                    <h3 className="text-3xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>{value}</h3>
                  </div>
                ))}
              </div>

              {/* Application Inflow Chart */}
              <section
                className="bg-white p-8 rounded-xl shadow-sm"
                style={{ border: '1px solid rgba(198,198,205,0.15)' }}
              >
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Application Inflow</h2>
                    <p className="text-sm mt-1" style={{ color: '#515f74' }}>Incoming applications over the last 7 days</p>
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: '#e5eeff', color: '#57657b' }}
                  >
                    Last 7 Days
                  </span>
                </div>

                <div className="flex items-end justify-between h-56 w-full gap-3 mt-4 px-2">
                  {chartBars.map(({ day, height, active }) => (
                    <div key={day} className="relative group w-full h-full flex flex-col justify-end">
                      <div
                        className="rounded-t-lg w-full transition-all duration-300"
                        style={{
                          height,
                          background: active ? 'linear-gradient(180deg, #4d44e3 0%, #0f0069 100%)' : '#dce9ff',
                          boxShadow: active ? '0 4px 20px rgba(77,68,227,0.3)' : 'none',
                        }}
                      />
                      <span
                        className="mt-3 text-[10px] font-bold uppercase text-center block"
                        style={{ color: active ? '#4d44e3' : '#515f74' }}
                      >
                        {day}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section
                className="p-8 rounded-xl"
                style={{ background: '#eff4ff', border: '1px solid rgba(198,198,205,0.15)' }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold" style={{ fontFamily: 'Manrope, sans-serif' }}>Recent Activity</h2>
                  <button className="text-sm font-semibold text-[#4d44e3] hover:underline transition-all">
                    View all
                  </button>
                </div>

                <div className="space-y-4">
                  {recentActivity.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 rounded-xl transition-colors cursor-default hover:bg-white"
                    >
                      {/* Avatar */}
                      <div
                        className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{
                          background: item.type === 'system'
                            ? '#dce9ff'
                            : `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                        }}
                      >
                        {item.type === 'system'
                          ? <span className="material-symbols-outlined text-[#4d44e3]">check_circle</span>
                          : item.initials}
                      </div>

                      {/* Text */}
                      <div>
                        <p className="text-sm leading-relaxed">
                          <span className="font-bold">{item.name}</span>{' '}
                          <span style={{ color: '#45464d' }}>{item.action}</span>{' '}
                          <span className="font-semibold text-[#4d44e3]">{item.highlight}</span>
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#515f74' }}>{item.meta}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ── Right Sidebar ── */}
            <div className="xl:col-span-3 space-y-8">

              {/* Quick Actions */}
              <section
                className="p-8 rounded-xl relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f0069 0%, #4d44e3 100%)', boxShadow: '0 8px 32px rgba(77,68,227,0.3)' }}
              >
                <div className="relative z-10">
                  <h2
                    className="text-xl font-bold mb-6 text-white"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                  >
                    Quick Actions
                  </h2>
                  <div className="space-y-3">
                    <Link href="/">
                      <button className="w-full text-white rounded-xl p-4 flex items-center justify-between transition-all group active:scale-[0.98] hover:bg-white/20 mb-3"
                        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-2xl">add_circle</span>
                          <span className="font-semibold text-sm">Post New Requirement</span>
                        </div>
                        <span className="material-symbols-outlined opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                          arrow_forward
                        </span>
                      </button>
                    </Link>
                    <button className="w-full text-white rounded-xl p-4 flex items-center justify-between transition-all group active:scale-[0.98] hover:bg-white/20"
                      style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}>
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-2xl">person_search</span>
                        <span className="font-semibold text-sm">Search Talent</span>
                      </div>
                      <span className="material-symbols-outlined opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
                {/* Decorative blur blob */}
                <div
                  className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30"
                  style={{ background: '#4d44e3' }}
                />
              </section>

              {/* Talent Distribution */}
              <section
                className="bg-white p-8 rounded-xl shadow-sm"
                style={{ border: '1px solid rgba(198,198,205,0.15)' }}
              >
                <h2
                  className="text-lg font-bold mb-8"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Talent Distribution
                </h2>
                <div className="space-y-6">
                  {talentDist.map(({ label, pct, opacity }) => (
                    <div key={label} className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold uppercase tracking-wider">
                        <span style={{ color: '#515f74' }}>{label}</span>
                        <span style={{ color: '#0b1c30' }}>{pct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: '#e5eeff' }}>
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, background: '#4d44e3', opacity }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote card */}
                <div
                  className="mt-10 p-5 rounded-xl text-center"
                  style={{ background: '#f8f9ff', border: '1px solid rgba(198,198,205,0.15)' }}
                >
                  <p className="text-xs italic leading-relaxed" style={{ color: '#515f74' }}>
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
