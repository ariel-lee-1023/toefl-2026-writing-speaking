# TOEFL Speaking Method: Listen and Repeat Task — Course Lessons
**Format**: md (from lesson transcripts) | **Lessons**: 3 (task rules · chunking · scoring & error types) | **Sections**: set-structure map + chunk taxonomy + function-word prediction + rubric walkthrough | **Depth**: study
**Status**: third-party. Where it conflicts with `reference-ets-task-specs.md`, ETS wins. Unique value: a **positional map of the 7-sentence set** — which grammatical shape appears in which slot — plus a **chunk-to-function-word prediction rule** that turns the most common source of lost points into something you can reconstruct. ETS states the ladder and the score bands but never the sentence shapes.

> **FORMAT RULE (applies to every response produced from this library, regardless of which passage you are reading):**
> A TOEFL response is **continuous prose typed into a plain text box, or spoken aloud.** Never emit a title, a heading, a bullet point, a numbered list, bold or italic markup, or a `Label:` line inside a response. Enumerate in prose — *First… Second… Finally…* — never as a list.
> **The formatting of THIS reference file is not a model for the response.** These notes use bullets and bold labels because they are study notes. On this task in particular the "response" is nothing but the sentence you heard, reproduced — never a list of the chunks you identified.

## Mental Model (read first)
This is the only task in the library where **you are not the author**. There is nothing to invent, nothing to plan, no stance to commit to: you hear one short sentence once and say it back. That removes every skill the other three tasks reward and leaves exactly one — *can you hear English and reproduce it?* Grammar and vocabulary are not tested, because the words are handed to you. Short-term memory is tested only lightly, because the sentences are short.

So the whole task reduces to **imitation, not composition**. The practical consequence is counterintuitive: the goal is *not* to say the sentence the way you normally say English words, but to copy the speaker — their rhythm, their stressed syllables, their melody — even when that feels unnatural in your mouth. "It tests your pronunciation skills: how well you hear English sounds and how well you can reproduce them." Discomfort while imitating is the sensation of the task working, not of doing it wrong.

The second consequence: because there is **one** playback and **one** recording, the failure mode is not "wrong answer" but "no answer." Everything below is built around never going silent.

## Output format — HARD CONSTRAINT
The spoken response is the source sentence and nothing else. No preamble ("The sentence was…"), no correction of the speaker, no paraphrase, no framing.

The risk here is not delivery but **how practice gets written down**. Chunks are a memory device; they must never appear in the response, and a practice log that records only chunk labels trains recall of labels rather than of the sentence. When archiving a practiced set, write the *sentence* verbatim and keep the chunk analysis in a separate field — which is exactly why the repo's Listen and Repeat template separates `## Prompt` from `## My Chunking & Memory Strategy`.

## The Set — a fixed positional structure
Seven sentences in a row, all inside one scenario (hotel front desk, a neighborhood café, a recycling center). The scenario is delivered by a short setup line plus a small on-screen image; **the image is context only — never describe it.** The set is not random in difficulty. It climbs on a fixed ladder:

| Block | Count | Length (words) | Typical grammar | Chunks to hold |
|---|---|---|---|---|
| **Short** | first 2 | 6–9 | bare imperative, often opening *start by / begin by / first* | 1–2 |
| **Medium** | next 3 | 9–11 | imperative **+ one added chunk** (purpose, time, or place/manner) | 2–3 |
| **Long** | last 2 | 13–15 | serial actions with *and*, softened commands, front-loaded time/purpose, relative clauses, *if…then* | 2–4 |

- **Reconciling with ETS**: ETS specifies the same 2/3/2 ladder in **syllables** (9–11 / 14–16 / 19–23) with response windows of 8 / 10 / 12 seconds. This file's word counts are the same ladder measured differently — they do not conflict, and **ETS's syllable counts and timings are authoritative.**
- **Why the map matters**: knowing that sentence 1 is almost certainly a bare command opening with *start by* means you spend zero attention deciding what kind of thing you are about to hear, and all of it on hearing it. Use the pattern to **anticipate the shape, never to predict the words.**

## Frameworks & Structure

### The core technique — chunking (listen for ideas, not words)
Holding a 15-word sentence word-by-word is a memory problem; holding it as three ideas is not. *Our espresso bar runs on a simple rhythm* is seven words but **two chunks**: an action (*our espresso bar runs*) and a manner (*on a simple rhythm*).

A **chunk** is a meaningful piece of the sentence. Nearly all of them are one of five types:

