// Movies model: factory, seeds, helpers, and simple persistence

/**
 * Create a normalized movie object.
 * @param {Object} data
 * @param {number=} data.id
 * @param {string} data.title
 * @param {string} data.description
 * @param {string} data.posterURL
 * @param {number} data.rating // 0..5
 */
export function createMovie(data) {
  const title = String(data.title ?? '').trim()
  const description = String(data.description ?? '').trim()
  const posterURL = String(data.posterURL ?? '').trim()
  const ratingNum = Number.isFinite(data.rating) ? Number(data.rating) : 0
  const rating = Math.max(0, Math.min(5, ratingNum))

  return {
    id: data.id,
    title,
    description,
    posterURL,
    rating,
  }
}

/**
 * Compute next id based on current list.
 * @param {Array<{id:number}>} list
 */
export function getNextId(list) {
  return list?.length ? Math.max(...list.map((x) => Number(x.id) || 0)) + 1 : 1
}

// Seed data
export const seedMovies = [
  createMovie({
    id: 1,
    title: 'Inception',
    description:
      'A thief who steals corporate secrets through dream-sharing tech is given the inverse task of planting an idea.',
    posterURL: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    rating: 4.5,
  }),
  createMovie({
    id: 2,
    title: 'Interstellar',
    description:
      "Explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterURL: 'https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqoNM8OmMzMgc0.jpg',
    rating: 5,
  }),
  createMovie({
    id: 3,
    title: 'The Dark Knight',
    description: 'Batman faces the Joker, a criminal mastermind who thrusts Gotham into chaos.',
    posterURL: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 5,
  }),
  createMovie({
    id: 4,
    title: 'The Matrix',
    description: 'A hacker discovers reality as he knows it is a simulation and joins a rebellion.',
    posterURL: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    rating: 4.5,
  }),
  createMovie({
    id: 5,
    title: 'Breaking Bad',
    description: 'A chemistry teacher diagnosed with cancer starts producing methamphetamine.',
    posterURL: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    rating: 5,
  }),
  createMovie({
    id: 6,
    title: 'Game of Thrones',
    description:
      'Noble families vie for control of the Iron Throne while an ancient enemy returns.',
    posterURL: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg',
    rating: 4,
  }),
]

// ---------------------
// Persistence (localStorage)
// ---------------------
const STORAGE_KEY = 'movies:data'

/**
 * Load movies from localStorage, or fall back to seeds on first run.
 * Ensures items are normalized through createMovie.
 */
export function loadMovies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return [...seedMovies]
    const arr = JSON.parse(raw)
    if (!Array.isArray(arr)) return [...seedMovies]
    // Normalize and filter out invalid entries
    const normalized = arr
      .map((m) => createMovie(m))
      .map((m, idx) => ({ ...m, id: Number(m.id) || idx + 1 }))
    return normalized.length ? normalized : [...seedMovies]
  } catch {
    return [...seedMovies]
  }
}

/**
 * Save movies list to localStorage. No-op on failure (e.g., private mode).
 * @param {Array} list
 */
export function saveMovies(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // ignore persistence errors
  }
}

/**
 * Helper to add a movie with an auto id and normalization and return the new list.
 */
export function addMovieWithId(list, movie) {
  const id = getNextId(list)
  return [...list, createMovie({ ...movie, id })]
}
