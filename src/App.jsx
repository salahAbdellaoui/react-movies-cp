import React, { useEffect, useMemo, useState } from 'react'
import Filter from './components/Filter'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'
import MovieDetailsModal from './components/MovieDetailsModal'
import { loadMovies, saveMovies, addMovieWithId } from './models/movies'

/**
 * App
 * Top-level component managing application state: movie list, filters, and add flow.
 */

export default function App() {
  // Initialize from localStorage (falls back to seeds inside loadMovies)
  const [movies, setMovies] = useState(() => loadMovies())
  const [titleFilter, setTitleFilter] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [selected, setSelected] = useState(null)

  // Derive filtered list whenever movies or filters change
  const filteredMovies = useMemo(() => {
    const t = titleFilter.trim().toLowerCase()
    return movies.filter((m) => {
      const matchesTitle = !t || m.title.toLowerCase().includes(t)
      const matchesRating = m.rating >= minRating
      return matchesTitle && matchesRating
    })
  }, [movies, titleFilter, minRating])

  // Persist movies on change
  useEffect(() => {
    saveMovies(movies)
  }, [movies])

  // Add a new movie using model helper for id + normalization
  const addMovie = (movie) => {
    setMovies((prev) => addMovieWithId(prev, movie))
  }

  const openDetails = (movie) => setSelected(movie)
  const closeDetails = () => setSelected(null)

  return (
    <div>
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="container-pro py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">🎬 Movie Showcase</h1>
          <div className="hidden sm:block text-sm text-slate-400">React + Hooks + Tailwind</div>
        </div>
      </header>
      <main className="container-pro py-8 space-y-8">
        <Filter
          title={titleFilter}
          onTitleChange={setTitleFilter}
          minRating={minRating}
          onMinRatingChange={setMinRating}
        />
        <AddMovie onAdd={addMovie} />
        <MovieList movies={filteredMovies} onDetails={openDetails} />
      </main>
      <footer className="mt-16 py-8 text-center text-xs text-slate-500">
        Built with React, Vite & Tailwind. © {new Date().getFullYear()}
      </footer>

      <MovieDetailsModal open={!!selected} movie={selected} onClose={closeDetails} />
    </div>
  )
}
