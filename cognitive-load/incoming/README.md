# incoming/ — upload here, get archived automatically

Drop a `.txt` or `.md` file here and push it to `main`. A GitHub Action picks it up, reformats it into the standard **Active Cognitive Buffer** template, saves it into [`../content/`](../content/) with the next sequential number, and deletes the file from here — no manual steps, no AI/API calls, nothing to run locally.

Unlike `polished-5-5-responses/incoming/`, there is only **one** folder here, not one per task type — every episode uses the same four-field schema regardless of `toefl_domain` or source language. All archived notes land flat in [`../content/`](../content/), numbered in upload order; the domain and language stay recorded in each file's frontmatter rather than in the folder path.

## What to put in the file

Paste the host AI's output with clear labels. The automation looks for these labels (as a markdown heading, a line ending in `:`, or `Label: content` on one line) and slots each into the matching section of the final archive file, in this fixed order:

1. `Title` — 2-5 words naming the episode's actual topic, in title case, no punctuation (e.g. `Urban Heat Islands`). This is the ONE field the script does not guess — it names the archived file directly. Do not skip it.
2. `Source Language` — `Chinese` or `English` (defaults to `English` if omitted).
3. `TOEFL Domain` — the episode's Semantic Anchoring classification (e.g. `Sociology`, `Economics`, `Biology`, `Humanities`), left as `...` if omitted. Naming the domain primes the matching English academic vocabulary before the rest of the note is written — see the mechanism note in [`SKILL.md`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking/blob/main/SKILL.md).
4. `Core Thesis` (becomes **1. Prefrontal Abstraction**) — the one complex synthesizing sentence.
5. `Pillar A` / `Pillar B` / `Pillar C` (becomes **2. Associative Evidence Mapping**) — the three causal pillars.
6. `Lexical Bindings` (becomes **3. Lexical Binding**) — the 3-5 term → academic-equivalent pairs, one per line.
7. `Syntactic Friction Points` (becomes **4. Motor-Speech Synthesis**) — hesitation notes from the spoken-summary drill.

Any label you don't include is simply left blank (`...`) in the archived file for you to fill in later. If you don't label anything at all, the automation treats the whole file as the Core Thesis and leaves the other sections blank — labeling is strongly recommended since, unlike the polished-response archive, there is no prose fallback split that makes sense across four structurally different fields.

## v1.0 limitation — one episode per file

Each upload is one re-encoded episode (one lecture segment, one recording, one reading). If you processed several source episodes in one sitting, upload each as its own file — you can still batch-upload multiple files in the same commit; each is processed independently.

## Manual alternative

You don't have to use this automation at all: copy [`../_template.md`](../_template.md) by hand, fill it in, and save it directly into [`../content/`](../content/) with the next `NNN-topic-slug.md` name.
