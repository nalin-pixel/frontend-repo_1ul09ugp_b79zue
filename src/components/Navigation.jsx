import { useAppStore } from '../stores/appStore'
import { Home, LayoutDashboard, Upload, Info, MessageCircleMore, Menu } from 'lucide-react'

function NavLink({ label, icon: Icon, target }) {
  const current = useAppStore((s) => s.currentScreen)
  const setCurrentScreen = useAppStore((s) => s.setCurrentScreen)
  const active = current === target
  return (
    <button
      onClick={() => setCurrentScreen(target)}
      className={`hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
        active
          ? 'bg-blue-500/20 text-blue-200 shadow-[0_0_20px_rgba(102,126,234,0.5)]'
          : 'text-slate-300 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  )
}

export default function Navigation() {
  const isLoggedIn = useAppStore((s) => s.isLoggedIn)
  const toggleChat = useAppStore((s) => s.toggleChat)
  const setCurrentScreen = useAppStore((s) => s.setCurrentScreen)

  return (
    <div className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-6xl px-4">
        <div className="h-16 mt-4 rounded-2xl bg-[rgba(26,32,44,0.6)] backdrop-blur-xl border border-white/10 flex items-center px-4">
          {/* Left: Logo */}
          <button onClick={() => setCurrentScreen('home')} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-pink-400 grid place-items-center shadow-[0_0_20px_rgba(102,126,234,0.5)]">
              <span className="font-bold text-slate-900">M</span>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">MIMIQ</span>
          </button>

          {/* Center: Links */}
          <div className="flex-1 flex justify-center gap-2">
            <NavLink label="Home" icon={Home} target="home" />
            <NavLink label="Dashboard" icon={LayoutDashboard} target="dashboard" />
            <NavLink label="Upload Reports" icon={Upload} target="upload" />
            <NavLink label="About" icon={Info} target="about" />
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggleChat} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-[0_0_20px_rgba(102,126,234,0.5)]">
              <MessageCircleMore className="w-4 h-4" />
              <span className="hidden sm:inline">Chat with AI</span>
            </button>
            <button className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-white/5">
              <Menu className="w-5 h-5" />
            </button>
            {!isLoggedIn && (
              <button className="hidden md:inline-flex px-3 py-2 rounded-lg text-slate-200 hover:bg-white/5">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
