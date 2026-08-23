---
name: toefl-2026-writing-speaking
description: "C2-level examiner-and-coach knowledge library for the 2026 TOEFL iBT Writing and Speaking sections, built from 6 sources: the Official Guide chapters on both sections, the ETS CEFR performance descriptors, Magoosh's Email, Academic Discussion, and Interview template guides, and a Listen and Repeat course-lesson series. Use to score or draft responses against the real rubrics, diagnose a response's band, plan practice, or resolve template-vs-authenticity questions. ALWAYS write TOEFL responses as continuous prose — never a title, heading, bullet list, or bold label; enumerate with First/Second/Finally instead. Each source has its own references/reference-<slug>.md, loaded on demand."
---

<!-- argument-hint: [task name, rubric criterion, CEFR band, or "score this response"] -->

# TOEFL 2026 — Writing & Speaking, at C2
**Sources**: 6 | **Generated**: 2026-08-03 | **Updated**: 2026-08-13 (Listen and Repeat) | **Depth**: study

## How to use
- No args → read this router, pick the file(s).
- "about &lt;topic&gt;" → use the Topic Index below.
- "score/diagnose this response" → open `references/reference-ets-task-specs.md` (task rubric, 0–5) **and** `references/reference-ets-cefr-descriptors.md` (capability band, 1–6). They answer different questions.
- Drafting or coaching a specific task → open that task's third-party file (Magoosh, or the Listen and Repeat lessons) **plus** the ETS task-specs file. Never the third-party file alone.
- "chunk / shadow / repeat this sentence", or anything about hearing and reproducing a sentence → run **"Coaching a Listen and Repeat set"** below, with `references/reference-course-listen-repeat-lessons.md` open **plus** the ETS task-specs file. This task is scored on intelligibility and accuracy only, so the usual elaboration advice does not apply to it.
- User pastes or describes raw, unstructured input to process — a lecture transcript, a recording, a reading, meeting notes, a conversation, in any source language — and asks to take notes on it, summarize it, process it, or "log" it → run **"Active Cognitive Buffer: re-encoding raw input"** below. Do not draft a plain summary for this kind of input; the point of the feature is that the note itself is the cognitive exercise.

## `semantic-consolidation-buffer/` vs. `polished-5-5-responses/` — which pipeline fires
These two archives never fire on the same request; use this one question to decide: **is the user handing you material to learn FROM, or a response to be scored/drafted/polished?**

| Signal | Pipeline |
|---|---|
| Input is a lecture, recording, reading, podcast, meeting, or conversation — raw material the user consumed, in any language, with no TOEFL task prompt attached | `semantic-consolidation-buffer/` (Active Cognitive Buffer) |
| Input is (or responds to) one of the four TOEFL task prompts — an email prompt, a discussion-post prompt with student posts, an interview question, or a Listen-and-Repeat sentence set — and the user wants it drafted, scored, diagnosed, or polished | `polished-5-5-responses/` (the four task-type archives) |
| User explicitly says "score/diagnose/polish this response," or gives you their own draft answer | `polished-5-5-responses/` — always, even if the underlying topic came from a lecture |
| User explicitly says "take notes on/log/process this," or hands you a transcript/recording with no draft response attached | `semantic-consolidation-buffer/` — always, even if the topic is one a TOEFL task could plausibly use |

**Sequential use is normal and expected — the two are not mutually exclusive across a conversation.** A realistic flow: the user pastes a Chinese podcast segment → you produce an Active Cognitive Buffer note (`semantic-consolidation-buffer/`) → later in the same session the user says "now write an Academic Discussion post using pillar B" → that second request is a fresh `polished-5-5-responses/` task, drafted using the pillar as source material, then diagnosed/polished/archived through the normal four-task flow. **Never conflate the two archive outputs into one file or one copy block** — each pipeline produces its own copy block, for its own folder, even when they're chained in the same conversation.

**If a single message is genuinely ambiguous** (e.g., "here's a lecture transcript, take notes and also grade how well I explained it" bundles both in one turn), do both explicitly and separately: produce the Active Cognitive Buffer note first (with its own copy block), then treat the grading request as its own step against whatever response the user actually wrote, rather than inventing a response to score. If the user gave no response of their own to score, say so instead of guessing which pipeline they meant.

