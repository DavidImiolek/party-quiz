import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function JoinPage() {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = username.trim()
    if (trimmed.length < 2 || trimmed.length > 20) {
      setError('Name muss 2–20 Zeichen lang sein')
      return
    }

    setLoading(true)
    setError('')

    const { data, error: dbError } = await supabase
      .from('players')
      .insert({ username: trimmed })
      .select('id')
      .single()

    setLoading(false)

    if (dbError || !data) {
      setError('Fehler beim Beitreten. Versuch es nochmal.')
      console.error(dbError)
      return
    }

    // Player-ID im localStorage speichern
    localStorage.setItem('playerId', data.id)
    localStorage.setItem('playerName', trimmed)
    navigate('/lobby')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-6 p-8">
      <h1 className="text-4xl font-bold tracking-tight">🎉 Party Quiz</h1>
      <p className="text-slate-400">Gib deinen Namen ein</p>
      <form onSubmit={handleJoin} className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Dein Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={20}
          autoFocus
          className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-center text-lg placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading || username.trim().length < 2}
          className="px-4 py-3 rounded-xl bg-violet-600 font-semibold text-lg hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Moment…' : 'Mitmachen'}
        </button>
      </form>
    </div>
  )
}
