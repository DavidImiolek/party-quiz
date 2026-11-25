import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'partyquiz2024'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true')
      navigate('/host/create')
    } else {
      setError('Falsches Passwort')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">🔒 Host Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="password"
          placeholder="Admin-Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-center text-lg placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={!password}
          className="px-4 py-3 rounded-xl bg-violet-600 font-semibold text-lg hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Einloggen
        </button>
      </form>
    </div>
  )
}
