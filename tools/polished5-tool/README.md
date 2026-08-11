# Polished 5/5 Responses — web tool

A small full-stack web app that automates the [`polished-5-5-responses/`](../../polished-5-5-responses/) archiving workflow. Paste a raw tutoring transcript, and it classifies, reformats, and commits it to a GitHub repo automatically — no manual copy-pasting into `incoming/`, no manual template filling.

**This tool is designed to be forked.** It does not hard-code any particular GitHub account — you configure which repo it writes to via environment variables, so if you fork [`toefl-2026-writing-speaking`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking) (or just its `polished-5-5-responses/` folder layout into your own repo), you can point this tool at *your own fork* and it will commit your archived responses there — never into the original author's repo.

## What it does

1. You paste the whole exchange with your AI tutor into the textarea — the original TOEFL prompt, your raw draft, and the AI-polished final version, in any order, with any extra commentary mixed in. Formatting doesn't matter.
2. An LLM call classifies the content into one of the four task types (`write-an-email`, `academic-discussion`, `interview`, `listen-and-repeat`) and reformats it into the matching archive template from [`polished-5-5-responses/README.md`](../../polished-5-5-responses/README.md).
3. The formatted markdown is committed directly to `<archive-root>/<task-type>/NNN-topic-slug.md` in **your configured repo** via the GitHub API, with the next sequential index number for that folder computed automatically.
4. The page shows a running "Archive log" of everything committed so far, pulled from a local submissions table (for fast list rendering — the repo files themselves are always the source of truth).

There is no manual review or confirmation step by design — this is meant to be a fast, frictionless capture tool. If a submission comes out wrong, edit the committed `.md` file directly in the repo afterward.

## Stack

- **Frontend:** React + Vite + Tailwind CSS + shadcn/ui, TanStack Query for data fetching.
- **Backend:** Express, SQLite (via `better-sqlite3` + Drizzle ORM) for the local submissions log.
- **Classification:** Anthropic SDK (Claude), using tool-calling with a strict JSON schema — not free-form JSON-in-text — so large markdown fields with quotes/special characters don't break parsing.
- **GitHub commits:** shells out to the `gh` CLI rather than calling the REST API directly, so it can reuse whatever GitHub auth is already configured on the machine (a personal access token via `gh auth login`, or an existing `gh` session).

## Setting it up for your own fork

1. **Fork the repo.** Fork [`toefl-2026-writing-speaking`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking) (which includes this tool) — or copy just the `polished-5-5-responses/` folder structure into your own existing repo. Either way, note your GitHub username and the repo name.

2. **Authenticate `gh` as yourself:**
   ```bash
   gh auth login
   gh auth status   # confirm it shows YOUR account, not the original author's
   ```
   The tool always uses whatever `gh` account is active in its environment — it never carries over anyone else's credentials.

3. **Configure the target repo.** Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cd tools/polished5-tool
   cp .env.example .env
   ```
   ```env
   ANTHROPIC_API_KEY=sk-ant-...
   GITHUB_REPO_OWNER=your-github-username
   GITHUB_REPO_NAME=toefl-2026-writing-speaking
   GITHUB_REPO_BRANCH=main
   ARCHIVE_ROOT_FOLDER=polished-5-5-responses
   ```
   Only `ANTHROPIC_API_KEY`, `GITHUB_REPO_OWNER`, and `GITHUB_REPO_NAME` are required — the other two default to `main` and `polished-5-5-responses` if omitted. If you renamed the archive folder in your fork, update `ARCHIVE_ROOT_FOLDER` to match.

4. **Install and run:**
   ```bash
   npm install
   npm run db:push -- --force   # one-time: create the local SQLite schema
   npm run dev
   ```
   This starts the app on `http://localhost:5000`. The header will show `your-username/toefl-2026-writing-speaking` (pulled live from your `.env`) to confirm it's pointed at the right place before you paste anything real.

## Deploying

```bash
npm run build
NODE_ENV=production node dist/index.cjs
```

The production server needs the same environment variables as above (`ANTHROPIC_API_KEY`, `GITHUB_REPO_OWNER`, `GITHUB_REPO_NAME`, and optionally `GITHUB_REPO_BRANCH` / `ARCHIVE_ROOT_FOLDER`) plus a working `gh` auth session, all available in its runtime environment.

## Notes

- The `data.db` SQLite file (submissions log) is intentionally **not** committed — see `.gitignore`. It's local cache only; nothing is lost if it's deleted, since every real submission is already committed to your repo as markdown.
- If GitHub commits start failing with a 401, it's almost always the `gh` auth session that expired or was revoked, not a bug in this code — run `gh auth status` to check.
- Nothing in this tool's code references a specific GitHub account by default anymore except as a fallback for local development on the original author's machine — always set `GITHUB_REPO_OWNER` / `GITHUB_REPO_NAME` explicitly for your own fork.
