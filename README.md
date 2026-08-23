# toefl-2026-writing-speaking

An agent skill for the **Writing** and **Speaking** sections of the 2026 TOEFL iBT — a router plus six on-demand reference files, aimed at C2-level performance. Beyond its fixed-schema features (task templates, Listen and Repeat scoring, the Active Cognitive Buffer note-taking pipeline), it also runs a **Flexible Mode** for requests that don't fit a template — personalized template design, practice-path planning from a real score, or anything requiring synthesis across the library rather than execution of one fixed procedure.

## Install

Clone into a skills root your agent reads (Claude Code shown):

```bash
git clone https://github.com/ariel-lee-1023/toefl-2026-writing-speaking.git \
  ~/.claude/skills/toefl-2026-writing-speaking
```

Other roots: `~/.copilot/skills/`, `~/.agents/skills/`, `.claude/skills/`, `.agents/skills/`.

## Layout

```
toefl-2026-writing-speaking/
├── SKILL.md
├── references/                  # read-only rubric/template library
├── polished-5-5-responses/      # personal polished drafts, for review & teaching
│   ├── incoming/                # upload here, GitHub Action auto-archives
│   │   ├── write-an-email/
│   │   ├── academic-discussion/
│   │   ├── listen-and-repeat/
│   │   └── interview/
│   ├── write-an-email/
│   ├── academic-discussion/
│   ├── listen-and-repeat/
│   └── interview/
├── semantic-consolidation-buffer/  # Active Re-Encoding Pipeline for raw input → TOEFL-ready notes
│   ├── incoming/                # upload here, GitHub Action auto-archives
│   ├── content/                 # archived episodes, in upload order
│   └── _template.md
└── .github/
    ├── workflows/archive-incoming.yml         # archives polished-5-5-responses/incoming/
    ├── workflows/archive-semantic-consolidation-buffer.yml    # archives semantic-consolidation-buffer/incoming/
    ├── scripts/archive-incoming.js             # reformats + archives polished-5-5-responses uploads
    └── scripts/archive-semantic-consolidation-buffer.js       # reformats + archives semantic-consolidation-buffer uploads
```

| File | Loaded | Contents |
|---|---|---|
| `SKILL.md` | always | Router, operating stance, cross-source topic index |
| `references/reference-ets-task-specs.md` | on demand | Official Guide Ch. 4–5 — task mechanics, 0–5 scoring guides, rated samples |
| `references/reference-ets-cefr-descriptors.md` | on demand | Section scores 1–6 mapped to CEFR A1–C2; what C2 requires |
| `references/reference-magoosh-email-templates.md` | on demand | Write an Email — 7-min plan, register ladder, 5 speech-act types |
| `references/reference-magoosh-discussion-templates.md` | on demand | Academic Discussion — 10-min plan, engaging both student posts |
| `references/reference-magoosh-interview-templates.md` | on demand | Take an Interview — the C–D–E–F 45-second shape |
| `references/reference-course-listen-repeat-lessons.md` | on demand | Listen and Repeat — the 7-sentence set map, chunking for memory, compressed function words and word endings |
| `polished-5-5-responses/` | on demand | Personal polished-response archive, kept for pre-exam review and post-exam teaching material. Upload to `incoming/<task-type>/` and a GitHub Action reformats + archives it automatically — no server, no AI/API calls. See its own [README](polished-5-5-responses/README.md) and [`incoming/README.md`](polished-5-5-responses/incoming/README.md) for the workflow. |
| `semantic-consolidation-buffer/` | on demand | The Neuro-Cognitive Architecture of Active Re-Encoding: forces raw input (a lecture, a recording, a reading — any source language) through a fixed schema (Semantic Anchoring → Prefrontal Abstraction → Associative Evidence Mapping → Lexical Binding) that produces a structured, TOEFL-ready L2 semantic map instead of a transcript — comprehension material for reading, listening, writing, and speaking alike, not a spoken-output drill. Upload to `incoming/` and the same kind of GitHub Action reformats + archives it automatically. See its own [README](semantic-consolidation-buffer/README.md) and [`incoming/README.md`](semantic-consolidation-buffer/incoming/README.md). |

