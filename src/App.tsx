import { HashRouter, Routes, Route } from 'react-router-dom'
import JoinPage from './pages/JoinPage'
import AdminLogin from './pages/AdminLogin'
import LobbyPage from './pages/LobbyPage'

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <p className="text-slate-400">{name}</p>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-svh bg-slate-900 text-white">
        <Routes>
          {/* Player */}
          <Route path="/" element={<JoinPage />} />
          <Route path="/lobby" element={<LobbyPage />} />

          {/* Host */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/host/create" element={<Placeholder name="Create Game" />} />
          <Route path="/host/game/:gameId" element={<Placeholder name="Host Control" />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
