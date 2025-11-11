import React, { useEffect, useState } from 'react'

/**
 * Filter Component
 * Provides UI controls to filter movies by title substring and minimum rating.
 * Props:
 * - title: current external title filter string
 * - onTitleChange: function(newTitle) => void (called after debounce)
 * - minRating: current external minimum rating number
 * - onMinRatingChange: function(newRating) => void
 */
export default function Filter({ title, onTitleChange, minRating, onMinRatingChange }) {
  // Local copy of title input with debounced sync to parent
  const [localTitle, setLocalTitle] = useState(title || '')

  // Debounce title input to avoid excessive re-renders and provide smoother typing
  useEffect(() => {
    const t = setTimeout(() => {
      onTitleChange(localTitle)
    }, 250)
    return () => clearTimeout(t)
  }, [localTitle, onTitleChange])

  return (
    <div className="card p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Title search field */}
        <div>
          <label className="label" htmlFor="title-filter">
            Search by title
          </label>
          <input
            id="title-filter"
            type="text"
            className="input"
            placeholder="e.g. Inception"
            value={localTitle}
            onChange={(e) => setLocalTitle(e.target.value)}
          />
        </div>
        {/* Minimum rating range slider */}
        <div>
          <label className="label" htmlFor="rating-filter">
            Minimum rating: <span className="text-brand-400 font-semibold">{minRating}</span>
          </label>
          <input
            id="rating-filter"
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => onMinRatingChange(Number(e.target.value))}
            className="w-full accent-brand-600"
          />
        </div>
        {/* Reset button to clear filters */}
        <div className="flex gap-2">
          <button
            className="btn-ghost flex-1"
            onClick={() => {
              setLocalTitle('')
              onMinRatingChange(0)
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
