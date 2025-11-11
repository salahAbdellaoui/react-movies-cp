import React, { useEffect, useState } from 'react'

/**
 * AddMovie
 * Collapsible form to create a new movie object and send it to the parent via onAdd.
 *
 * Props:
 * - onAdd: function(movie) => void  // called when the form is valid and submitted
 */
export default function AddMovie({ onAdd }) {
  // Controls whether the form is visible (collapsed/expanded)
  const [open, setOpen] = useState(false)
  // Local form state for movie fields
  const [form, setForm] = useState({
    title: '',
    description: '',
    posterURL: '',
    rating: 3,
  })
  // Validation errors per field
  const [errors, setErrors] = useState({})

  /**
   * Validate current form values and collect field-specific errors.
   * Returns true if valid, false otherwise.
   */
  const validate = () => {
    const e = {}
    if (!form.title.trim()) e.title = 'Title is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!/^https?:\/\//i.test(form.posterURL)) e.posterURL = 'Valid image URL required (http/https)'
    if (form.rating < 0 || form.rating > 5) e.rating = 'Rating must be 0 to 5'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Clear errors whenever the form is closed
  useEffect(() => {
    if (!open) setErrors({})
  }, [open])

  /**
   * Handle form submission: prevent reload, validate, call onAdd, and reset form.
   */
  const submit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onAdd({ ...form })
    setForm({ title: '', description: '', posterURL: '', rating: 3 })
    setOpen(false)
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Add a new movie</h2>
        {/* Toggle the form visibility */}
        <button className="btn-primary" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Add Movie'}
        </button>
      </div>
      {open && (
        // The movie creation form
        <form className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submit} noValidate>
          <div>
            <label className="label" htmlFor="m-title">
              Title
            </label>
            <input
              id="m-title"
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            {errors.title && <p className="text-rose-400 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="label" htmlFor="m-rating">
              Rating (0-5)
            </label>
            <input
              id="m-rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              className="input"
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            />
            {errors.rating && <p className="text-rose-400 text-sm mt-1">{errors.rating}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="m-desc">
              Description
            </label>
            <textarea
              id="m-desc"
              rows="3"
              className="input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            {errors.description && (
              <p className="text-rose-400 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="label" htmlFor="m-url">
              Poster URL
            </label>
            <input
              id="m-url"
              className="input"
              placeholder="https://..."
              value={form.posterURL}
              onChange={(e) => setForm({ ...form, posterURL: e.target.value })}
            />
            {errors.posterURL && <p className="text-rose-400 text-sm mt-1">{errors.posterURL}</p>}
          </div>
          {/* Live poster preview when a valid URL is provided */}
          {/^https?:\/\//i.test(form.posterURL) && (
            <div className="md:col-span-2">
              <img
                src={form.posterURL}
                alt="Preview"
                className="h-48 w-full object-cover rounded-lg border border-slate-700"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="button" className="btn-ghost" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Movie
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