## Which source for which job (start here)
| Source (→ file) | Reach for it when you need… | Its one big idea |
|---|---|---|
| **Official Guide, Ch. 4–5 (ETS)** → [reference-ets-task-specs.md](references/reference-ets-task-specs.md) | Task mechanics, timings, the actual 0–5 scoring guides, rated official samples, ETS's own strategies | Elaboration and relevance are criterion #1; errors are forgiven, **memorized language is not** |
| **Performance Descriptors (ETS)** → [reference-ets-cefr-descriptors.md](references/reference-ets-cefr-descriptors.md) | What C2/C1/B2 actually mean, band diagnosis, what to build next | C2 = precision, emphasis, **ambiguity elimination**, with no sign of restricting what you want to say |
| **Write an Email (Magoosh)** → [reference-magoosh-email-templates.md](references/reference-magoosh-email-templates.md) | 7-min email plan, register ladder, 5 speech-act task types | Requests, criticisms, and refusals each have a required *form*, and that form is scored |
| **Academic Discussion (Magoosh)** → [reference-magoosh-discussion-templates.md](references/reference-magoosh-discussion-templates.md) | 10-min post plan, engaging the two student posts, support menus | **Agree with one student, disagree with the other** — and always add a new increment |
| **Interview (Magoosh)** → [reference-magoosh-interview-templates.md](references/reference-magoosh-interview-templates.md) | The 45-second, zero-prep response shape | **C–D–E–F**: Commit → Detail → Elaborate → Finish(optional) |
| **Listen and Repeat (course lessons)** → [reference-course-listen-repeat-lessons.md](references/reference-course-listen-repeat-lessons.md) | The 7-sentence set's positional shapes, chunking for memory, and why points are lost | **Listen for ideas, not words** — 2–4 chunks max; compressed function words are recoverable from chunk type, word endings are not |

## Operating stance (apply before any advice)
0. **Output format: continuous prose, always.** Every response on this test is typed into a plain text box or spoken aloud. **Never** emit a title, a markdown heading, bullet points, a numbered list, bold/italic markup, or `Label:` lines — in a drafted response *or* in a sample you show the user. An email adds a greeting and sign-off; a discussion post has neither; neither ever has bullets. Parallel points are rendered as *First… Second… Finally…* in prose. This is scored, not cosmetic: ETS's score-1 band names **"telegraphic language (i.e., short and/or disconnected phrases and sentences)"**, and its score-4 speaking band is elaborated content that **"may lack effective sentence-level connectors."** Bulleting deletes exactly the connective tissue the rubric measures.
0b. **Listen and Repeat is the one exception to almost everything else here.** You are not the author on that task: no ideas, no stance, no elaboration, no grammar or vocabulary of your own — the words are handed to you and the only job is to reproduce them. Never coach it with elaboration advice, never "improve" the sentence, and never treat memorized language as a risk there, since nothing is composed. Its two criteria are **intelligibility** and **accuracy**; its method is **chunking for memory then imitation of the speaker's rhythm**; and its governing rule is that **finishing an imperfect sentence beats stopping to fix one.** Stances 2–5 below are about composed responses and apply to the other four tasks.
1. **ETS outranks the third-party sources** on every point of fact. Magoosh and the Listen and Repeat lessons supply clocks, sentence taxonomies, and practice protocols ETS omits; ETS defines what is scored.
2. **Two scales.** Section scores 1–6 = CEFR A1–C2. Task scoring guides 0–5. A task "5" is not a section "6" — never conflate them.
3. **The library's central tension, and its resolution.** ETS penalizes memorized/formulaic language in four separate places; the Magoosh guides are phrase menus and say so themselves. Resolution: **borrow the frame, invent the substance.** Connectives, greetings, stance markers, and concession moves are what real emails, posts, and speech contain — safe. Prefabricated intros/conclusions, canned arguments, and invented *citations* — penalized. **Test every sentence: could it move to a different prompt unchanged?** If yes and it isn't a bare connective, rewrite it.
4. **Calibrate to the official samples, not to perfection.** ETS's rated score-5 email contains three grammar errors; its four rated score-5 interview answers are full of "um," restarts, and hedges. Optimize in rubric order: address the prompt → elaborate concretely → vary syntax *for a reason* → accuracy last.
5. **The 3-ceiling is real.** Writing that is hard to follow, oversimple, or lexically thin caps at 3 regardless of how good the ideas are.

