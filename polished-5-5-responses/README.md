# Polished 5/5 Responses

A collection of responses where an AI polished my original draft into a near-perfect version — **without deviating too much from my own phrasing habits** — kept for **pre-exam review** and later reuse as **teaching material**.

**Note:** nothing here is written from scratch. Every entry is the product of "my raw draft → diagnosis → AI-polished final version," so it keeps my own vocabulary and reasoning while removing the errors that were capping the score (bad collocations, broken syntax, wrong prepositions/conjunctions, etc.). `listen-and-repeat/` is the one exception — see below.

## Folder structure

```
polished-5-5-responses/
├── README.md                  ← this file: workflow + master index
├── incoming/                  ← upload here — GitHub Action auto-archives on push
│   ├── README.md              ← exactly what labels/format to upload
│   ├── write-an-email/
│   ├── academic-discussion/
│   ├── interview/
│   └── listen-and-repeat/
├── write-an-email/            ← archived: Write an Email finals
├── academic-discussion/       ← archived: Academic Discussion finals
├── listen-and-repeat/         ← archived: Listen and Repeat sentence sets
└── interview/                 ← archived: Interview finals
```

## Workflow

There are two ways to archive a response — pick either one:

### Option A — upload to `incoming/<task-type>/` (fastest, fully automatic)

Drop a `.txt` or `.md` file into the matching subfolder — [`incoming/write-an-email/`](incoming/write-an-email/), [`incoming/academic-discussion/`](incoming/academic-discussion/), [`incoming/interview/`](incoming/interview/), or [`incoming/listen-and-repeat/`](incoming/listen-and-repeat/) — and push to `main`. A GitHub Action picks it up automatically:
1. Detects whichever labeled sections you included (Prompt, Polished Response, My Draft, etc.) — no task-type guessing, since you already chose the folder.
2. Reformats it into the correct template below, in a fixed section order, leaving anything you didn't include blank.
3. Commits the finished file straight into the right folder here, with the next sequential `NNN` index, and deletes the file from `incoming/` — no manual steps, no AI/API calls, nothing to run locally.

**v1.0 limitation:** one question per file — it does not split a multi-question upload (e.g. a full mock test) into separate archive entries yet. See [`incoming/README.md`](incoming/README.md) for exactly what labels to use and more detail.

**Forking this repo:** this automation runs entirely inside your own fork via GitHub Actions, so it always commits to your own copy of the repo — nothing is sent anywhere else.

### Option B — manual (no automation)

1. **Stage it**: create a new file in `incoming/<task-type>/` (copy that folder's `../<task-type>/_template.md`), paste in the original prompt and your raw draft. Formatting doesn't need to be clean at this stage.
2. **Polish it**: have the AI diagnose the draft against `references/reference-ets-task-specs.md` (scoring rubric) and the matching `references/reference-magoosh-*.md` file (task-specific strategy), then produce a polished version — with an explanation of what changed and why.
3. **Archive it**: once polished, format it using the template below and save it into the matching task-type folder, named `NNN-topic-slug.md` (three-digit number, increasing by completion order — not by difficulty or category).
4. **Clear the scratch pad**: delete the corresponding file in `incoming/<task-type>/` once it's archived, so `incoming/` always stays effectively empty.
5. **Update the index**: add a row to the master index below.

## Archive file template (write-an-email / academic-discussion / interview)

```markdown
# <Short topic title>

## Prompt
...

## My Polished Response
...

## My Draft
...

## My Key Obstacles Holding You Back from a 5/5
- ...

## My What Changed & Why
- Word choice / collocation issues: ...
- Grammar / structure issues: ...
- Explain the fix against the relevant criterion in references/reference-ets-task-specs.md
```

Each task-type folder also has its own `_template.md` you can copy directly.

## Special format for Listen and Repeat

This task is sentence-level shadowing practice, not a "raw draft → polish" exercise, so it uses its own fixed order instead:

```markdown
# <Sentence(s) title>

## Prompt
1. ...
2. ...

## My Chunking & Memory Strategy
- Chunk 1 (...): ...
- Chunk 2 (...): ...

## My Pronunciation Focus
- Compressed function words: ...
- Word endings (-s/-ed, unreleased final consonants): ...
- Rhythm & intonation: ...

## My Self-Assessment
- Which sentences are fluent now, which still need work
```

## Master index

| # | Task Type | Topic / File | Date Completed | Notes |
|---|---|---|---|---|
| — | — | — | — | No entries archived yet — add a row once you archive one |

## Relationship to references/

`references/` is the read-only, authoritative rubric and template library (ETS scoring criteria + Magoosh strategy guides) — always polish against it. `polished-5-5-responses/` is your personal output archive. Keep them separate: don't drop personal samples into `references/`, and don't edit `references/` content while archiving a sample here.
