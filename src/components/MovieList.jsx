import React from 'react'
import MovieCard from './MovieCard'

/**
 * MovieList
 * Renders a responsive grid of MovieCard components.
 * Props:
 * - movies: Array<Movie>
 */
export default function MovieList({ movies, onDetails }) {
  if (!movies?.length) {
    return <div className="text-center text-slate-400 py-16">No movies match your filters.</div>
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} onDetails={onDetails} />
      ))}
    </div>
  )
}