## Cross-source Topic Index
- **Elaboration (top content criterion)** → ets-task-specs, ets-cefr-descriptors, magoosh-discussion, magoosh-interview
- **Memorized / formulaic language penalty** → ets-task-specs, magoosh-email, magoosh-discussion, magoosh-interview
- **Invented details (realistic, not true)** → magoosh-email, magoosh-discussion, magoosh-interview, ets-task-specs
- **Idiomatic & precise word choice** → ets-task-specs, ets-cefr-descriptors, magoosh-email, magoosh-discussion
- **Syntactic variety (must be motivated)** → ets-task-specs, ets-cefr-descriptors, magoosh-email
- **Social conventions / register** → ets-task-specs, magoosh-email
- **Diplomatic disagreement** → ets-cefr-descriptors, magoosh-email, magoosh-discussion
- **Committing to one side** → magoosh-discussion, magoosh-interview
- **Paraphrasing others' posts** → ets-task-specs, magoosh-discussion
- **100-word minimum / length targets** → ets-task-specs, magoosh-discussion, magoosh-email
- **Timing & proofreading budget** → ets-task-specs, magoosh-email, magoosh-discussion
- **Delivery: pace, pauses, intonation** → ets-task-specs, ets-cefr-descriptors, magoosh-interview
- **Pausing (precision-search vs. shortage)** → ets-cefr-descriptors, ets-task-specs
- **Intelligibility & accent** → ets-task-specs, ets-cefr-descriptors
- **Shadowing / record-and-review** → ets-cefr-descriptors, magoosh-interview, course-listen-repeat
- **Chunking for retention (action/object/place/time/purpose)** → course-listen-repeat, ets-task-specs
- **Compressed function words & word endings (-s, -ed)** → course-listen-repeat, ets-task-specs
- **Imitating rhythm & stress instead of speaking naturally** → course-listen-repeat, ets-cefr-descriptors
- **Finishing over correcting (truncation penalty)** → course-listen-repeat, ets-task-specs
- **Intelligibility & accuracy as the only two criteria** → course-listen-repeat, ets-task-specs
- **Three-draft practice protocol** → magoosh-email, magoosh-discussion, magoosh-interview
- **Rigidity as the B2 marker** → ets-cefr-descriptors, magoosh-email
- **Scoring scales (1–6 vs 0–5)** → ets-task-specs, ets-cefr-descriptors

*(Terms appearing in only one source stay in that file — reach them via its router row.)*

## Coaching a Listen and Repeat set — fixed procedure
This task has no draft to polish, so the other tasks' diagnose→rewrite loop does not apply. When the user brings sentences from a Listen and Repeat set (one sentence or a whole set of seven, with or without their own attempt), open `references/reference-course-listen-repeat-lessons.md` and work these six steps **in order**. Steps 1–5 are decomposition; step 6 is the score.

1. **Place each sentence on the ladder.** Count the words: 6–9 = short (set positions 1–2), 9–11 = medium (3–5), 13–15 = long (6–7). ETS's equivalent syllable counts are 9–11 / 14–16 / 19–23 with 8 / 10 / 12 second windows. Position predicts grammar, so say what shape was expected — a short sentence is almost always a bare imperative, often opening *start by / begin by / first*.
2. **Cut it into chunks and name each type** — action, object, place/manner, time, purpose. Give the chunk text, not just the label: *action → grind the beans fresh · purpose → for each new drink*. **Enforce the ceiling**: if you produce five or more chunks, you have cut too finely — merge until you are at four or fewer, because the ceiling is the entire value of the method.
3. **For every 13–15 word sentence, name which of the four long shapes it uses and the cue word that reveals it** — *and*-serial (each action is its own chunk), softened command (*you can / you may / make sure to / remember to*), front-loaded time or purpose chunk (*after / before / for / to*, with an audible comma pause that is a free chunk boundary), or *that*/*who* description and *if…then* conditional. Shapes combine; say so when they do.
4. **Predict the compressed function words from the chunk types, then check them against the actual sentence.** Place chunk → *at / in / on*; purpose chunk → *to* + verb or *for* + noun; time chunk → *before / after / until / once*. State this as a reconstruction rule the user can run under exam pressure, not as a vocabulary list: if the content words landed and one small word did not, the chunk type names the missing word.
5. **Flag the at-risk word endings by word, never by category.** Quote the specific words carrying plural or third-person *-s*, past-tense *-ed*, or a final *t*/*d* — *sealed*, *boxes*, *guests*, *amenities* — and also name the content words that carry **no** ending, since adding one costs the same as dropping one. Say explicitly that endings cannot be predicted from shape, so they require deliberate attention to the ends of words. Then name the content words to deliver crisply, since the rubric penalizes ambiguity caused by imprecise pronunciation.
6. **Score on the two criteria only — intelligibility and accuracy — and classify every loss by cause.** Use the 5/4/3/2/1/0 bands from the reference file, and sort each error into exactly one of five categories: **function word · word ending · blurred content word · truncation · rhythm substitution.** The category is what makes practice cumulative; a bare score is not actionable. Close with **one** drill target (a category plus a sentence length), not a list of five.

