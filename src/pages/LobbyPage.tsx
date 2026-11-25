import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Player = { id: string; username: string; avatar: string }

export default function LobbyPage() {
  const [players, setPlayers] = useState<Player[]>([])
  const playerName = localStorage.getItem('playerName')

  useEffect(() => {
    // Load existing players
    supabase
      .from('players' as never)
      .select('id, username, avatar')
      .then(({ data }) => {
        if (data) setPlayers(data as unknown as Player[])
      })

    // Subscribe to new players
    const channel = supabase
      .channel('lobby')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'players' },
        (payload) => {
          const newPlayer = payload.new as Player
          setPlayers((prev) => {
            if (prev.some((p) => p.id === newPlayer.id)) return prev
            return [...prev, newPlayer]
          })
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="flex flex-col items-center min-h-svh p-8">
      <h1 className="text-3xl font-bold mt-12 mb-2">🎉 Party Quiz</h1>
      <p className="text-slate-400 mb-8">
        {playerName ? `Du bist drin als ${playerName}` : 'Lobby'} — Warte auf den Host…
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 w-full max-w-lg">
        {players.map((player) => (
          <div
            key={player.id}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl ${
              player.username === playerName
                ? 'bg-violet-600/20 ring-2 ring-violet-500'
                : 'bg-slate-800'
            }`}
          >
            <span className="text-3xl">{player.avatar}</span>
            <span className="text-xs text-slate-300 truncate w-full text-center">
              {player.username}
            </span>
          </div>
        ))}
      </div>

      {players.length === 0 && (
        <p className="text-slate-500 mt-8">Noch keine Spieler…</p>
      )}

      <p className="text-slate-600 text-sm mt-8">
        {players.length} Spieler online
      </p>
    </div>
  )
}
