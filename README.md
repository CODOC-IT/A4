# ServiceFlow Portal

Internal portal for booking field services and assigning operations staff.

## Getting started

You need Node 18 and npm 8. Copy `.env.example` to `.env` and run:

```bash
npm ci
npm start
```

Development is available at http://localhost:8080. Booking information is stored under `storage/bookings.json`.

## Commands

- `npm run dev` starts development
- `npm run lint` checks formatting and code quality
- `npm test` runs the unit test suite

See [deployment notes](docs/deployment.md) and [API reference](docs/api.md) for more information.
