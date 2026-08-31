# Deployment

## Production topology

- **Hetzner VPS**
- **Docker + Docker Compose** for orchestration
- **Caddy** reverse proxy for TLS termination
- **Cloudflare** in front for DNS, DDoS, and edge caching
- **PostgreSQL 17** in a Docker volume

## Deploy trigger

Push a version tag matching `v*.*.*` to `main`:

    git tag v3.0.0
    git push origin v3.0.0

GitHub Actions triggers the deploy workflow, which:

1. Establishes a Docker context to the VPS over SSH
2. Writes `.env` on the runner with secrets from GitHub Actions
3. Runs `docker compose up -d --build` against the remote context
4. Docker on the VPS builds new client and server images and swaps them in

## Env vars needed in production

Secrets (GitHub -> Secrets):
- `DB_PASSWORD`
- `JWT_SECRET`
- `TMDB_API_KEY`
- `TURNSTILE_SECRET_KEY`
- `SSH_PRIVATE_KEY`

Variables (GitHub -> Variables):
- `PRODUCTION_HOST`
- `VITE_TURNSTILE_SITE_KEY` (public, embedded in client bundle)
- `VITE_API_URL` (public)
- `JWT_LIFE`

## Cloudflare configuration

- Bot Fight Mode: **off**
- JS Detections: bypassed via `Cache-Control: no-transform` header
- Turnstile widget for auth-endpoint bot protection

## Caddy config

Located at `docker/caddy/Caddyfile`. Handles two hostnames
(`flick.lingon.cloud`, `flick-api.lingon.cloud`), TLS via Cloudflare
origin certs, and security headers.