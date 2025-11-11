import React, { useEffect, useMemo, useState } from 'react'
import Filter from './components/Filter'
import MovieList from './components/MovieList'
import AddMovie from './components/AddMovie'
import MovieDetailsModal from './components/MovieDetailsModal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
      <a id="top" />
      <Navbar />
      <main className="container-pro py-8 space-y-8">
        <section id="filters">
          <Filter
          title={titleFilter}
          onTitleChange={setTitleFilter}
          minRating={minRating}
          onMinRatingChange={setMinRating}
          />
        </section>
        <section id="add">
          <AddMovie onAdd={addMovie} />
        </section>
        <section id="list">
          <MovieList movies={filteredMovies} onDetails={openDetails} />
        </section>
      </main>
      <Footer />

      <MovieDetailsModal open={!!selected} movie={selected} onClose={closeDetails} />
    </div>
  )
}
