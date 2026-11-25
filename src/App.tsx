import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-svh bg-slate-900 text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Host routes */}
          <Route path="/host/create" element={<Placeholder name="Create Game" />} />
          <Route path="/host/game/:gameId" element={<Placeholder name="Host Control" />} />
          {/* Player routes */}
          <Route path="/play/:gameCode" element={<Placeholder name="Player Lobby" />} />
          <Route path="/play/:gameCode/game" element={<Placeholder name="Player Game" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-6 p-8">
      <h1 className="text-5xl font-bold tracking-tight">🎉 Party Quiz</h1>
      <p className="text-slate-400 text-lg">Coming soon</p>
    </div>
  )
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <p className="text-slate-400">{name}</p>
    </div>
  )
}

export default App
