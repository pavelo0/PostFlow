# FastFlow / PostFlow

Monorepo for **PostFlow** — a Telegram post scheduler (frontend + backend +
docs).

---

## Quick start

### Requirements

- Node.js + npm (LTS recommended)

### Install dependencies (one command)

From the repository root:

```bash
npm run fi
```

`fi` = **full install**. This command installs dependencies:

- in the root (tooling like husky/lint-staged)
- in `frontend/`
- in `backend/` (when the folder exists; if it doesn't — it will be skipped)
- in `./`

You can also run:

```bash
npm install
```

`npm install` runs the same install flow via `postinstall`.

---

## Commands

### Checks

```bash
npm run check
```

Additional (frontend):

```bash
npm run lint
npm run typecheck
npm run test
```

---

## Repository structure

- `frontend/` — React/Vite app (UI)
- `backend/` — NestJS API + queues (planned / WIP)
- `docs/` — product & technical docs, implementation checklists

---

## Documentation

Key docs:

- `docs/PostFlow_Overview.md` — product overview, MVP, strategy, costs, roadmap
- `docs/PostFlow_Tech_Spec.md` — tech spec (API, modules, deployment)
- `docs/PostFlow_Front_CHECKLIST.md` / `docs/PostFlow_Back_CHECKLIST.md` —
  implementation checklists

---

## Git conventions

### Commits

We use **Conventional Commits** in a strict format (English only):

```text
type(scope): description
```

- **type**: required, lowercase
- **scope**: optional, lowercase (e.g. `frontend`, `backend`, `docs`, `deps`)
- **description**: required, short, imperative mood, no trailing period

Supported types:

| Type       | When to use                                |
| ---------- | ------------------------------------------ |
| `feat`     | new functionality                          |
| `fix`      | bug fix                                    |
| `refactor` | refactoring without behavior change        |
| `style`    | formatting only (spaces, semicolons, etc.) |
| `test`     | add/update tests                           |
| `docs`     | documentation only                         |
| `chore`    | routine tasks (deps, configs, tooling)     |
| `perf`     | performance improvements                   |
| `ci`       | CI/CD pipeline changes                     |
| `build`    | build system changes                       |
| `revert`   | revert a previous commit                   |

Examples:

```text
feat(frontend): add scheduled posts list
fix(backend): handle empty webhook payload
docs: update setup instructions
chore(deps): bump lint-staged
```

### Pull Requests

- short “why” description
- screenshots for UI changes
- test plan (how to verify)

---

## ENV / secrets

- Do not commit real `.env*` files with secrets
- Keep examples in `.env.example` (next to the related subproject)
