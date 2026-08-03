# toefl-2026-writing-speaking

An agent skill for the **Writing** and **Speaking** sections of the 2026 TOEFL iBT — a router plus five on-demand reference files, aimed at C2-level performance.

## Install

Clone into a skills root your agent reads (Claude Code shown):

```bash
git clone https://github.com/ariel-lee-1023/toefl-2026-writing-speaking.git \
  ~/.claude/skills/toefl-2026-writing-speaking
```

Other roots: `~/.copilot/skills/`, `~/.agents/skills/`, `.claude/skills/`, `.agents/skills/`.

## Layout

| File | Loaded | Contents |
|---|---|---|
| `SKILL.md` | always | Router, operating stance, cross-source topic index |
| `reference-ets-task-specs.md` | on demand | Official Guide Ch. 4–5 — task mechanics, 0–5 scoring guides, rated samples |
| `reference-ets-cefr-descriptors.md` | on demand | Section scores 1–6 mapped to CEFR A1–C2; what C2 requires |
| `reference-magoosh-email-templates.md` | on demand | Write an Email — 7-min plan, register ladder, 5 speech-act types |
| `reference-magoosh-discussion-templates.md` | on demand | Academic Discussion — 10-min plan, engaging both student posts |
| `reference-magoosh-interview-templates.md` | on demand | Take an Interview — the C–D–E–F 45-second shape |

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

## Sources and attribution

Distilled from five documents. These files are **original synthesis** — structure, frameworks, decision rules, and worked examples reconstructed in new wording — not reproductions. Short quoted fragments are attributed inline. Consult the originals for the authoritative text:

- *The Official Guide to the TOEFL iBT® Test, Pocket Edition*, Chapters 4–5 — **ETS**
- Writing & Speaking Section Performance Descriptors (Appendix) — **ETS**
- Write an Email / Academic Discussion / Interview template guides — **Magoosh**

Where the third-party guides conflict with ETS on any point of fact, the skill treats **ETS as authoritative**.

TOEFL and TOEFL iBT are registered trademarks of ETS. This project is unaffiliated with and unendorsed by ETS or Magoosh.

## Built with

[Books-to-Skill-Refs](https://github.com/ariel-lee-1023/Books-to-Skill-Refs) — multi-source distillation into a flat, cross-referenced knowledge library.