Only `SKILL.md` occupies context by default; reference files load when the router points at them.

## Using this with a retrieval host (Gemini Gem, NotebookLM, ChatGPT Project)

**Important.** Agent hosts like Claude Code load `SKILL.md` into context on every turn, so its rules always fire. Retrieval hosts do not: uploading the repo as a ZIP into a Gem's *Knowledge* turns it into a **RAG corpus**, and only chunks semantically similar to your question get retrieved. Ask "write a discussion post about urban communities" and the retriever returns the content menus — a paragraph about output formatting has almost no lexical overlap with your query and may never be retrieved at all.

Every reference file therefore repeats the format rule at the top, so any retrieved chunk carries it, and each task file contains a fenced `MODEL RESPONSE` to imitate. That raises the hit rate but cannot guarantee it.

**For reliable results on a retrieval host, paste this into the system-instruction box** (Gem Instructions / Project Instructions) rather than relying on the uploaded files alone:

```
When writing any TOEFL response, output continuous prose only. Never use a title,
heading, bullet point, numbered list, bold or italic markup, or "Label:" line inside
a response. Enumerate in prose with First / Second / Finally. An email includes a
greeting and sign-off; a discussion post includes neither. Every claim needs a
concrete instance, not just a reason. Consult the uploaded library for rubrics,
task mechanics, and phrasing.
```

## Covers

**Writing** — Build a Sentence · Write an Email · Write for an Academic Discussion
**Speaking** — Listen and Repeat · Take an Interview

Not covered: Reading, Listening, registration or scoring-service logistics.

## Pairs well with: Cognitive-Neuroscience-Expert

[Cognitive-Neuroscience-Expert](https://github.com/ariel-lee-1023/Cognitive-Neuroscience-Expert.git) is a companion skill — a mechanism-oriented cognitive neuroscience knowledge library (attention, memory systems, PFC/executive function, language, model-based cognitive neuroscience). It has no built-in diagnostic feature of its own; the pairing works by pointing its mechanism knowledge at material **this** repo already has archived about you:

1. Load both skills in the same session (or point a retrieval host at both repos).
2. Ask it to analyze your own already-archived material here — your `semantic-consolidation-buffer/content/` notes (domain distribution, recurring Lexical Binding gaps) and/or your `polished-5-5-responses/*/` archive (recurring `My Diagnosis` errors across drafts) — through its mechanism frameworks (e.g. working-memory load, attentional control, executive-function bottlenecks).
3. That analysis is your **cognitive baseline profile** — an archive-derived read, not a clinical or psychometric assessment, and it should say so and name which files it drew from.
4. Feed that profile into a Flexible Mode request here, e.g. "design three academic writing templates based on my cognitive profile" or "map a practice path from my latest score." Flexible Mode (see `SKILL.md`) will use it as the personalization input instead of asking you to state your profile from scratch.

This only works if the profiling step is grounded in real archived material — neither skill should invent a profile from tone or guess representative weaknesses.

## Sources and attribution

Distilled from six sources. These files are **original synthesis** — structure, frameworks, decision rules, and worked examples reconstructed in new wording — not reproductions. Short quoted fragments are attributed inline. Consult the originals for the authoritative text:

- *The Official Guide to the TOEFL iBT® Test, Pocket Edition*, Chapters 4–5 — **ETS**
- Writing & Speaking Section Performance Descriptors (Appendix) — **ETS**
- Write an Email / Academic Discussion / Interview template guides — **Magoosh**
- Listen and Repeat lesson series (task rules · chunking · scoring and common errors) — third-party TOEFL prep course

Where the third-party guides conflict with ETS on any point of fact, the skill treats **ETS as authoritative**.

TOEFL and TOEFL iBT are registered trademarks of ETS. This project is unaffiliated with and unendorsed by ETS or Magoosh.

## Built with

[Books-to-Skill-Refs](https://github.com/ariel-lee-1023/Books-to-Skill-Refs) — multi-source distillation into a cross-referenced knowledge library.
