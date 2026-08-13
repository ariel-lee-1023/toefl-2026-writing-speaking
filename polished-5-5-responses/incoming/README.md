# incoming/ — upload here, get archived automatically

Drop a `.txt` or `.md` file into the matching task-type subfolder below and push it to `main`. A GitHub Action picks it up automatically, reformats it into the standard archive template, saves it into `polished-5-5-responses/<task-type>/` with the next sequential number, and deletes the file from here — no manual steps, no AI calls, nothing to run locally.

```
incoming/
├── write-an-email/
├── academic-discussion/
├── interview/
└── listen-and-repeat/
```

**Pick the folder yourself** — the automation does not guess the task type. Upload into the one that matches what you're archiving.

## What to put in the file

Just paste your content in with clear labels. The automation looks for these labels (as a markdown heading, a line ending in `:`, or `Label: content` all on one line) and slots each one into the matching section of the final archive file, in this fixed order:

1. `Prompt`
2. `Polished Response` (becomes **My Polished Response**)
3. `My Draft`
4. `Key Obstacles Holding You Back from a 5/5` (becomes **My Key Obstacles Holding You Back from a 5/5**)
5. `What Changed & Why` (becomes **My What Changed & Why**)

This applies to `write-an-email/` and `academic-discussion/`. Any label you don't include is simply left blank (`...`) in the archived file for you to fill in later. If you don't label anything at all, the automation treats the first paragraph as the Prompt and everything after it as the Polished Response.

`listen-and-repeat/` uses its own five labels instead, in this fixed order:

1. `Prompt` (a scenario line plus the numbered sentence list)
2. `Set Map` (the per-sentence table — block, chunks by type, shape and cue words, at-risk function words, at-risk endings; `Sentence Map` and `Sentence-by-Sentence Breakdown` are also recognized)
3. `Chunking & Memory Strategy` (becomes **My Chunking & Memory Strategy**)
4. `Pronunciation Focus` (becomes **My Pronunciation Focus**; `Difficulty Notes` is also recognized for backward compatibility)
5. `Self-Assessment` (becomes **My Self-Assessment** — per-sentence scores, the error tally by cause category, and the next drill)

One `Set Map` row per sentence is the whole point of the format — it is what lets you re-diagnose a set weeks later instead of re-reading a pooled list of chunks. Leave a field out and it archives as a blank skeleton you can fill in by hand later. The terminology comes from [`references/reference-course-listen-repeat-lessons.md`](../../references/reference-course-listen-repeat-lessons.md), and the AI's copy block in [`SKILL.md`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking/blob/main/SKILL.md) already emits all five labels in this order.

`interview/` is different again — see the dedicated section below.

## v1.0 limitation — one question per file (except `interview/`)

**This automation does not split multiple questions out of a single upload.** For `write-an-email/`, `academic-discussion/`, and `listen-and-repeat/`: if you did a full mock test with, say, three emails, upload each one as its own separate file (you can still batch-upload several files in the same commit — each is processed independently). A future version may add automatic splitting; for now, keep it one question per file so nothing gets misfiled.

## `interview/` is the opposite — one SESSION (all 4 questions) per file

The real Take an Interview task asks 4 connected questions back-to-back in one sitting with zero prep time — that whole session is the natural unit, not any single question inside it. So for `interview/`, do **not** upload one file per question. Instead, put all 4 questions and answers from one session into a single file, labeled like this:

```
## Q1 Prompt
...
## Q1 My Polished Response
...
## Q1 My Draft
...
## Q2 Prompt
...
## Q2 My Polished Response
...
## Q2 My Draft
...
## Q3 Prompt
...
## Q3 My Polished Response
...
## Q3 My Draft
...
## Q4 Prompt
...
## Q4 My Polished Response
...
## Q4 My Draft
...
## My Key Obstacles Holding You Back from a 5/5
...
## My What Changed & Why
...
```

`Key Obstacles` and `What Changed & Why` are session-level (one shared diagnosis for the whole session, not per-question). The automation only recognizes explicit `Q1`–`Q4` labels for interview — it does not auto-guess question boundaries from unlabeled pasted text, so an unlabeled interview upload will archive with empty (`...`) fields. Always use the labeled copy block the AI gives you after a full session (see the main [`SKILL.md`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking/blob/main/SKILL.md)), or label it yourself by hand.

## Manual alternative

You don't have to use this automation at all — Option B in [`../README.md`](../README.md) still works: stage in here by hand, ask the AI to polish against `references/`, then format and move the file into the right folder yourself.
