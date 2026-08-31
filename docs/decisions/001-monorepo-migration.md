# 001 — Consolidate three repos into a monorepo

**Date:** 2026-08-31

## Context

Flick originally spanned three GitHub repositories:

- `flick-client` — React frontend
- `flick-server` — Express API
- `flick-hub` — Docker Compose + Caddy config + deploy scripts

The split mirrored patterns seen in team environments, where each
concern is owned by a distinct group of developers. As a solo
developer working across all three, the split created significant
overhead:

- Features spanning client + server required PRs across two repos,
  merged in coordinated order
- Version drift between client (`2.1.5`) and server (`2.1.1`) was
  hard to track and unreasonable
- CI ran three separate pipelines for changes that were logically
  one change
- Local development required scripts in the hub repo to orchestrate
  building and running the other two

## Decision

Consolidated the three repos into a single monorepo at
`github.com/lingonberry-grove/flick`, structured as:

    flick/
    ├── apps/
    │   ├── client/      (from flick-client)
    │   └── server/      (from flick-server)
    ├── docker/          (from flick-hub)
    ├── docs/
    └── packages/        (empty, room for future shared code)

Chose pnpm workspaces over npm workspaces for stricter dependency
resolution and faster installs. Chose unified versioning starting
at `v3.0.0`, marking the restructure as a semantic break, with
both apps sharing one version and tag going forward.

Local development now runs PostgreSQL in Docker with the client and
server on the host, orchestrated via `pnpm dev`. Production still
runs everything in Docker.

Old repos are archived on GitHub with README pointers to the new
monorepo. Their commit history is preserved in place. The new
monorepo starts fresh without importing git history, since the
restructure involves enough path changes that historical blame would
be misleading anyway.

## Consequences

**Gained:**

- Atomic commits across client and server for coupled features
- One CI pipeline, one lockfile, one deploy trigger
- Simpler local development (`pnpm dev` at repo root)
- Cleaner mental model. One project, one version, one home

**Lost:**

- Per-app git history is now split across archived + current repos
- Slightly harder to hand off one component (client) without the rest

**Trade-offs accepted:**

- Would revisit if the project grew beyond one developer
- Would revisit if a hosting platform (Vercel, Render, etc.) required
  a specific repo layout that conflicts