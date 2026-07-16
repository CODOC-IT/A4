# ServiceFlow Portal

ServiceFlow Portal is an internal booking portal for field service operations. It provides a lightweight Next.js interface for managing bookings, viewing dashboard statistics, and updating booking status.

---

## Requirements

- Node.js 18.x
- npm 8.x
- Recommended OS: macOS, Linux, or Windows with WSL2
- No global dependencies are required beyond Node.js and npm

---

## Installation

```bash
git clone https://github.com/CODOC-IT/A4
cd A4
npm ci
```

## Quick Start

Start the development server:

```bash
npm run dev
```

Open the app in your browser at:

```
http://localhost:8080
```




---

## Architecture Overview

- app — Next.js application routes, pages, and API endpoints
- api — serverless route handlers
- bookings — booking pages, detail pages, and booking forms
- lib — shared utilities and helpers
- bookings.json — sample booking dataset
- public — static assets and icons

### Key modules

- format.ts — date and currency formatting helpers
- store.ts — data access and mock persistence
- route.ts — booking create/list API
- route.ts — dashboard statistics API

---



---

## Logging & Debugging

- Keep runtime logging out of production code.
- Remove hard-coded `console.log(...)` calls from server routes.
- Use `NODE_ENV=development` to enable development-only logging.

---

## Development Workflow

1. Clone the repo
2. Install dependencies with `npm ci`
3. Create .env.local
4. Run `npm run dev`
5. Work in app and lib
6. Run `npm test` before committing








---

## License

#LICENSE.md