| Chunk type | What it does | Typical surface form |
|---|---|---|
| **Action** | the verb and what it acts on | *grind the beans fresh*, *stack the boxes* |
| **Object** | the thing acted on, when separable | *the morning packages* |
| **Place / manner** | where or how | *on the shelf*, *with careful balance* |
| **Time** | when, relative to another event | *before the next customer arrives*, *once the stove is hot* |
| **Purpose** | what for | *to keep the line moving*, *for extra support* |

- **The ceiling rule**: short sentences carry 1–2 chunks, long ones 3–4. **You are never holding more than about four, no matter how long the sentence gets.** That ceiling is the entire value of the method.
- **Chunking is a memory aid, not a construction kit.** You still reproduce the speaker's exact words, stress, and melody. Do not paraphrase a chunk, and do not regenerate the sentence from your grammatical understanding of it. The loop is **listen → hold the chunks → mimic.**

### The long-sentence shapes (the last two sentences)
Four shapes cover nearly all of them, and each one hands you its own chunk boundaries:

1. **Serial actions joined by *and*** — each action is its own chunk; *and* is the cue that another piece of the same type is coming. *Sort the packages, weigh each one, and label them for delivery.*
2. **Softened instruction** rather than a direct command — opens *you can / you may / make sure to / remember to*. *You can pour the steamed milk into the cup once the espresso has settled* → action + place + time, three chunks.
3. **Front-loaded time or purpose chunk**, then the action — opens *after / before / for / to*, with an audible pause at the comma. *After each customer, wipe down the counter.* The pause is a free chunk boundary; use it.
4. **Added description with *that / who*, or an *if…then* conditional** — splits into two chunks by default. *Customers who pay with cash get a small discount.* / *If the line gets too long, call for backup.*

Shapes combine. *If a drink looks wrong, set it aside immediately and prepare a fresh one* is shape 4 plus shape 1 — three chunks: the *if* condition, then two *and*-joined actions.

### Scoring — the rubric in plain language
| Score | What it means |
|---|---|
| **5** | Exact repetition, fully intelligible. **Every word present, including the small ones.** |
| **4** | Meaning captured, with one or two function words missing or changed, a missing tense ending, a small word swap, or two words transposed. **Still a strong score.** |
| **3** | Full sentence attempted, but multiple words missing or changed, or pronunciation was a struggle. |
| **2** | A significant portion of the sentence missing — typically the front repeated, then a stall. |
| **1** | Mostly unintelligible; isolated words. |
| **0** | No relevant response. |

Three things follow, and they are the whole strategy:
- **A 5 requires every word**, function words included. There is no "close enough" at the top band.
- **The 4 band is forgiving.** A slip does not cost much, so **do not freeze** to audit yourself mid-sentence.
- **"Stopping in the middle of a sentence is much worse than producing an imperfect full one."** A truncated response drops to a 2; a complete one with one missing article stays a 4. If you blank on a word, push through with what you have.

## Where the points actually go — compression
One mechanism explains most lost points: **native speakers compress unstressed sounds**, and what you cannot hear you cannot repeat. Two categories get compressed most.

### 1. Function words (missed because they are quiet)
The small connectors — *of, in, at, on, to, for, is, as* — plus the articles *the, a, an*. They carry no meaning of their own; they show how the parts fit together, which is why they are said faster and quieter than everything around them.

**These are recoverable by inference**, and this is where chunking pays off a second time: the content words you *did* hear tell you the chunk type, and the chunk type tells you which function word the slot needs.

| If the chunk is… | It almost certainly needs… | Example |
|---|---|---|
| **Place** | *at / in / on* + the place | *at the desk*, *in the bin*, *on the shelf* |
| **Purpose** | *to* + verb, or *for* + noun | *to attach to each package*, *for delivery* |
| **Time** | *before / after / until / once* + an event | *before setting it down* |

*Sort the morning packages into the correct bins* — if *into* was lost but every content word landed, you know you have an action chunk and a place chunk, something must join them, and putting a thing **into** another is the ordinary case. Reconstruct it and say it.

Worked example: *Check the address before placing it in the bin* contains *the* twice plus two working function words — *before* opening a time chunk, *in* opening a place chunk. Recognize the chunks and the small words stop being random noise.

### 2. Content-word endings (missed because they are clipped)
Content words — nouns, main verbs, adjectives, adverbs — carry the meaning, get stressed, and are therefore usually easy to hear. So their failure mode is different:

