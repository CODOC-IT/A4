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

### Environment setup

This repo does not currently include a `.env.example` file, so create a local environment file manually:

```bash
cp .env.local.example .env.local
```

If `.env.local.example` does not exist, create .env.local with the keys below:

```env
SERVICEFLOW_SESSION_KEY=<your-session-key>
NEXT_PUBLIC_API_BASE=http://localhost:3000/api
DISPATCH_PROVIDER_TOKEN=<your-provider-token>
```

> Do not commit .env.local or any local secret files.

---

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

## Available Scripts

- `npm run dev` — start the Next.js development server
- `npm run build` — build the production application
- `npm start` — start the built production server
- `npm run lint` — run ESLint
- `npm test` — run the unit test suite
- `npm run test:watch` — run tests in watch mode

> Note: the project currently defines `lint` as `eslint source`, but the source folder is src. If `npm run lint` fails, update package.json to use `eslint src`.

---

## Project Structure

```
A4/
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── .gitignore
├── data/
│   └── bookings.json
├── public/
│   └── ...static assets...
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bookings/
│   │   │   └── dashboard/
│   │   ├── bookings/
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   └── lib/
│       ├── format.ts
│       ├── pricing.ts
│       ├── store.ts
│       └── validation.ts
├── logs/
├── tmp/
└── coverage/
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

## Important Notes

### File naming and imports

- The formatter utility lives in format.ts
- Import it as:

```ts
import { formatCurrency, formatDate } from "@/lib/format";
```

Do not import `@/lib/formats` unless that file is renamed to `formats.ts`.

### Data storage

- Booking sample data lives in bookings.json
- The README previously referenced `storage/bookings.json`; that is incorrect

---

## Environment Configuration

This project uses local environment variables.

Required variables:

- `SERVICEFLOW_SESSION_KEY`
- `NEXT_PUBLIC_API_BASE`
- `DISPATCH_PROVIDER_TOKEN`

Recommended file:

- .env.local

Ignored files should include:

- `.env`
- .env.local
- logs
- tmp
- coverage
- .next

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

## Testing

- `npm test` — run unit tests once
- `npm run test:watch` — run tests continuously

---

## Contributing

- Branch from `main` using a descriptive branch name, e.g. `feature/readme-update`
- Keep changes focused and small
- Run tests and lint before opening a PR
- Provide a summary and testing notes in the PR description

---

## Troubleshooting

### Build fails resolving `@/lib/formats`

Fix the import to:

```ts
import { formatCurrency, formatDate } from "@/lib/format";
```

### `npm run lint` fails

Verify package.json uses the correct lint target. It should point to src, not `source`.

### Missing environment values

Create .env.local manually and set the required variables. Do not commit secrets.

---

## Maintainers

- Primary maintainer: ServiceFlow team
- Review turnaround: 1–2 business days

---

## License

LICENSE.md