**When the user supplies their own attempt or transcript**, diff it against the source sentence word by word before scoring, and classify each difference by the step-6 categories. Report the diff — a missing *the* and a dropped *-ed* are two different problems with two different fixes, and pooling them as "pronunciation" destroys the diagnosis.

**Never, on this task:** rewrite or improve the sentence · give elaboration, stance, or connective advice · treat template language as a memorization risk · let a chunk analysis stand as the spoken response · show the user the text before they have attempted it blind · advise note-taking. And always restate the governing tradeoff when the user reports freezing: **finishing an imperfect sentence beats stopping to fix one** — truncation turns a likely 4 into a 2, while a missing article stays inside the 4 band.

## Active Cognitive Buffer: re-encoding raw input
This feature is separate from the four practice tasks above and from `polished-5-5-responses/` — it is **input-side** processing, not output drafting. Its premise: a universal note-taking system only works as an **Active Re-Encoding Pipeline**. Raw auditory or reading input — a lecture, a recording, a meeting, a conversation, in any source language — must be forced through a fixed schema that compels synthesis rather than transcription. The output is a TOEFL-ready L2 semantic map of the episode, archived to [`semantic-consolidation-buffer/`](semantic-consolidation-buffer/) in this repo.

**Why the schema is rigid, not stylistic.** Each field below maps to a specific cognitive/neurolinguistic mechanism relevant to TOEFL Integrated Writing and Speaking. Understanding the mechanism is what prevents you from "softening" a field into a generic summary when the source material resists it — the constraint is the exercise:

- **Semantic Anchoring** (the `toefl_domain` field) primes the relevant English academic lexicon before any content is processed — tagging an episode "Economics" vs. "Biology" activates a different vocabulary network, the same top-down priming a TOEFL Integrated task relies on when it names its domain up front.
- **Prefrontal Abstraction** (Core Thesis) exercises the dlPFC's inhibitory control: capping the thesis at one sentence forces you to actively suppress tangential detail (neural noise) and raise the signal-to-noise ratio of the core semantic representation. The mandated subordinate clause additionally primes the complex syntax that high-scoring Integrated Writing responses require.
- **Associative Evidence Mapping** (the three pillars) mirrors how TOEFL academic lectures and reading passages are structured — hierarchical logic, not a flat list of facts. Decomposing an episode into Problem → Mechanism → Result trains your predictive-processing model to anticipate structural transitions, which lowers prediction error when you meet the same structure again on test day.
- **Lexical Binding** (the vocabulary pairs) directly targets L1 lateral inhibition: while consuming Chinese-language material, L1 semantic nodes are highly activated and suppress the weaker L2 lemma. Explicitly remapping each high-density term to its precise English academic equivalent immediately, while the concept is still active, trains faster L2 lexical selection under the time pressure of spontaneous speech — and forcing the whole note into English, with no source-language text retained anywhere, is what makes this remapping happen rather than deferring it.

### Length calibration: the Density Score and Expansion Tiers
The four-field count above is fixed for every episode, short or long — that part of the schema never changes. But a fixed field *count* rendered at a fixed *depth* breaks down on dense source material: a 5-minute reading passage and a 48-minute, 19-subtopic interview should not produce the same word count, yet a schema with no density awareness will flatten both to the same short note. The fix is not to add more pillars or more fields for long material — that would defeat the inhibitory-control purpose of the rigid field count. Instead, **only the depth allowed inside each field scales, gated by a Density Score computed from the source before you draft anything.**

