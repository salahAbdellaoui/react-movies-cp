import React from 'react'

/**
 * StarRating
 * Displays a visual star rating with optional half-star support.
 * Props:
 * - value: current rating value (number)
 * - outOf: max rating (default 5)
 * - size: star icon size in px
 */
export default function StarRating({ value = 0, outOf = 5, size = 18 }) {
  // Derive full/half/empty star counts from the value
  const full = Math.floor(value)
  const half = value % 1 >= 0.5
  const empty = outOf - full - (half ? 1 : 0)

  // Small inline Star SVG component with different fill styles per type
  const Star = ({ type }) => {
    const fill = type === 'full' ? '#fbbf24' : type === 'half' ? 'url(#half)' : 'none'
    const stroke = '#fbbf24'
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={fill}
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block"
        aria-hidden="true"
     >
        {type === 'half' && (
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
        )}
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }

  return (
    <span aria-label={`Rating ${value} out of ${outOf}`} title={`${value} / ${outOf}`}>
      {/* Full stars */}
      {Array.from({ length: full }, (_, i) => (
        <Star key={`f-${i}`} type="full" />
      ))}
      {/* Optional half star */}
      {half && <Star type="half" />}
      {/* Remaining empty stars to reach outOf */}
      {Array.from({ length: empty }, (_, i) => (
        <Star key={`e-${i}`} type="empty" />
      ))}
    </span>
  )
}
