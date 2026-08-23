# incoming/ — upload here, get archived automatically

Drop a `.txt` or `.md` file here and push it to `main`. A GitHub Action picks it up, reformats it into the standard **Active Cognitive Buffer** template, saves it into [`../content/`](../content/) with the next sequential number, and deletes the file from here — no manual steps, no AI/API calls, nothing to run locally.

Unlike `polished-5-5-responses/incoming/`, there is only **one** folder here, not one per task type — every episode uses the same schema regardless of `toefl_domain` or source language. All archived notes land flat in [`../content/`](../content/), numbered in upload order; the domain stays recorded in each file's frontmatter rather than in the folder path. The archived note itself is always written entirely in English — if your raw source material is in Chinese or another language, translate it into English before or while filling in the labels below; no non-English text should appear in the labeled content.

## What to put in the file

Paste the host AI's output with clear labels. The automation looks for these labels (as a markdown heading, a line ending in `:`, or `Label: content` on one line) and slots each into the matching section of the final archive file, in this fixed order:

1. `Title` — 2-5 words naming the episode's actual topic, in title case, no punctuation (e.g. `Urban Heat Islands`). This is the ONE field the script does not guess — it names the archived file directly. Do not skip it.
2. `TOEFL Domain` — the episode's Semantic Anchoring classification (e.g. `Sociology`, `Economics`, `Biology`, `Humanities`), left as `...` if omitted. Naming the domain primes the matching English academic vocabulary before the rest of the note is written — see the mechanism note in [`SKILL.md`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking/blob/main/SKILL.md).
3. `Tier` — the Expansion Tier the host AI computed from source density (e.g. `T3 (D≈14)`), left as `...` if omitted. This records how much depth was permitted inside the fields below for this episode — see [`SKILL.md`](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking/blob/main/SKILL.md#length-calibration-the-density-score-and-expansion-tiers) "Length calibration" for the full Density Score algorithm.
4. `Core Thesis` (becomes **1. Prefrontal Abstraction**) — the one complex synthesizing sentence (may carry a second embedded clause at Tier T3/T4, but always one sentence), written in English regardless of source language.
5. `Pillar A` / `Pillar B` / `Pillar C` (becomes **2. Associative Evidence Mapping**) — the three causal pillars (each may extend to a two-hop causal chain at Tier T3/T4 — never a fourth pillar), written in English.
6. `Lexical Bindings` (becomes **3. Lexical Binding**) — the plain-term → academic-equivalent pairs, one per line (3-5 at Tier T1/T2, up to 10 at Tier T4). If the source term was non-English, both sides of the pair are written in English — translate first, never leave the original-language word in.

Any label you don't include is simply left blank (`...`) in the archived file for you to fill in later. If you don't label anything at all, the automation treats the whole file as the Core Thesis and leaves the other sections blank — labeling is strongly recommended since, unlike the polished-response archive, there is no prose fallback split that makes sense across structurally different fields.

## v1.0 limitation — one episode per file

Each upload is one re-encoded episode (one lecture segment, one recording, one reading). If you processed several source episodes in one sitting, upload each as its own file — you can still batch-upload multiple files in the same commit; each is processed independently.

## Manual alternative

You don't have to use this automation at all: copy [`../_template.md`](../_template.md) by hand, fill it in, and save it directly into [`../content/`](../content/) with the next `NNN-topic-slug.md` name.
