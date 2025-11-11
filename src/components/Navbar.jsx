import React from 'react'

/**
 * Navbar
 * Sticky top navigation with brand and anchor links.
 */
export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40">
      <nav className="container-pro py-4 flex items-center justify-between" aria-label="Primary">
        <a href="#top" className="text-xl font-bold tracking-tight flex items-center gap-2">
          <span role="img" aria-label="Movies">🎬</span> Movie Showcase
        </a>
        <ul className="hidden sm:flex items-center gap-6 text-sm text-slate-300">
          <li>
            <a href="#filters" className="hover:text-white transition-colors">Filters</a>
          </li>
          <li>
            <a href="#add" className="hover:text-white transition-colors">Add Movie</a>
          </li>
          <li>
            <a href="#list" className="hover:text-white transition-colors">List</a>
          </li>
          <li>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
