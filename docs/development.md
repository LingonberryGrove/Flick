# Development

## Prerequisites

- Node 24+
- pnpm 11+
- Docker (for PostgreSQL)

## Setup

Clone the repo and install dependencies:

    git clone git@github.com:lingonberry-grove/flick.git
    cd flick
    pnpm install

Copy the environment template and fill in values:

    cp .env.example .env

For local development, use Cloudflare's Turnstile test keys (they
always pass verification):

    TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
    VITE_TURNSTILE_SITE_KEY=1x00000000000000000000AA

TMDB API key comes from [The Movie Database](https://www.themoviedb.org/settings/api).

## Running

Start the full stack:

    pnpm dev

This runs PostgreSQL in Docker (waits for healthcheck), then starts
the client and server on the host.

- Client: http://localhost:5173
- Server: http://localhost:3000
- Postgres: localhost:5432

Individual workspaces:

    pnpm dev:server
    pnpm dev:client

Stop the database when done:

    pnpm db:down

## Common commands

    pnpm test           # run server tests
    pnpm lint           # lint all workspaces

## Adding dependencies

Always add to a specific workspace:

    pnpm add <pkg> --filter @flick/client
    pnpm add <pkg> --filter @flick/server
    pnpm add -D <pkg> -w         # dev dep at repo root