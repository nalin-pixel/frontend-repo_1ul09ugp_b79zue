import { useAppStore } from './stores/appStore'
import Navigation from './components/Navigation'
import ChatBot from './components/ChatBot'
import HomeScreen from './screens/HomeScreen'
import DashboardScreen from './screens/DashboardScreen'
import UploadScreen from './screens/UploadScreen'
import AboutScreen from './screens/AboutScreen'

function App() {
  const current = useAppStore((s) => s.currentScreen)

  return (
    <div className="min-h-screen bg-[#0A0E27]">
      <Navigation />
      <main>
        {current === 'home' && <HomeScreen />}
        {current === 'dashboard' && <DashboardScreen />}
        {current === 'upload' && <UploadScreen />}
        {current === 'about' && <AboutScreen />}
      </main>
      <ChatBot />
    </div>
  )
}

export default App
