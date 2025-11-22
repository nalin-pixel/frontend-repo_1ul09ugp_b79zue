export default function AboutScreen() {
  return (
    <div className="pt-24 max-w-6xl mx-auto px-4 md:px-6">
      <h2 className="text-4xl font-bold text-white">
        About <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">MIMIQ</span>
      </h2>
      <p className="text-slate-300 max-w-3xl mt-2">
        Medical Intelligence Multi-agent Inquiry Quest - An AI-powered real-time health monitoring and prevention system that saves lives by predicting emergencies before they become critical.
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Diagnostic Accuracy', value: '99.2% 🎖️' },
          { title: 'Response Time', value: '<1s ⚡' },
          { title: 'Always Available', value: '24/7 🌐' },
          { title: 'Lives Saved', value: '100K+ 💙' },
        ].map((s) => (
          <div key={s.title} className="rounded-2xl p-6 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
            <div className="text-slate-400 text-sm">{s.title}</div>
            <div className="text-2xl font-semibold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{s.value}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: '6 AI Specialists', desc: 'Each agent focuses on a medical domain' },
          { title: 'Real-Time Prediction', desc: 'Predicts emergencies before they happen' },
          { title: 'Emergency Triage', desc: 'Scores urgency (ESI 1-5)' },
          { title: 'Patient-Friendly', desc: 'Empathetic, simple language' },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl p-6 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10">
            <div className="text-white font-semibold">{f.title}</div>
            <div className="text-slate-300">{f.desc}</div>
          </div>
        ))}
      </div>

      {/* AI Team */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          '🚨 Safety Monitor - Emergency Detection',
          '❤️ Cardiologist - Heart Specialist',
          '🫁 Pulmonologist - Lung Specialist',
          '🔬 Gastroenterologist - Digestive System',
          '🦴 MSK Specialist - Bones & Muscles',
          '🎯 Triage Agent - Priority Assessment',
        ].map((t) => (
          <div key={t} className="rounded-2xl p-5 bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10 text-slate-200">
            {t}
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="mt-10 text-center text-slate-200">
        <div className="text-xl max-w-3xl mx-auto">
          Built with care for global impact. Always improving to save more lives.
        </div>
        <div className="mt-3 text-2xl">💙 🌍 🚀</div>
      </div>
    </div>
  )
}
