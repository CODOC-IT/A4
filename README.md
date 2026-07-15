# ServiceFlow

ServiceFlow is a local service-booking and dispatch portal built with Next.js, TypeScript and JSON-file persistence.

## Setup

Requires Node.js 20.9 or newer and npm 10 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build`, `npm run lint`, and `npm test` before submitting changes.

## Architecture

App Router pages render the dashboard and booking views. Route handlers under `src/app/api` validate requests and call the domain/persistence modules under `src/lib`. The local `data/bookings.json` file provides development persistence. The browser sends only booking inputs; the server calculates estimates and controls status changes.
