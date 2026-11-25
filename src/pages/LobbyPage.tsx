export default function LobbyPage() {
  const playerName = localStorage.getItem('playerName')

  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-4 p-8">
      <div className="text-6xl">🎉</div>
      <h1 className="text-3xl font-bold">Willkommen, {playerName}!</h1>
      <p className="text-slate-400">Warte auf den Host…</p>
    </div>
  )
}
