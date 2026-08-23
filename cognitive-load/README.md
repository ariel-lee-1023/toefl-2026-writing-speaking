# Cognitive Load

**The Neuro-Cognitive Architecture of Active Re-Encoding.**

A universal note-taking system only works as an **Active Re-Encoding Pipeline**: raw, unstructured auditory input — a lecture, a podcast, a meeting, a conversation, regardless of source language — gets forced through a fixed schema that compels the brain to synthesize, not transcribe. The output is a TOEFL-ready L2 semantic map of the episode, not a transcript of it.

This is a companion pipeline to [`polished-5-5-responses/`](../polished-5-5-responses/): that folder archives finished **output** (drafted responses polished against the rubric); this one archives finished **input processing** (raw episodes re-encoded into structured semantic scaffolding — comprehension material you can draw on across reading, listening, writing, and speaking tasks alike).

## The four-field schema

Every episode, run through the host AI, is forced into exactly these fields — the schema itself is the cognitive exercise. Each one targets a specific cognitive/neurolinguistic mechanism rather than being a stylistic choice:

0. **Semantic Anchoring (Domain Metadata)** — classify the episode into one standard academic domain (Sociology, Economics, Biology, Humanities, ...). This becomes the note's `toefl_domain` frontmatter field. *Mechanism*: naming the domain primes the relevant English academic lexicon before any content is processed — the same top-down priming a TOEFL Integrated task relies on when it names its domain up front.
1. **Prefrontal Abstraction (The Core Thesis)** — one complex English sentence synthesizing the entire episode, built around a subordinate clause (`Although...`, `While...`). *Mechanism*: caps the thesis at one sentence to exercise the dlPFC's inhibitory control, actively suppressing tangential detail (neural noise) and raising the signal-to-noise ratio of the core semantic representation; the mandated subordinate clause primes the complex syntax high-scoring Integrated Writing responses require.
2. **Associative Evidence Mapping (Logical Architecture)** — exactly three pillars supporting the thesis (Context/Problem, Mechanism/Intervention, Implication/Result), written strictly in English and framed as causal mechanisms (X → Y), not a list of facts. *Mechanism*: mirrors how TOEFL academic lectures and reading passages are structured, training your predictive-processing model to anticipate the same structural transitions on test day, lowering prediction error when you meet them again.
3. **Lexical Binding (Academic Vocabulary)** — 3-5 high-density concepts. Source material in Chinese (or any non-English source) gets translated to its academic English equivalent; source material already in English gets redefined using TOEFL-register synonyms. *Mechanism*: while consuming L1 material, the L1 semantic node is highly activated and suppresses the weaker L2 lemma (lateral inhibition); binding the term to its English equivalent immediately, while the concept is still active, trains faster L2 lexical selection under the time pressure of spontaneous speech.

The whole note is written entirely in English regardless of source language — no non-English text appears anywhere in the note, including inside the Lexical Binding entries. This stops at the synthesized semantic map by design: the note is comprehension material for you to draw on across all four TOEFL skills, not a spoken-output drill, so there is no speaking-recall step required to consider it complete.

## Length calibration: Density Score and Expansion Tiers

The field *count* above never changes — that's the fixed cognitive exercise. But a fixed field count rendered at a fixed *depth* fails on dense source material: a 5-minute reading passage and a 48-minute, 19-subtopic interview shouldn't produce the same word count. So before drafting, the host AI computes a **Density Score** from the source: `D = S + W / 1500`, where `S` is the number of distinct sub-topics/sub-arguments in the source (counted from existing headers/summary sections, or estimated from speaker changes and topic-shift markers in an unlabeled transcript) and `W` is the source's total word count. `D` maps to one of four discrete **Expansion Tiers** (T1 baseline, D<5; T2 moderate, 5≤D<12; T3 high, 12≤D<20; T4 very high, D≥20), and the Tier controls how much is allowed *inside* each field — never how many fields or pillars exist:

- **Semantic Anchoring** and pillar/thesis/domain *counts* never scale — always one domain, one thesis sentence, three pillars.
- **Core Thesis** may use a second embedded subordinate clause at T3/T4 (still one sentence).
- **Pillars** may each expand from a single-hop mechanism (X → Y) to a two-hop causal chain (X → Y → Z) at T3/T4, folding related sub-arguments from a dense source into one pillar's chain rather than adding a fourth pillar.
- **Lexical Binding** count extends from the base 3-5 up to 10 at T4, since it's a list rather than a compression exercise.

The computed Tier (e.g. `T3 (D≈14)`) is recorded in the note's `tier` frontmatter field so the calibration is auditable later. Full step-by-step rules live in [`SKILL.md`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking/blob/main/SKILL.md#length-calibration-the-density-score-and-expansion-tiers).

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

1. Feed your raw input (a lecture recording's transcript, meeting notes, a reading, a conversation) to the host AI and ask it to produce an Active Cognitive Buffer note using the schema above.
2. Save the AI's output as a `.txt` or `.md` file into [`incoming/`](incoming/), following the label format in [`incoming/README.md`](incoming/README.md).
3. Push to `main`. A GitHub Action detects the labeled sections, reformats them into the fixed template below, commits the result into [`content/`](content/) with the next sequential `NNN` index, and deletes the file from `incoming/` — no manual steps, no AI/API calls, nothing to run locally.

**Forking this repo:** this automation runs entirely inside your own fork via GitHub Actions, so it always commits to your own copy of the repo — nothing is sent anywhere else.

### Option B — manual (no automation)

1. Copy [`_template.md`](_template.md).
2. Fill in the frontmatter (`date`, `toefl_domain`, `tier`) and the three sections, writing everything in English regardless of the source language.
3. Save it directly into [`content/`](content/), named `NNN-topic-slug.md` (three-digit number, increasing by processing order).

## Archive file template

```markdown
---
date: 2026-08-23
toefl_domain: Sociology
tier: T3 (D≈14)
---

# 🧠 Active Cognitive Buffer: <Short episode title>

## 1. Prefrontal Abstraction (The Core Thesis)
* **Core Thesis:** ...

## 2. Associative Evidence Mapping (Logical Architecture)
* **Pillar A (Context/Problem):** ...
* **Pillar B (Mechanism/Intervention):** ...
* **Pillar C (Implication/Result):** ...

## 3. Lexical Binding (Academic Vocabulary)
* Concept 1: `[Plain/Original English Term]` → `[TOEFL Academic Equivalent]`
* Concept 2: `[Plain/Original English Term]` → `[TOEFL Academic Equivalent]`
* Concept 3: `[Plain/Original English Term]` → `[TOEFL Academic Equivalent]`
```

All fields are written entirely in English, regardless of the source language — no Chinese or other non-English text should appear anywhere in an archived note.

## Relationship to `polished-5-5-responses/`

Keep the two archives conceptually separate even though the mechanics (an `incoming/` staging folder, a GitHub Action, sequential `NNN-` numbering) are the same pattern reused:

- `polished-5-5-responses/` = **output-side** practice — draft an answer, polish it against the rubric, archive the finished response.
- `cognitive-load/` = **input-side** processing — take in raw auditory/reading material in any language, force it through the re-encoding schema, archive the resulting semantic map.

Both feed the same goal (C2-level TOEFL readiness) from opposite ends of the pipeline: one trains producing L2 output, the other trains re-encoding L1/L2 input into L2-ready structure.