**Step 1 — compute the Density Score (D).** Before drafting, estimate two numbers from the raw input:
- **S = segment count** — the number of distinct sub-topics or sub-arguments in the source. If the input already carries headers, bullets, or an existing summary with labeled sections (e.g. a transcript with a pre-existing "smart summary"), count those directly. If it's an unlabeled transcript, count topic shifts using speaker changes, timestamp jumps, and discourse markers (e.g. "moving on to...", "另外一个问题是...", a new named case or study introduced).
- **W = word count** — the total word count of the raw source material (count Chinese characters as words if the source is Chinese).

Compute `D = S + W / 1500`. (1,500 is an initial calibration constant — adjust it later if a Tier consistently feels miscalibrated against real source material.)

**Step 2 — map D to an Expansion Tier.** Tiers are discrete, not a continuous formula, so the scaling stays auditable rather than inviting word-count padding:

| Tier | D range | Typical source |
|---|---|---|
| T1 — Baseline | D < 5 | A single TOEFL-length reading passage or a short podcast clip |
| T2 — Moderate | 5 ≤ D < 12 | A single-topic lecture, 15–20 minutes |
| T3 — High | 12 ≤ D < 20 | A multi-turn interview or a podcast with 2–3 embedded cases |
| T4 — Very High | D ≥ 20 | A long, many-subtopic interview or panel (e.g. a 45+ minute conversation with a dozen or more distinct sub-arguments) |

**Step 3 — apply the Tier to each field's internal depth, never to field count:**
- **Semantic Anchoring** — unchanged at every Tier. Always exactly one dominant domain; priming a vocabulary network only works if there's one network to prime, regardless of source density.
- **Prefrontal Abstraction (Core Thesis)** — always exactly ONE sentence at every Tier (the dlPFC inhibitory-control constraint never relaxes). What scales is the permitted subordinate-clause depth: T1/T2 use a single subordinate clause (`Although X, Y`); T3/T4 permit a second embedded clause layering in the shifted mechanism or scope (`Although X, and even though the driver of X has shifted from A to B, Y`). This is still one sentence — the constraint is about sentence count, not word count.
- **Associative Evidence Mapping (the three pillars)** — always exactly three pillars at every Tier (never add a fourth for density — that breaks the hierarchical Problem → Mechanism → Result mapping this field trains). What scales is the causal-chain length permitted inside each pillar: T1/T2 keep each pillar a single-hop mechanism (X → Y); T3/T4 permit a two-hop chain (X → Y → Z) inside each pillar, which is how a many-subtopic source gets folded in — related sub-arguments scattered across the transcript get merged into one longer causal chain per pillar, not spread across more pillars. Each pillar must still read as a causal chain, never as a flat "A, B, and C happened" list — collapsing into a list at high Tiers defeats the field's purpose just as much as skipping the scaling would.
- **Lexical Binding** — the one field that scales by count, since it's a list by design rather than a compression exercise: the range extends from the base 3-5 up to `min(3 + Tier_number, 10)` pairs (T1/T2: 3-5, T3: up to 6, T4: up to 7-10). Prioritize terms that recur across multiple segments of the source over one-off mentions.

**Non-negotiable at every Tier:** exactly one domain, exactly one thesis sentence (however many clauses), exactly three pillars, and every pillar stated as a causal chain rather than a flat list. If you find yourself wanting to add a fourth pillar or split the thesis into two sentences to fit a dense source, that is a signal to increase the causal-chain depth inside the existing three pillars instead, not to loosen the field count.

**When the user gives you raw input and asks you to process, log, or take notes on it**, do not draft a plain summary. First compute the Density Score and Tier per the steps above, then produce exactly these four fields, in this order, holding to each constraint at the depth the Tier permits:

0. **Semantic Anchoring (Domain Metadata)** — classify the episode into one standard academic domain (e.g. Sociology, Economics, Biology, Humanities). State it plainly; this also becomes the note's `toefl_domain` frontmatter field. If the episode spans domains, name the dominant one — do not hedge with multiple domains.
1. **Prefrontal Abstraction (The Core Thesis)** — ONE complex English sentence synthesizing the entire episode, built on a subordinate clause (`Although...`, `While...`); at T3/T4 a second embedded clause is permitted per the Tier rules above, but it is still one sentence. This forces top-down compression before any supporting detail is recorded.
2. **Associative Evidence Mapping (Logical Architecture)** — exactly three pillars supporting the thesis, written strictly in English and framed as causal mechanisms (X → Y, or X → Y → Z at T3/T4 per the Tier rules above), not a list of facts:
   - Pillar A (Context/Problem)
   - Pillar B (Mechanism/Intervention)
   - Pillar C (Implication/Result)
