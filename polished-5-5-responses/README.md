# Polished 5/5 Responses

A collection of responses where an AI polished my original draft into a near-perfect version — **without deviating too much from my own phrasing habits** — kept for **pre-exam review** and later reuse as **teaching material**.

**Note:** nothing here is written from scratch. For listen-and-repeat, every entry is the product of "my raw draft → diagnosis → AI-polished final version," so it keeps my own vocabulary and reasoning while removing the errors that were capping the score (bad collocations, broken syntax, wrong prepositions/conjunctions, etc.) — it's also its own shape, see below. `write-an-email/`, `academic-discussion/`, and `interview/` are different: they only archive responses I've already confirmed as a 5/5, so each entry is "my confirmed 5/5 response → why it earns that score," with no raw draft or before/after diff.

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

**v1.0 limitation:** one question per file for write-an-email / academic-discussion / listen-and-repeat — it does not split a multi-question upload (e.g. a full mock test) into separate archive entries yet. **`interview/` is the opposite: one file = one full 4-question session**, never split per question — see below and [`incoming/README.md`](incoming/README.md) for exactly what labels to use and more detail.

**Forking this repo:** this automation runs entirely inside your own fork via GitHub Actions, so it always commits to your own copy of the repo — nothing is sent anywhere else.

### Option B — manual (no automation)

1. **Stage it**: create a new file in `incoming/<task-type>/` (copy that folder's `../<task-type>/_template.md`), paste in the original prompt and your raw draft. Formatting doesn't need to be clean at this stage.
2. **Polish it**: have the AI diagnose the draft against `references/reference-ets-task-specs.md` (scoring rubric) and the matching `references/reference-magoosh-*.md` file (task-specific strategy), then produce a polished version — with an explanation of what changed and why.
3. **Archive it**: once polished, format it using the template below and save it into the matching task-type folder, named `NNN-topic-slug.md` (three-digit number, increasing by completion order — not by difficulty or category).
4. **Clear the scratch pad**: delete the corresponding file in `incoming/<task-type>/` once it's archived, so `incoming/` always stays effectively empty.
5. **Update the index**: add a row to the master index below.

## Archive file template (write-an-email / academic-discussion) — confirmed-5/5 record

Both of these are different in kind from a draft-to-diagnosis pipeline: by the time a response lands here, **the human user has already confirmed it IS a 5/5 answer**. There is no draft-vs-final diagnosis step and nothing being "fixed," so this template has no `My Draft` and no `My What Changed & Why` — only a confirmation of the score and why it holds:

```markdown
# <Short topic title>

## Prompt
...

## My Polished Response
...

## My Score Explained
- ...
```
(Academic-discussion's Prompt heading reads `## Prompt (including both student posts)` since the prompt always includes both classmates' posts — otherwise the two templates are identical.)

`My Score Explained` states the confirmed 5/5 verdict directly, then names the rubric criteria (from `references/reference-ets-task-specs.md`) the response satisfies — for write-an-email: task fulfillment, appropriate register/tone, clear organization, idiomatic/error-free language, sufficient length; for academic-discussion: clear stance, engagement with both student posts by name/paraphrase, an original contribution beyond either student, coherent sequencing, sufficient length, idiomatic/error-free language — quoting the exact phrase or sentence that demonstrates each one. It is never a gap analysis and never invents a flaw.

Each task-type folder also has its own `_template.md` you can copy directly.

## Special format for Take an Interview — one SESSION per file, confirmed-5/5 record

The real Interview task presents 4 connected questions in one sitting with zero prep time. **The archive unit is the whole 4-question session, not a single question** — one interview file always contains all 4 Q&A pairs plus one shared score explanation. Like write-an-email and academic-discussion, this is a confirmed-5/5 record: by the time a session lands here, **the human user has already confirmed all 4 answers together read as a 5/5**, so there is no `My Draft` and no `My What Changed & Why` — only one shared `My Score Explained` at the end:

```markdown
# <Session topic title>

## Q1 Prompt
...

## Q1 My Polished Response
...

## Q2 Prompt
...

## Q2 My Polished Response
...

## Q3 Prompt
...

## Q3 My Polished Response
...

## Q4 Prompt
...

## Q4 My Polished Response
...

## My Score Explained
- ...
```

`My Score Explained` is session-level, covering all 4 questions together — it states the confirmed 5/5 verdict directly and names the rubric criteria (from `references/reference-ets-task-specs.md`) the session satisfies, quoting the exact phrase or sentence from the polished responses that demonstrates each one. It is never a gap analysis and never invents a flaw. The automation only recognizes explicit `Q1`–`Q4` labels for interview uploads — it will not guess question boundaries from unlabeled text.

## Special format for Listen and Repeat

This task is sentence-level shadowing practice, not a "raw draft → polish" exercise, so it uses its own fixed order instead. The `Set Map` table is the point of the format: **one row per sentence**, so that months later you can still see which chunk, which quiet function word, and which clipped ending belonged to which sentence — a pooled list across all seven loses exactly that.

```markdown
# <Sentence set title>

## Prompt
Scenario: ...

1. ...
2. ...

## Set Map
| # | Block | Chunks (type → text) | Shape & cues | Function words at risk | Endings at risk |
|---|---|---|---|---|---|
| 1 | short | action → ... · purpose → ... | bare imperative | ... | ... |
| 7 | long | <2–4 chunks> | and-serial / softened / front-loaded time-purpose / that-who or if-then | ... | ... |

## My Chunking & Memory Strategy
Why the boundaries fall where they do, and what generalizes to the next set: ...

## My Pronunciation Focus
- Compressed function words: ...
- Word endings (-s / -ed / final t-d): ...
- Rhythm & stress: ...
- Content words to say crisply: ...

## My Self-Assessment
| # | Score | What I lost | Cause category |
|---|---|---|---|
| 1 | /5 | ... | ... |

- Set score: .../5 average
- Error tally: function word ×_ · word ending ×_ · blurred content word ×_ · truncation ×_ · rhythm ×_
- Next drill: ...
```

Terminology — the chunk types (action / object / place-manner / time / purpose), the short/medium/long ladder, the four long-sentence shapes, and the five error categories — all comes from [`references/reference-course-listen-repeat-lessons.md`](../references/reference-course-listen-repeat-lessons.md). `listen-and-repeat/_template.md` carries the same structure with inline guidance comments.

**Reviewing an archived set**: read the Prompt aloud from memory first, then check yourself against the Set Map row by row, and finally scan the error tallies across several sets — a category that appears in every tally is the thing to drill, which a column of scores would never have told you.

## Master index

| # | Task Type | Topic / File | Date Completed | Notes |
|---|---|---|---|---|
| — | — | — | — | No entries archived yet — add a row once you archive one |

## Relationship to references/

`references/` is the read-only, authoritative rubric and template library (ETS scoring criteria + Magoosh strategy guides) — always polish against it. `polished-5-5-responses/` is your personal output archive. Keep them separate: don't drop personal samples into `references/`, and don't edit `references/` content while archiving a sample here.
