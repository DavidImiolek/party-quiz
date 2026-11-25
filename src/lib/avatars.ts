const AVATARS = [
  '🦊', '🐸', '🦄', '🐙', '🦋', '🐢', '🦩', '🐝',
  '🦁', '🐼', '🦈', '🦜', '🐳', '🦀', '🐨', '🦉',
  '🐯', '🦇', '🐬', '🦎', '🐲', '🦚', '🐡', '🦧',
  '🐺', '🦥', '🐠', '🦞', '🦆', '🐌', '🦔', '🐰',
]

export { AVATARS }

export function pickUniqueAvatar(takenAvatars: string[]): string {
  const taken = new Set(takenAvatars)
  const available = AVATARS.filter((a) => !taken.has(a))
  if (available.length === 0) {
    // Fallback: alle vergeben → zufällig aus Pool
    return AVATARS[Math.floor(Math.random() * AVATARS.length)]
  }
  return available[Math.floor(Math.random() * available.length)]
}
