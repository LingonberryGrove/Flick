import { posterUrl } from '../utils/imageUtils'
import { useMovieOverlay } from '../hooks/useMovieOverlay'

/**
 * Generic movie poster card. Used across pages that show a grid of posters
 * (watchlist, favorites, etc.). Clicking anywhere on the poster opens the
 * movie overlay via a full-size activation button positioned behind the
 * corner slots — that keeps corner actions and the overlay trigger as
 * sibling interactives instead of nested ones (WCAG 2.2 AA).
 *
 * Corner slots receive clicks directly and do not bubble to the activation
 * button (they sit above it in the stacking order), so callers can drop in
 * a plain button without worrying about stopPropagation.
 * @param {object} props - The component props.
 * @param {object} props.movie - The movie data (needs tmdb_id, title, poster_path).
 * @param {React.ReactNode} [props.topLeft] - Optional action rendered in the top-left corner.
 * @param {React.ReactNode} [props.topRight] - Optional action rendered in the top-right corner.
 * @returns {React.ReactElement} The PosterCard component.
 */
export default function PosterCard ({ movie, topLeft, topRight }) {
  const { openOverlay } = useMovieOverlay()

  return (
    <div className='relative aspect-2/3 group will-change-transform rounded-lg'>
      <img
        src={posterUrl(movie.poster_path, 92)}
        srcSet={`
          ${posterUrl(movie.poster_path, 92)} 92w,
          ${posterUrl(movie.poster_path, 185)} 185w
        `}
        sizes='(max-width: 768px) 100px, 150px'
        alt={movie.title}
        className='size-full object-cover rounded-lg'
        fetchPriority='high'
      />
      <button
        type='button'
        onClick={() => openOverlay(movie.tmdb_id)}
        className='absolute inset-0 z-10 rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400'
        aria-label={`Open details for ${movie.title}`}
      />
      {topLeft && (
        <div className='absolute top-1.5 left-1.5 z-20'>
          {topLeft}
        </div>
      )}
      {topRight && (
        <div className='absolute top-1.5 right-1.5 z-20'>
          {topRight}
        </div>
      )}
    </div>
  )
}
