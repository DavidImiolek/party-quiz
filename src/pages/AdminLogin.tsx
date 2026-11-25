import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// SHA-256 hash of the admin password — safe to expose in public repo
const ADMIN_HASH = '97ace6c5998e5a7a4537d31486d84838a24db0e315c92870bd37d72e9c7847ce'

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const hash = await sha256(password)
    if (hash === ADMIN_HASH) {
      localStorage.setItem('isAdmin', 'true')
      navigate('/lobby')
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
