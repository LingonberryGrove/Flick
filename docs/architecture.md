# Architecture

## Overview

Flick is a React SPA served by nginx, backed by an Express API that
reads from PostgreSQL. In production, Caddy sits in front handling
TLS termination, and Cloudflare fronts the whole thing for DNS and
DDoS protection.

## Apps

- **apps/client**: React + Vite + Tailwind. Handles the swipe UI,
  movie discovery, watchlist, and search. Ships as a static bundle
  served by nginx.
- **apps/server**: Node.js Express API. Handles auth, user data,
  movie interactions, recommendations, and image proxying. Talks to
  PostgreSQL directly via `pg` (no ORM).

## Data flow

User loads `flick.lingon.cloud` -> Cloudflare -> Caddy -> nginx
serves built assets. Client JS makes API requests to
`flick-api.lingon.cloud` -> Cloudflare -> Caddy -> Express. Express
talks to PostgreSQL on the private Docker network.

## Auth

JWT access tokens live in memory (client state). Refresh tokens live
in httpOnly cookies scoped to the auth endpoints. Silent refresh on
page load restores sessions. Cloudflare Turnstile challenges the
register and login endpoints to prevent bot signups.

## Recommendations

Weighted scoring over user interactions (saves, favorites, ratings,
dismissals). Movies matching preferred genres, keywords, and people
score higher. Interaction weights slightly diminish over time; recent
activity weighs more than old.

## Deployment

CI builds Docker images for client and server, then deploys via
Docker context over SSH to a Hetzner VPS. Caddy config and Docker
Compose files live in `docker/`. See [deployment.md](deployment.md).