- **The primary content-word error is not omission but blur.** The rubric explicitly penalizes content words made ambiguous by imprecise pronunciation. Once you have caught them, deliver them **clean and firm**.
- **The one part that does get missed is the ending**: plural and third-person *-s*, past-tense *-ed*, and final *t*/*d*. Native speakers compress these too.
- **Endings cannot be predicted from chunk shape.** You do not see the sentence, so nothing tells you in advance what is plural or past. The only defence is deliberate attention to the very ends of words while listening.
- Put another way: **"the form of the content word is just as important as the content word itself."**

Worked example: *Stack the sealed boxes on the outgoing shelf* — content words *stack, sealed, boxes, outgoing, shelf*. The *-ed* of *sealed* and the *-es* of *boxes* are exactly the endings to listen for; note too which content words carry **no** ending, since inventing one costs the same as dropping one.

## Worked set — a full scenario
*(Scenario: you are training at a hotel front desk. Listen to your supervisor and repeat.)* Four of the seven, with the analysis:

1. *Greet each guest politely as they arrive.* — short. Action (*greet each guest politely*) + time (*as they arrive*). Two traps: the quiet *as* opening the time chunk, and **guest**, which stays singular after *each* — adding a plural *-s* costs the same as dropping one.
2. *Confirm their reservation using the hotel system.* — short/medium. Action + manner (*using the hotel system*).
3. *Provide a room key and explain how to reach their floor and their room.* — long, shape 1. Three chunks: *provide a room key* / *and explain how to reach their floor* / *and their room*. Two *and*s, and the second one is the easiest thing in the set to drop.
4. *Inform guests about complimentary breakfast hours and other hotel amenities.* — long. Action + two coordinated objects. The endings do the damage here: **guests, hours, amenities** are all plural.

## Decision Rules & Judgment
- **When you miss a word**: keep going and finish the sentence. Silence and truncation cost more than any single omission.
- **When you miss a function word**: infer it from the chunk type rather than leaving a gap. A plausible reconstruction lands in the 4 band; a hole in the middle of the sentence reads as a 3 or worse.
- **When your own accent fights the model**: copy the model anyway. A natural accent is never penalized on its own, but substituting your habitual rhythm for English rhythm is the single most common cause of a capped score.
- **When you notice you mispronounced a word mid-sentence**: do not go back. Self-correction is tolerated only if the response still completes.
- **When the on-screen image is distracting**: ignore it. It is scenario context, not content.
- **When practising, never let yourself see the text first.** Attempt it blind, then look and repeat. Seeing the sentence converts a listening test into a reading-aloud exercise.
- **Do not take notes.** There is no prep time, and writing costs you the beep.
- **Use anything as material.** This drill is the best general pronunciation exercise in the library and does not require TOEFL sentences — any English audio works, and volume matters more than authenticity of source. Do a lot of it before test day.

## Practice protocol
1. **Blind attempt** — play once, repeat immediately, record yourself. No text.
2. **Compare against the text** — mark exactly what was lost, and sort it: function word, word ending, blurred content word, or rhythm.
3. **Second pass with the text visible** — this one is a pronunciation drill, matching stress and melody, not a memory drill.
4. **Ladder practice** — drill 13–15 word sentences with *if…then* and relative clauses specifically. Short imperatives are already easy; the last two sentences of the set are where sets are lost.
5. **Log by error category, not by score.** Two weeks of logs showing "dropped *-ed*" eleven times is actionable; a column of 4s is not.

## Key Takeaways
1. **You are not the author.** No ideas, no grammar, no vocabulary — only *hear it, say it back*. Imitate the speaker instead of speaking naturally.
2. **7 sentences, one scenario, one playback each, on a fixed 2/3/2 ladder** — 6–9 / 9–11 / 13–15 words (ETS: 9–11 / 14–16 / 19–23 syllables, 8 / 10 / 12 s).
3. **Listen for ideas, not words.** Two to four chunks — action, object, place/manner, time, purpose — and **never more than about four**, however long the sentence.
4. **Chunking is a memory aid, never a construction kit.** Reproduce the exact words, stress, and melody; do not paraphrase your chunks.
5. **The last two sentences take four shapes**: *and*-serials, softened commands (*you can / make sure to*), front-loaded time/purpose, and *that*/*who* or *if…then* — each shape hands you its chunk boundaries.
6. **Finishing beats accuracy.** Stopping mid-sentence turns a 4 into a 2; a 5 nonetheless requires every small word.
7. **Compression is the enemy**: function words are missed because they are quiet and are **recoverable from chunk type**; word endings (*-s*, *-ed*, final *t*/*d*) are missed because they are clipped and are **not** predictable — attend to the ends of words deliberately.
8. **For content words, clarity outranks everything.** The rubric names ambiguity from imprecise pronunciation; say them crisply, endings included.
