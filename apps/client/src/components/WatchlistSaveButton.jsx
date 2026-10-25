import { useState } from 'react'
import { Bookmark } from 'lucide-react'

/**
 * Save/unsave toggle for the watchlist grid. Owns its saved state so
 * unsaves are "lazy" — the visual bookmark flips off but the card stays
 * in the list until the next refresh, letting the user change their mind
 * without losing position. Overlay-driven unsaves remove immediately
 * (see WatchlistPage).
 * @param {object} props - The component props.
 * @param {object} props.movie - The movie data.
 * @param {function(boolean): Promise<void>} props.onToggleSave - Called with the new saved state. Returns a promise so we can roll back on error.
 * @returns {React.ReactElement} The WatchlistSaveButton component.
 */
export default function WatchlistSaveButton ({ movie, onToggleSave }) {
  const [saved, setSaved] = useState(movie.saved ?? true)

  const handleToggle = async () => {
    const next = !saved
    setSaved(next)
    try {
      await onToggleSave(next)
    } catch {
      setSaved(!next)
    }
  }

  return (
    <button
      type='button'
      onClick={handleToggle}
      className='p-2.5 rounded-full bg-black/60 hover:bg-black/80 cursor-pointer'
      aria-label={saved ? 'Remove from watchlist' : 'Save to watchlist'}
      aria-pressed={saved}
      title={saved ? 'Remove from watchlist' : 'Save to watchlist'}
    >
      <Bookmark
        size={24}
        className={saved ? 'fill-amber-400 text-amber-400' : 'text-foreground'}
      />
    </button>
  )
}
