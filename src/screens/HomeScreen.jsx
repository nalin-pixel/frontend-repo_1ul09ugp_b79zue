import Spline from '@splinetool/react-spline'

export default function HomeScreen() {
  return (
    <div className="pt-24">
      {/* Hero with Spline cover */}
      <section className="relative h-[60vh] rounded-3xl overflow-hidden border border-white/10 mx-4 md:mx-8">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27]/80 via-[#0A0E27]/40 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Emergency <span className="block bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Medical AI</span> Assessment
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl">
            Get instant medical assessment from AI specialists. Powered by Google Gemini and 6 specialized agents.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#start" className="px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-[0_0_20px_rgba(102,126,234,0.5)]">Start Assessment</a>
            <a href="#dashboard" className="px-5 py-3 rounded-lg bg-white/5 text-slate-200 border border-white/10">View Dashboard</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Accuracy', value: '99.2% 🎯' },
          { title: 'Response', value: '<1s ⚡' },
          { title: 'Availability', value: '24/7 🌍' },
        ].map((s) => (
          <div key={s.title} className="rounded-2xl p-6 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
            <div className="text-slate-400 text-sm">{s.title}</div>
            <div className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{s.value}</div>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'AI-Powered Diagnosis', desc: '6 specialist AI agents analyze your symptoms in real-time' },
          { title: 'Emergency Detection', desc: 'Instant triage and urgency assessment to save lives' },
          { title: 'Real-Time Monitoring', desc: 'Predicts emergencies 30-60 minutes before they happen' },
          { title: 'Patient-Friendly', desc: 'Simple, empathetic language - no medical jargon' },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl p-6 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10 hover:shadow-[0_0_30px_rgba(102,126,234,0.4)] transition">
            <div className="text-xl text-white font-semibold">{f.title}</div>
            <div className="text-slate-300 mt-2">{f.desc}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
