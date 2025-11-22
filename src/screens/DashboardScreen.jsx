import { useAppStore } from '../stores/appStore'

export default function DashboardScreen() {
  const user = useAppStore((s) => s.user) || { name: 'Guest' }
  const messages = useAppStore((s) => s.messages)

  const lastFive = messages.slice(-5)

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4 md:px-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Welcome back, {user.name}! 👋</h2>
        <p className="text-slate-300">Here's your health overview and recent activity</p>
      </div>

      {/* Stats grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Health Score', value: '92%' },
          { label: 'Heart Rate', value: '72 bpm' },
          { label: 'Stress Level', value: 'Low' },
          { label: 'Last Check', value: '2h ago' },
        ].map((c) => (
          <div key={c.label} className="rounded-2xl p-5 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
            <div className="text-slate-400 text-sm">{c.label}</div>
            <div className="text-2xl font-semibold text-white">{c.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Chat preview */}
        <div className="lg:col-span-2 rounded-2xl p-5 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-white font-semibold">AI Chat Assistant</div>
            <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white">Open Full Chat</button>
          </div>
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {lastFive.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-xl px-3 py-2 text-sm ${m.role === 'user' ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white' : 'bg-white/5 text-slate-200 border border-white/10'}`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 px-3 py-2 rounded-lg bg-white/5 text-slate-200 border border-white/10">Start New Conversation</button>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl p-5 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
          <div className="text-white font-semibold">Recent Activity</div>
          <div className="mt-4 space-y-3">
            {[
              { icon: '💬', text: 'Chat session with MIMIQ', time: '5m ago' },
              { icon: '🔬', text: 'AI analysis started', time: '25m ago' },
              { icon: '📄', text: 'Report downloaded', time: '2h ago' },
            ].map((i, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-200">
                <div className="text-xl">{i.icon}</div>
                <div className="flex-1">
                  <div>{i.text}</div>
                  <div className="text-xs text-slate-400">{i.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Run Health Check' },
          { title: 'View AI Insights' },
          { title: 'Emergency Help' },
        ].map((q) => (
          <button key={q.title} className="rounded-2xl p-5 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10 text-left text-white hover:shadow-[0_0_30px_rgba(102,126,234,0.4)]">
            {q.title}
          </button>
        ))}
      </div>
    </div>
  )
}