3. **Lexical Binding (Academic Vocabulary)** — high-density concepts from the episode, count per the Tier rules above (base range 3-5, extending to a maximum of 10 at T4). Every concept is stated entirely in English: if the source term is L1 (Chinese, or any non-English source), translate it to its academic L2 equivalent and use only that English term as the entry — never keep the original-language word. If the source term is already L2 (English), redefine it using a TOEFL-register synonym. Format each as `` `[Plain/Original English Term]` → `[TOEFL Academic Equivalent]` ``.

The whole note is written entirely in English, regardless of the source language — no Chinese or other non-English text appears anywhere in the note, including inside the Lexical Binding entries. Translating fully into English at note-writing time is itself part of the re-encoding exercise, not a cosmetic formatting choice.

This is deliberately input-side comprehension material, not a speaking-output drill: the note is meant to become raw understanding you can call on across reading, listening, writing, and speaking tasks alike, so it stops at the synthesized semantic map and does not require a spoken-recall step to be complete.

State the computed Tier (e.g. "Tier: T3 (D≈14)") in one line before the note itself, so the user can see why the note is the length it is. Give the user the complete four-field note first, in full — same standard as the archive-ready copy block below: no shortening for the sake of the archive step.

### Archive-ready copy block for the Semantic Consolidation Buffer
After giving the complete note, append a single fenced markdown block formatted for direct upload to [`semantic-consolidation-buffer/incoming/`](semantic-consolidation-buffer/incoming/) in this repo, ready to copy, paste into a `.md`/`.txt` file, and upload as-is. The archive unit is **one episode per block** — if the user processed several source episodes in one sitting, offer one block per episode, never pooled into one file. Use the exact field names and order below (any field with no content: write `...`, never invent content):

```markdown
## Title
<2-5 words naming the episode's actual topic, title case, no punctuation, e.g. "Urban Heat Islands">

## TOEFL Domain
<the domain named in Semantic Anchoring above, e.g. Sociology, Economics, Biology, Humanities>

## Tier
<the Expansion Tier computed above, e.g. "T3 (D≈14)" — carries the density calibration into the archive so the note's depth is auditable later>

## Core Thesis
<the one complex synthesizing sentence from section 1 above, verbatim>

## Pillar A
<Context/Problem pillar from section 2 above, verbatim>

## Pillar B
<Mechanism/Intervention pillar from section 2 above, verbatim>

## Pillar C
<Implication/Result pillar from section 2 above, verbatim>

## Lexical Bindings
<all 3-5 concept lines from section 3 above, one per line, verbatim>
```

Same content-fidelity rule as the polished-response archive below: the copy block carries the SAME content as the full note already given, reorganized into fields — never a shortened digest of it. `Title` and `Tier` are the only fields not literally quoted from the four numbered sections above; `TOEFL Domain` is the Semantic Anchoring classification stated verbatim, `Tier` is the Density Score/Tier line stated verbatim, and everything else must match the corresponding section exactly — all in English, regardless of the source language.

The [`semantic-consolidation-buffer/`](semantic-consolidation-buffer/) automation (unlike `polished-5-5-responses/`) has a single `incoming/` folder, not one per task type — every episode uses this same schema regardless of domain or source language, so there is no folder to choose.

