# 📚 BookExplorer

**Web Technologies and Mobile Environment — Implementation Phase**
Student: Soufiane Achouch | IPBeja 2026

---

## About

BookExplorer is a responsive React web application that allows users to:

- **Task 1 — Search & Browse Books**: Search the Open Library API by title or author, view a grid of results with covers, and open a detailed page for any book (description, subjects, ISBN, author info).
- **Task 2 — Manage Reading List**: Save books to a personal reading list stored in `localStorage`, view all saved books, and remove them at any time.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| React Router v6 | Client-side routing |
| CSS Modules | Scoped component styling |
| Open Library API | Book data (GET) |
| Web Storage API (localStorage) | Reading list persistence (POST/DELETE simulation) |

---

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Build for production

```bash
npm run build
npm run preview
```

---

## Project Structure

```
bookexplorer/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .module.css       # Top navigation bar
│   │   ├── Footer.jsx / .module.css       # Footer
│   │   ├── BookCard.jsx / .module.css     # Book grid card
│   │   └── UI.jsx / .module.css           # Spinner, ErrorMsg, EmptyState
│   ├── context/
│   │   └── ReadingListContext.jsx         # Global reading list state + localStorage
│   ├── hooks/
│   │   └── useSearch.js                   # Open Library API calls
│   ├── pages/
│   │   ├── HomePage.jsx / .module.css     # Task 1: Search & results
│   │   ├── BookDetailPage.jsx / .module.css  # Task 1: Book details + add to list
│   │   ├── ReadingListPage.jsx / .module.css # Task 2: Reading list management
│   │   └── NotFoundPage.jsx / .module.css   # 404 page
│   ├── styles/
│   │   └── global.css                     # Design tokens + global styles
│   ├── App.jsx                            # Router + providers
│   └── main.jsx                           # React entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## API Used

**Open Library API** — `https://openlibrary.org`

| Endpoint | Method | Purpose |
|---|---|---|
| `/search.json?title={q}` | GET | Search books by title |
| `/search.json?author={q}` | GET | Search books by author |
| `/works/{id}.json` | GET | Full book details |
| `/isbn/{isbn}.json` | GET | Book details by ISBN |
| `covers.openlibrary.org/b/id/{id}-M.jpg` | GET | Book cover image |
| `localStorage` (Web Storage API) | SET/GET/DELETE | Reading list persistence |

---

## Accessibility (WCAG Level A)

- Skip-to-main-content link on every page
- All images have descriptive `alt` text
- `aria-label`, `aria-live`, `aria-pressed`, `aria-current` used throughout
- Full keyboard navigation support
- Visible focus indicators on all interactive elements
- Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<ul>`, etc.)
- Loading and error states announced via `aria-live` regions
- Color contrast meets WCAG AA minimum (4.5:1)

---

## Features

- Responsive design — works on desktop, tablet, and mobile
- Pagination for search results (12 per page)
- Search suggestion chips on the homepage
- Toast notifications when adding/removing books
- Sticky navbar with reading list counter badge
- Empty states with helpful messages
- Error handling for API failures and no results
- Books persist in localStorage across browser sessions
