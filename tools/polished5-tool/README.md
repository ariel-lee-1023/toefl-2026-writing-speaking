# Polished 5/5 Responses — web tool

A small full-stack web app that automates the [`polished-5-5-responses/`](../../polished-5-5-responses/) archiving workflow. Paste a raw tutoring transcript, and it classifies, reformats, and commits it to this repo automatically — no manual copy-pasting into `incoming/`, no manual template filling.

## What it does

1. You paste the whole exchange with your AI tutor into the textarea — the original TOEFL prompt, your raw draft, and the AI-polished final version, in any order, with any extra commentary mixed in. Formatting doesn't matter.
2. An LLM call classifies the content into one of the four task types (`write-an-email`, `academic-discussion`, `interview`, `listen-and-repeat`) and reformats it into the matching archive template from [`polished-5-5-responses/README.md`](../../polished-5-5-responses/README.md).
3. The formatted markdown is committed directly to `polished-5-5-responses/<task-type>/NNN-topic-slug.md` in this repo via the GitHub API, with the next sequential index number for that folder computed automatically.
4. The page shows a running "Archive log" of everything committed so far, pulled from a local submissions table (for fast list rendering — the repo files themselves are always the source of truth).

There is no manual review or confirmation step by design — this is meant to be a fast, frictionless capture tool. If a submission comes out wrong, edit the committed `.md` file directly in the repo afterward.

## Stack

- **Frontend:** React + Vite + Tailwind CSS + shadcn/ui, TanStack Query for data fetching.
- **Backend:** Express, SQLite (via `better-sqlite3` + Drizzle ORM) for the local submissions log.
- **Classification:** Anthropic SDK (Claude), using tool-calling with a strict JSON schema — not free-form JSON-in-text — so large markdown fields with quotes/special characters don't break parsing.
- **GitHub commits:** shells out to the `gh` CLI rather than calling the REST API directly, so it can reuse whatever GitHub auth is already configured on the machine (a personal access token via `gh auth login`, or an existing `gh` session).

## Running it locally

```bash
cd tools/polished5-tool
npm install

# One-time: create the local SQLite schema
npm run db:push -- --force

# Make sure `gh` is authenticated for this repo:
gh auth status
# If not: gh auth login

# Also required: an Anthropic API key
export ANTHROPIC_API_KEY=sk-ant-...

npm run dev
```

This starts the app on `http://localhost:5000` (Express serves both the API and the Vite dev frontend on the same port).

### Configuration

`server/github.ts` has three constants at the top you'll need if you fork this for a different repo:

```ts
const OWNER = "ariel-lee-1023";
const REPO = "toefl-2026-writing-speaking";
const BRANCH = "main";
```

The tool always writes into `polished-5-5-responses/<task-type>/` in that repo — update `server/routes.ts` (`ROOT` constant) if you want a different root folder.

## Deploying

```bash
npm run build
NODE_ENV=production node dist/index.cjs
```

The production server needs both `ANTHROPIC_API_KEY` (or equivalent Anthropic-compatible env var) and a working `gh` auth session available in its environment at runtime.

## Notes

- The `data.db` SQLite file (submissions log) is intentionally **not** committed — see `.gitignore`. It's local cache only; nothing is lost if it's deleted, since every real submission is already committed to `polished-5-5-responses/` as markdown.
- If GitHub commits start failing with a 401, it's almost always the `gh` auth session that expired or was revoked, not a bug in this code — run `gh auth status` to check.