## After answering: offer an archive-ready copy block
Whenever a user asks to diagnose, score, or polish a response for one of the four task types below, **first give the full, complete answer exactly as you normally would** — continuous prose, full reasoning, every example and explanation, with no length-cutting for the sake of the archive step. Only *after* that complete answer, **append a single fenced markdown block** formatted for direct upload to `polished-5-5-responses/incoming/<task-type>/` in the [toefl-2026-writing-speaking repo](https://github.com/ariel-lee-1023/toefl-2026-writing-speaking), ready to copy, paste into a `.md`/`.txt` file, and upload as-is. The archive unit is **one question per block** for Write an Email, Academic Discussion, and Listen and Repeat — but **one full 4-question session per block** for Take an Interview (see below). Use the exact field names and order below (any field with no content: write `...` or omit it, never invent content).

**`My Diagnosis` covers both outcomes, not just gaps.** Its job is to summarize the response's rubric standing in a couple of sentences — most drafts still have real, quotable errors to name, but a response that already reads as a clean 5/5 deserves that verdict stated plainly (with, at most, genuine ceiling-level refinement notes), never a manufactured flaw just to fill the field.

**Every copy block starts with a `## Title` field.** This is the ONE field the archiving script does not try to extract from anything else — it uses your Title verbatim to name the archived file (e.g. `## Title\nReading Habits` archives as `00X-reading-habits.md`). Do not skip it and do not let the script guess: guessing from the first few words of the Prompt fails badly when the prompt opens with small talk or instructions ("Thank you for your participation...", "Before they leave, thank customers...") — the real topic gets buried past the words the script samples, producing meaningless filenames. Write 2-5 words naming the actual topic or scenario of the session (e.g. `Reading Habits`, `Retail Checkout`, `Requesting a Deadline Extension`), in title case, with no punctuation, and no restating of the task type itself (never `Interview Session` or `Email Prompt`).

**Critical: the copy block must carry the SAME content as the full answer above it, not a shortened summary of it.** Every field's content must be the substance already given in the full answer — reorganized/labeled into the right field, quoting or closely paraphrasing your own explanations, examples, and reasoning — never a compressed bullet stub that drops the specifics (concrete chunk examples, the exact words flagged for pronunciation, the reasoning behind each fix, etc.). If a field would otherwise come out shorter than the corresponding material in the full answer, that is a sign content was dropped — go back and carry it over instead. The two parts (full answer, then copy block) should read as the same information in two formats, not as an answer followed by a lossy digest of it. The only thing the block strips is prose connectors needed for spoken/written flow — not analytical content. Do not add extra commentary inside the block itself beyond the field content — it must match the repo's automated archiver output 1:1.

**Write an Email / Academic Discussion** — shared template, one question per block:
```markdown
## Title
<2-5 words naming this question's actual topic/scenario, e.g. "Requesting a Deadline Extension">

## Prompt
<the exact original question/prompt>

## My Polished Response
<the polished, upload-ready version>

## My Draft
<the user's original raw draft, if provided>

## My Diagnosis
<if gaps remain: specific recurring error 1, with the exact flawed phrase/sentence quoted>
<specific recurring error 2, with the exact flawed phrase/sentence quoted>
<if the response already reads as a clean 5/5: say so directly, then note only genuine ceiling-level refinements, if any — never invent a flaw to fill this field>

## My What Changed & Why
<the full explanation from the answer above of what was fixed and why, tied to the relevant rubric criterion — not a one-line summary>
```
Same content-fidelity rule as above: pull the actual sentences and reasoning from the full answer into these fields, don't re-summarize them into shorter generic bullets.

**Take an Interview** — session-level template, NOT one block per question. The real Interview task presents 4 questions back-to-back in one sitting with zero prep time, so the archive unit is the whole session (Q1-Q4 together), never a single question. Whenever a user works through an interview session (whether they gave you all 4 up front or one at a time across the conversation), wait until all 4 are answered, then emit exactly ONE block covering all of them. Group by field type, not by question — all four Prompts together, then all four Polished Responses together, then all four Drafts together — so a reader can scan straight down each field type across the whole session:
```markdown
## Title
<2-5 words naming this session's actual topic, e.g. "Reading Habits" — never derived from Q1's opening small talk>

## Q1 Prompt
<question 1>

## Q2 Prompt
<question 2>

## Q3 Prompt
<question 3>

## Q4 Prompt
<question 4>

## Q1 My Polished Response
<polished answer 1>

## Q2 My Polished Response
<polished answer 2>

## Q3 My Polished Response
<polished answer 3>

## Q4 My Polished Response
<polished answer 4>

## Q1 My Draft
<user's original draft answer 1, if provided>

## Q2 My Draft
<user's original draft answer 2, if provided>

## Q3 My Draft
<user's original draft answer 3, if provided>

## Q4 My Draft
<user's original draft answer 4, if provided>

## My Diagnosis
<if gaps remain: specific recurring error 1, session-wide, with exact flawed phrasing quoted>
<specific recurring error 2, session-wide, with exact flawed phrasing quoted>
<if the session already reads as a clean 5/5 across all four answers: say so directly, then note only genuine ceiling-level refinements, if any — never invent a flaw to fill this field>

## My What Changed & Why
<the full explanation from the answer above of what was fixed and why across the session, tied to the relevant rubric criterion — not a one-line summary>
```
The archiving script accepts any order for these labels internally (each field is independently detected by its own heading and regrouped into this Prompt/Polished/Draft layout regardless of the order the host AI wrote them in), but produce them in this order directly since it reads more naturally and avoids relying on the script's regrouping. Same content-fidelity rule as the other templates: carry over the actual reasoning and examples from the full answer, don't compress them into shorter generic bullets.

If the user only completed 1-3 questions of a session so far, do not emit the copy block yet — offer it only once the full 4-question session is done. If the session genuinely has fewer or more than 4 questions, adjust the Q-numbering accordingly, but still keep it as ONE block for the whole session, never split per question.

**Listen and Repeat** — different shape (sentence-level shadowing, not draft→polish), one sentence-set per block. **This block is the write-up of the six-step procedure above** — steps 1–5 become `Set Map`, and step 6 becomes `My Self-Assessment`. Do not re-derive anything here; transfer it.
```markdown
## Title
<2-5 words naming this sentence set's actual scenario, e.g. "Retail Checkout" — never derived from the sentences' opening words>

## Prompt
Scenario: <the one-line frame the task gave, e.g. "a supervisor training you at a hotel front desk">

1. <sentence 1>
2. <sentence 2>

## Set Map
<one table row per sentence, numbered to match the Prompt — the per-sentence layer that makes the archive reviewable later. Columns exactly as below.>
| # | Block | Chunks (type → text) | Shape & cues | Function words at risk | Endings at risk |
|---|---|---|---|---|---|
| 1 | short (7 w) | action → <text> · purpose → <text> | bare imperative | <word> (purpose chunk → to/for) | <word> (-s) |
| 7 | long (14 w) | <2-4 chunks, never more> | <and-serial / softened / front-loaded time-purpose / that-who or if-then> + the cue word | <words> | <words, or "none"> |

## My Chunking & Memory Strategy
<prose from the answer above: WHY the boundaries fall where they do, which cue word signalled each chunk type, and what generalizes to the next set. Not a bare chunk-label list.>

## My Pronunciation Focus
- Compressed function words: <which ones, each paired with the chunk type that reconstructs it>
- Word endings (-s / -ed / final t-d): <the specific words from THIS set, plus the content words that carry no ending>
- Rhythm & stress: <which syllables the speaker stressed; where the user substituted their own rhythm>
- Content words to say crisply: <the ones at risk of being blurred>

## My Self-Assessment
<per-sentence score, then the tally — this is what makes practice cumulative across sets>
| # | Score | What I lost | Cause category |
|---|---|---|---|
| 1 | 5/5 | <or "nothing"> | <function word / word ending / blurred content word / truncation / rhythm substitution> |

- Set score: <average>/5
- Error tally: function word ×_ · word ending ×_ · blurred content word ×_ · truncation ×_ · rhythm ×_
- Next drill: <ONE category plus a sentence length, not a list>
```
Rules for this block: **every sentence in the Prompt gets a Set Map row** — a pooled comma-separated list of chunks across all seven sentences destroys the review value, because you can no longer tell which chunk belonged to which sentence. Chunk counts stay at four or fewer per row. Endings are named word by word, never as a category. If the user did not attempt the sentences aloud, leave the score cells as `...` rather than inventing a score, but still fill the Set Map — the decomposition is valid without an attempt.

The two prose fields (`My Chunking & Memory Strategy`, `My Pronunciation Focus`) carry the actual analysis from the answer above, not a compressed digest of it.

Remind the user, briefly, that v1.0 of the archiver expects **one question per file for Write an Email / Academic Discussion / Listen and Repeat** — if they worked through multiple questions of one of those types in one sitting, they need one copy block (and one upload) per question. **Take an Interview is the opposite**: all 4 questions of one session go into a single file/upload — never split an interview session across multiple files.

## Scope & limits
Covers the **Writing** section (Build a Sentence, Write an Email, Write for an Academic Discussion) and the **Speaking** section (Listen and Repeat, Take an Interview) of the 2026 TOEFL iBT, plus the CEFR-aligned section descriptors, plus the **Active Cognitive Buffer** input-processing feature above (which is schema-driven note-taking, not tied to any one of the six sources). **Not covered**: Reading, Listening, registration/logistics, scoring-service policy, or any task-type not in these six sources. For anything outside that, say so rather than inventing it.
