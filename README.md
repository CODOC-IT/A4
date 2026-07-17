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
# ServiceFlow Portal

ServiceFlow Portal is an internal booking portal for field service operations. It is built with Next.js and provides a simple interface for managing bookings, viewing basic dashboard statistics, and updating booking status.

## Table of contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick start](#quick-start)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Development notes](#development-notes)


## Features

- Create and list bookings (API + UI)
- Booking detail pages and status updates
- Small dashboard endpoint for aggregated statistics
- Lightweight, server-rendered UI using Next.js

## Prerequisites

- Node.js >= 18
- npm (bundled with Node) or compatible package manager

Recommended development platforms: macOS, Linux, or Windows with WSL2.

## Quick start

Clone and install dependencies:

```bash
git clone https://github.com/CODOC-IT/A4.git
cd A4
npm ci
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser at http://localhost:3000 (Next.js default). If you need a different port, set `PORT` in your environment.

## Available scripts

Use the npm scripts defined for common tasks:

- `npm run dev` — start development server (Next.js)
- `npm run build` — build for production
- `npm start` — start the production server
- `npm run lint` — run ESLint
- `npm test` — run tests with Vitest
- `npm run test:watch` — run tests in watch mode

## Project structure

- `app/` — Next.js app routes, pages and API routes
- `app/api/` — serverless route handlers used by the UI
- `app/bookings/` — booking pages, detail pages and forms
- `lib/` — shared utilities and helpers (formatting, validation, store)
- `public/` — static assets
- `data/bookings.json` — sample booking dataset

### Key files

- `lib/format.ts` — date and currency helpers
- `lib/store.ts` — mock data access and persistence
- `src/app/api/bookings/route.ts` — booking create/list API
- `src/app/api/dashboard/route.ts` — dashboard statistics API

## Development notes

- Use `NODE_ENV=development` for development-only logging.
- Avoid leaving `console.log` statements in server routes intended for production.
- Create a `.env.local` for environment-specific overrides (do not commit this file).







