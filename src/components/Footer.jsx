import React from 'react'

/**
 * Footer
 * Application footer with credits and quick links.
 */
export default function Footer() {
  return (
    <footer id="about" className="mt-16 border-t border-slate-800 bg-slate-900/60">
      <div className="container-pro py-10 text-center space-y-4">
        <p className="text-sm text-slate-400">
          Built with <strong>React</strong>, <strong>Vite</strong> & <strong>Tailwind</strong>. Data is local & not persisted to a server.
        </p>
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Movie Showcase. Educational demo.
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <a href="#filters" className="hover:text-brand-400 transition-colors">Filters</a>
          <a href="#add" className="hover:text-brand-400 transition-colors">Add</a>
          <a href="#list" className="hover:text-brand-400 transition-colors">List</a>
          <a
            href="https://vitejs.dev/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-brand-400 transition-colors"
          >
            Vite
          </a>
        </div>
      </div>
    </footer>
  )
}
