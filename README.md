# 🎬 React Movie App (Vite + Tailwind)

Professional, responsive movie & TV showcase built with React Hooks, Vite, Tailwind CSS, and a simple model layer + local persistence.

## Features

| Domain | Capability |
|--------|------------|
| Data Model | Factory (`createMovie`), seeds (`seedMovies`), id helper (`getNextId`), persistence (`loadMovies` / `saveMovies`) |
| Components | `MovieCard`, `MovieList`, `Filter`, `AddMovie`, `MovieDetailsModal`, `StarRating` |
| Interactions | Add movie with validation, view details modal, filter by title (debounced) & minimum rating |
| UI/UX | Tailwind theme, accessible modal (ESC + backdrop click), keyboard focus management, responsive grid |
| Persistence | LocalStorage keeps added movies between reloads |

Each movie has: `title`, `description`, `posterURL`, `rating` (0–5, 0.5 steps).

### Details Modal
Click “Details” on any card to open an accessible modal with: poster, full description, rating badge, and external poster link. Close via ESC, backdrop click, or the Close button.

## Quick Start

## Run locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Lint and format (optional)
npm run lint
npm run format

# Build for production
npm run build
npm run preview
```

## Project Structure (Key Files)

```
src/
	App.jsx                # Root component wiring filters, list, modal, persistence
	components/
		MovieCard.jsx        # Single movie preview card
		MovieList.jsx        # Grid renderer
		Filter.jsx           # Title + rating filters (debounced)
		AddMovie.jsx         # Form to add new movies
		MovieDetailsModal.jsx# Accessible modal for details
		StarRating.jsx       # Reusable star rating display
	models/
		movies.js            # Data model & persistence helpers
	styles.css             # Tailwind layers + custom utility classes
```

## Notes & Tips

- Poster URLs rely on public TMDB images; change them if hotlinking fails.
- Validation ensures required fields and proper rating bounds.
- LocalStorage key: `movies:data` (clear it to reset to seeds).
- Accessible behaviors: ESC closes modal, focus starts on Close button.
- Feel free to extend model with genres, year, cast, etc.

## Next Ideas / Enhancements

- Edit / delete movies.
- Focus trap inside modal (currently initial focus only).
- LocalStorage versioning / migration.
- Dark/light theme toggle.
- Searching by description or tags.

## License

Educational / demo purposes. Replace assets as needed.
