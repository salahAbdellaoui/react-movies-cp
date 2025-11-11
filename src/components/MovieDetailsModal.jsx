import React, { useEffect, useRef } from 'react'
import StarRating from './StarRating'

/**
 * MovieDetailsModal
 * Accessible modal to show a movie's details.
 * Props:
 * - open: boolean
 * - movie: object | null
 * - onClose: () => void
 */
export default function MovieDetailsModal({ open, movie, onClose }) {
  const closeBtnRef = useRef(null)
  const panelRef = useRef(null)

  // Close on Esc key
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Focus the close button when opening
  useEffect(() => {
    if (open) {
      closeBtnRef.current?.focus()
    }
  }, [open])

  if (!open || !movie) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="movie-title"
      onMouseDown={(e) => {
        // Click outside the panel to close
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative bg-slate-800">
            <img
              src={movie.posterURL}
              alt={`${movie.title} poster`}
              className="h-64 w-full object-cover md:h-full"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?q=80&w=1200&auto=format&fit=crop'
              }}
            />
            <div className="absolute top-3 left-3 rounded-md bg-black/60 px-2 py-1 text-sm">
              <StarRating value={movie.rating} />
            </div>
          </div>
          <div className="p-6 flex flex-col">
            <h2 id="movie-title" className="text-2xl font-semibold">
              {movie.title}
            </h2>
            <p className="mt-3 text-slate-300 leading-relaxed">
              {movie.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-2 py-1">
                Rating
                <StarRating value={movie.rating} />
              </span>
            </div>

            <div className="mt-auto pt-6 flex justify-end gap-2">
              <button
                ref={closeBtnRef}
                className="btn-ghost"
                onClick={onClose}
              >
                Close
              </button>
              <a
                href={movie.posterURL}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                Open Poster
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
