# Polished 5/5 Responses

A collection of responses where an AI polished my original draft into a near-perfect version — **without deviating too much from my own phrasing habits** — kept for **pre-exam review** and later reuse as **teaching material**.

**Note:** nothing here is written from scratch. Every entry is the product of "my raw draft → diagnosis → AI-polished final version," so it keeps my own vocabulary and reasoning while removing the errors that were capping the score (bad collocations, broken syntax, wrong prepositions/conjunctions, etc.). `listen-and-repeat/` is the one exception — see below.

## Folder structure

```
polished-5-5-responses/
├── README.md                  ← this file: workflow + master index
├── incoming/                  ← scratch pad — only unprocessed prompt + raw draft pairs live here
│   └── _template.md
├── write-an-email/            ← archived: Write an Email finals
├── academic-discussion/       ← archived: Academic Discussion finals
├── listen-and-repeat/         ← archived: Listen and Repeat sentence sets
└── interview/                 ← archived: Interview finals
```

## Workflow

There are two ways to archive a response — pick either one:

### Option A — the web tool (fastest, fully automatic)

A small web app lives at [`tools/polished5-tool/`](../tools/polished5-tool/) in this repo. Paste the raw tutoring transcript (prompt + your draft + AI-polished version) into it, and it will:
1. Classify the task type automatically (write-an-email / academic-discussion / interview / listen-and-repeat).
2. Reformat it into the correct template below.
3. Commit the finished file straight into the right folder here, with the next sequential `NNN` index — no manual steps, no `incoming/` staging needed.

See [`tools/polished5-tool/README.md`](../tools/polished5-tool/README.md) for setup and how to run/deploy it.

### Option B — manual (no tool needed)

1. **Stage it**: create a new file in `incoming/` (copy `incoming/_template.md`), paste in the original prompt and your raw draft. Formatting doesn't need to be clean at this stage.
2. **Polish it**: have the AI diagnose the draft against `references/reference-ets-task-specs.md` (scoring rubric) and the matching `references/reference-magoosh-*.md` file (task-specific strategy), then produce a polished version — with an explanation of what changed and why.
3. **Archive it**: once polished, format it using the template below and save it into the matching task-type folder, named `NNN-topic-slug.md` (three-digit number, increasing by completion order — not by difficulty or category).
4. **Clear the scratch pad**: delete or empty the corresponding file in `incoming/` once it's archived, so `incoming/` always stays effectively empty.
5. **Update the index**: add a row to the master index below.

## Archive file template (write-an-email / academic-discussion / interview)

```markdown
# <Short topic title>

## Prompt
...

## My Draft
...

## Polished Response (final — for review & teaching)
...

## What Changed & Why
- Word choice / collocation issues: ...
- Grammar / structure issues: ...
- Explain the fix against the relevant criterion in references/reference-ets-task-specs.md

## Reusable Patterns
- Phrases or structures worth reusing in other prompts (for teaching material)
```

Each task-type folder also has its own `_template.md` you can copy directly.

## Special format for Listen and Repeat

This task is sentence-level shadowing practice, not a "raw draft → polish" exercise, so it's organized by batch instead:

```markdown
# <Sentence batch title>

## Sentences
1. ...
2. ...

## Difficulty Notes
- Linking, stress, intonation issues...

## Self-Assessment
- Which sentences are fluent now, which still need work
```

## Master index

| # | Task Type | Topic / File | Date Completed | Notes |
|---|---|---|---|---|
| — | — | — | — | No entries archived yet — add a row once you archive one |

## Relationship to references/

`references/` is the read-only, authoritative rubric and template library (ETS scoring criteria + Magoosh strategy guides) — always polish against it. `polished-5-5-responses/` is your personal output archive. Keep them separate: don't drop personal samples into `references/`, and don't edit `references/` content while archiving a sample here.
