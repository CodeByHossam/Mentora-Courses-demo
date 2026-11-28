---
name: deployment
description: >-
  Deploy MERN apps: Dockerfiles for Node and React, docker-compose, CI/CD with
  GitHub Actions, managed DB (Atlas) and hosts (Vercel/Render/Railway),
  environment config, health checks, release plans, and rollback. Use when
  containerizing or shipping an app. Trigger phrases: "deploy", "Dockerfile",
  "docker-compose", "CI/CD", "GitHub Actions", "Vercel", "Render", "Railway",
  "rollback", "release checklist", "health check".
---

# Deployment

Ship releases as controlled experiments: small blast radius, verifiable health,
and a rollback you've rehearsed. Automate the pipeline; deploy the same artifact
to every environment.

## When to use

- Containerizing or deploying a Node/React app.
- Setting up CI/CD or a release/deployment plan.
- Choosing or configuring a host (Vercel/Render/Railway) or DB (Atlas).
- Trigger phrases: "deploy", "Dockerfile", "docker-compose", "CI/CD",
  "GitHub Actions", "Vercel", "Render", "Railway", "rollback", "release checklist".

## Instructions

1. Build one immutable artifact; promote it across environments (no rebuilds).
2. Containerize with multi-stage Dockerfiles; run as a non-root user; small final image.
3. Separate frontend (static/CDN) from backend (Node service) and managed DB.
4. Inject config/secrets at runtime via environment, not build.
5. Add health/readiness endpoints and run migrations as a pre-deploy step.
6. Use a canary/blue-green or gradual rollout; define rollback triggers.
7. Automate test → build → deploy in CI with branch protection.

### Backend Dockerfile (multi-stage)

```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .
USER node
EXPOSE 5000
HEALTHCHECK CMD wget -qO- http://localhost:5000/health/live || exit 1
CMD ["node", "src/server.js"]
```

### docker-compose (local)

```yaml
services:
  api:
    build: ./server
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/app
    ports: ["5000:5000"]
    depends_on: [mongo]
  web:
    build: ./client
    ports: ["5173:80"]
  mongo:
    image: mongo:7
    volumes: ["mongo-data:/data/db"]
volumes: { mongo-data: {} }
```

### CI/CD (GitHub Actions)

```yaml
name: ci
on: { push: { branches: [main] }, pull_request: {} }
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint && npm test
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./scripts/deploy.sh
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
```

### Release checklist

```text
[ ] Tests/lint green on the exact commit
[ ] Migration plan + forward/backward compatibility checked
[ ] Config/secrets present in the target environment
[ ] Rollback plan + trigger defined
[ ] Deploy (canary/blue-green), watch health + error rate + p95
[ ] Smoke test critical path
[ ] Monitor window, then announce
```

## Examples

### Good — same artifact, health-gated, reversible

```bash
docker build -t api:$GIT_SHA . && docker push api:$GIT_SHA
# host pulls api:$GIT_SHA, waits for /health/ready, then shifts traffic
```

### Bad — build on prod, no health check, no rollback

```bash
git pull && npm install && npm run build   # drifts, unrepeatable
pm2 restart all                             # no readiness; silent failures
```

## Anti-patterns

| Anti-pattern | Why it hurts | Fix |
|---|---|---|
| Building per environment | Drift, "works on my machine" | Build once, promote |
| Root user in container | Security risk | Non-root `USER` |
| No health/readiness probe | Bad deploys serve traffic | Add probes + gate |
| Secrets baked into image | Leak in registry | Runtime env/secret store |
| No rollback plan | Prolonged outage | Canary + documented rollback |
| Running migrations mid-request | Race conditions | Pre-deploy migration step |
| Manual deploys | Error-prone, unaudited | Automated CI/CD |

## Related skills

- `workflow/env-and-secrets`, `workflow/incident-response`,
  `workflow/observability`,
  `engineering/migration-plan`.
