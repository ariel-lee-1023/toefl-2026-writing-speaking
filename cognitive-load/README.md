# Cognitive Load

**The Neuro-Cognitive Architecture of Active Re-Encoding.**

A universal note-taking system only works as an **Active Re-Encoding Pipeline**: raw, unstructured auditory input — a lecture, a podcast, a meeting, a conversation, regardless of source language — gets forced through a fixed schema that compels the brain to synthesize, not transcribe. The output is a TOEFL-ready L2 semantic map of the episode, not a transcript of it.

This is a companion pipeline to [`polished-5-5-responses/`](../polished-5-5-responses/): that folder archives finished **output** (drafted responses polished against the rubric); this one archives finished **input processing** (raw episodes re-encoded into structured semantic scaffolding you can review, translate from, and vocalize from later).

## The four-stage schema

Every episode, run through the host AI, is forced into exactly these four sections — the schema itself is the cognitive exercise:

1. **Prefrontal Abstraction (The Core Thesis)** — one complex English sentence synthesizing the entire episode, built around a subordinate clause (`Although...`, `While...`). Forces top-down compression before any detail is recorded.
2. **Associative Evidence Mapping (Logical Architecture)** — exactly three pillars supporting the thesis (Context/Problem, Mechanism/Intervention, Implication/Result), written strictly in English and framed as causal mechanisms (X → Y), not a list of facts.
3. **Lexical Binding (Cross-Linguistic & Academic Vocabulary)** — 3-5 high-density concepts. Source material in Chinese gets translated to its academic English equivalent; source material already in English gets redefined using TOEFL-register synonyms. Either direction, the point is binding a concept to its L2 academic form.
4. **Motor-Speech Synthesis (The TOEFL Output Drill)** — a 2-minute unscripted spoken summary of the note, with the resulting syntactic hesitation points recorded as the drill target for next time.

## Folder structure

```
cognitive-load/
├── README.md          ← this file: schema + workflow
├── _template.md        ← copy this for the manual path
├── incoming/           ← upload here — GitHub Action auto-archives on push
│   ├── README.md       ← exactly what labels/format to upload
│   └── .gitkeep
└── content/            ← archived episodes, in upload order
    ├── 001-topic-slug.md
    ├── 002-topic-slug.md
    └── ...
```

## Workflow

### Option A — upload to `incoming/` (fastest, fully automatic)

1. Feed your raw input (a lecture recording's transcript, meeting notes, a reading, a conversation) to the host AI and ask it to produce an Active Cognitive Buffer note using the four-stage schema above.
2. Save the AI's output as a `.txt` or `.md` file into [`incoming/`](incoming/), following the label format in [`incoming/README.md`](incoming/README.md).
3. Push to `main`. A GitHub Action detects the labeled sections, reformats them into the fixed template below, commits the result into [`content/`](content/) with the next sequential `NNN` index, and deletes the file from `incoming/` — no manual steps, no AI/API calls, nothing to run locally.

**Forking this repo:** this automation runs entirely inside your own fork via GitHub Actions, so it always commits to your own copy of the repo — nothing is sent anywhere else.

### Option B — manual (no automation)

1. Copy [`_template.md`](_template.md).
2. Fill in the frontmatter (`date`, `source_language`, `toefl_domain`) and the four sections.
3. Save it directly into [`content/`](content/), named `NNN-topic-slug.md` (three-digit number, increasing by processing order).

## Archive file template

```markdown
---
date: 2026-08-23
source_language: Chinese
toefl_domain: Sociology
---

# 🧠 Active Cognitive Buffer: <Short episode title>

## 1. Prefrontal Abstraction (The Core Thesis)
* **Core Thesis:** ...

## 2. Associative Evidence Mapping (Logical Architecture)
* **Pillar A (Context/Problem):** ...
* **Pillar B (Mechanism/Intervention):** ...
* **Pillar C (Implication/Result):** ...

## 3. Lexical Binding (Cross-Linguistic & Academic Vocabulary)
* Concept 1: `[Original Term]` → `[English Academic Equivalent]`
* Concept 2: `[Original Term]` → `[English Academic Equivalent]`
* Concept 3: `[Original Term]` → `[English Academic Equivalent]`

## 4. Motor-Speech Synthesis (The TOEFL Output Drill)
* **Syntactic Friction Points:** ...
```

## Relationship to `polished-5-5-responses/`

Keep the two archives conceptually separate even though the mechanics (an `incoming/` staging folder, a GitHub Action, sequential `NNN-` numbering) are the same pattern reused:

- `polished-5-5-responses/` = **output-side** practice — draft an answer, polish it against the rubric, archive the finished response.
- `cognitive-load/` = **input-side** processing — take in raw auditory/reading material in any language, force it through the re-encoding schema, archive the resulting semantic map.

Both feed the same goal (C2-level TOEFL readiness) from opposite ends of the pipeline: one trains producing L2 output, the other trains re-encoding L1/L2 input into L2-ready structure.
