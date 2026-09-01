# Testing

## Running tests

    pnpm test

This runs migrations against the test database (defined in
`.env.test`), then runs the server test suite.

## Test structure

Tests live in `apps/server/tests/`, split into:

- **integration/** -- hit the API via supertest, mocking external services
- **unit/** -- test individual functions and models directly

Uses Node's native test runner (`node --test`) with
`--experimental-test-module-mocks` for mocking.

## Mocking external services

External services (TMDB) are mocked at the module level via
`mock.module()` so tests don't hit the network:

    await mock.module('../../src/services/tmdbServices.js', {
      namedExports: { discoverMovies: mock.fn(async () => ({ results: [] })) }
    })

## Turnstile in tests

Tests send `turnstileToken: 'test'` as a body field. CI provides
Cloudflare's always-pass secret key
(`1x0000000000000000000000000000000AA`), so verification passes
without hitting real Turnstile.