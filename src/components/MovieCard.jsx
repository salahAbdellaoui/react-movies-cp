import React from 'react'
import StarRating from './StarRating'

/**
 * MovieCard
 * Presents a single movie with poster, rating overlay, title and truncated description.
 * Props:
 * - movie: { id, title, description, posterURL, rating }
 */
export default function MovieCard({ movie, onDetails }) {
  return (
    <div className="card flex flex-col h-full">
      {/* Poster section with rating badge */}
      <div className="relative">
        <img
          src={movie.posterURL}
          alt={`${movie.title} poster`}
          className="w-full h-64 object-cover"
          loading="lazy"
          // Fallback image if original fails to load
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop'
          }}
        />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded-md text-sm">
          <StarRating value={movie.rating} />
        </div>
      </div>
      {/* Textual content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold line-clamp-1">{movie.title}</h3>
        <p className="mt-2 text-sm text-slate-300 line-clamp-3">{movie.description}</p>
        {/* Placeholder for future details modal/navigation */}
        <div className="mt-auto pt-4">
          <button
            className="btn-ghost w-full"
            onClick={() => onDetails?.(movie)}
            aria-label={`Open details for ${movie.title}`}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  )
}
