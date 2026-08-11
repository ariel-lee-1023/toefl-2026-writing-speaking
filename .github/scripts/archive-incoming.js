#!/usr/bin/env node
/**
 * archive-incoming.js  (v1.0)
 *
 * Watches polished-5-5-responses/incoming/<task-type>/ for uploaded .txt/.md
 * files. Each file is expected to contain ONE question (v1.0 does not split
 * multi-question uploads — see README). The script:
 *   1. Detects which of the known sections are present in the raw text
 *      (Prompt / Polished Response / My Draft / Key Obstacles.../
 *      What Changed & Why — or, for listen-and-repeat, Sentences /
 *      Difficulty Notes / Self-Assessment), tolerating messy input:
 *      "##Label", "Label:", "Label -", or a label alone on its own line.
 *   2. Reformats the content into the matching task-type template, in a
 *      fixed section order, leaving any section not found blank.
 *   3. Writes the result into polished-5-5-responses/<task-type>/ with the
 *      next sequential NNN- index, and deletes the original incoming file.
 *
 * No task-type classification and no AI/external API calls: the user
 * already chose the correct destination folder by uploading into
 * incoming/<task-type>/. This script only detects sections, reformats, and
 * archives what's already there.
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const ARCHIVE_ROOT = path.join(REPO_ROOT, "polished-5-5-responses");
const TASK_TYPES = [
  "write-an-email",
  "academic-discussion",
  "interview",
  "listen-and-repeat",
];
const SKIP_FILES = new Set([".gitkeep", "_template.md"]);
const STOPWORDS = new Set([
  "the","a","an","and","or","but","of","to","in","on","for","with","is","are",
  "was","were","be","been","being","this","that","these","those","your","you",
  "i","my","me","we","our","us","it","its","as","at","by","from","into","about",
  "will","would","should","could","can","may","might","must","not","no","do",
  "does","did","have","has","had","if","so","than","then","there","their",
  "write","email","prompt","question","task","discussion","interview",
  "sentence","sentences","polished","response","draft","answer","topic",
]);

function log(...args) {
  console.log(...args);
}

function readIncomingFiles(taskType) {
  const dir = path.join(ARCHIVE_ROOT, "incoming", taskType);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => !SKIP_FILES.has(f))
    .filter((f) => /\.(txt|md)$/i.test(f))
    .map((f) => path.join(dir, f));
}

// ---------------------------------------------------------------------------
// Section detection
// ---------------------------------------------------------------------------

// Each entry: canonical key -> array of label patterns that may introduce it.
// Patterns are matched against a trimmed line with any leading "#"/markdown
// stripped and trailing ":"/"-"/"—" stripped, case-insensitively.
const PROSE_SECTIONS = [
  { key: "prompt", labels: ["prompt", "question"] },
  {
    key: "polishedResponse",
    labels: [
      "my polished response",
      "polished response",
      "final response",
      "final answer",
      "my response",
      "my answer",
      "polished",
      "response",
      "answer",
    ],
  },
  { key: "myDraft", labels: ["my draft", "draft", "original draft", "raw draft"] },
  {
    key: "keyObstacles",
    labels: [
      "my key obstacles holding you back from a 5/5",
      "key obstacles holding you back from a 5/5",
      "key obstacles",
      "obstacles",
    ],
  },
  {
    key: "whatChanged",
    labels: [
      "my what changed & why",
      "my what changed and why",
      "what changed & why",
      "what changed and why",
      "what changed",
    ],
  },
];

// Interview is a 4-question session in one sitting (one interviewer, four
// consecutive prompts, zero prep time). A single archived file represents
// the whole session, not one question — see INTERVIEW_SESSION_SECTIONS below.
const INTERVIEW_SHARED_SECTIONS = [
  {
    key: "keyObstacles",
    labels: [
      "my key obstacles holding you back from a 5/5",
      "key obstacles holding you back from a 5/5",
      "key obstacles",
      "obstacles",
    ],
  },
  {
    key: "whatChanged",
    labels: [
      "my what changed & why",
      "my what changed and why",
      "what changed & why",
      "what changed and why",
      "what changed",
    ],
  },
];

/** Build the per-question label set for interview Q1..Q4 ("Q1 Prompt", "Q2 My Draft", etc.). */
function interviewQuestionSections(qNum) {
  return [
    { key: `q${qNum}_prompt`, labels: [`q${qNum} prompt`, `question ${qNum} prompt`, `q${qNum} question`] },
    {
      key: `q${qNum}_polishedResponse`,
      labels: [
        `q${qNum} my polished response`,
        `q${qNum} polished response`,
        `question ${qNum} polished response`,
        `q${qNum} response`,
        `q${qNum} answer`,
      ],
    },
    {
      key: `q${qNum}_myDraft`,
      labels: [`q${qNum} my draft`, `q${qNum} draft`, `question ${qNum} draft`],
    },
  ];
}

const LISTEN_REPEAT_SECTIONS = [
  { key: "prompt", labels: ["prompt", "sentences", "sentence list", "question"] },
  {
    key: "chunkingStrategy",
    labels: [
      "my chunking & memory strategy",
      "my chunking and memory strategy",
      "chunking & memory strategy",
      "chunking and memory strategy",
      "chunking strategy",
      "memory strategy",
      "chunking",
    ],
  },
  {
    key: "pronunciationFocus",
    labels: [
      "my pronunciation focus",
      "pronunciation focus",
      "pronunciation & delivery",
      "pronunciation and delivery",
      "pronunciation points",
      "pronunciation",
      "difficulty notes",
      "difficulties",
    ],
  },
  {
    key: "selfAssessment",
    labels: ["my self-assessment", "my self assessment", "self-assessment", "self assessment"],
  },
];

/** Normalize a line for label matching: strip markdown heading marks, bold, trailing punctuation. */
function normalizeLabelLine(line) {
  return line
    .trim()
    .replace(/^#{1,6}\s*/, "")
    .replace(/^\*\*|\*\*$/g, "")
    .replace(/[:\-—]\s*$/, "")
    .trim()
    .toLowerCase();
}

/**
 * Scan the raw text line by line. A line is a "section header" if, once
 * normalized, it exactly matches one of the known labels for some section
 * (optionally followed by inline content after ":" on the same line).
 * Returns a map of key -> content string (unset keys are omitted).
 */
function detectSections(raw, sectionDefs) {
  const text = raw.replace(/\r\n/g, "\n");
  const lines = text.split("\n");

  // Build a flat lookup: normalized label -> section key
  const labelToKey = new Map();
  for (const def of sectionDefs) {
    for (const label of def.labels) {
      labelToKey.set(label, def.key);
    }
  }

  // Find header line indices and any inline content following "label: ..."
  const headers = []; // { idx, key, inline }
  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();
    if (!line) return;

    // Case 1: "Label: inline content" or "Label - inline content" on one line
    const inlineMatch = line.match(/^#{0,6}\s*\*{0,2}([^:\-—]{2,60})\*{0,2}\s*[:\-—]\s*(.+)$/);
    if (inlineMatch) {
      const normLabel = normalizeLabelLine(inlineMatch[1]);
      if (labelToKey.has(normLabel)) {
        headers.push({ idx, key: labelToKey.get(normLabel), inline: inlineMatch[2].trim() });
        return;
      }
    }

    // Case 2: label alone on its own line (markdown heading or plain)
    const normWhole = normalizeLabelLine(line);
    if (labelToKey.has(normWhole)) {
      headers.push({ idx, key: labelToKey.get(normWhole), inline: null });
    }
  });

  const result = {};
  if (headers.length === 0) return result;

  for (let i = 0; i < headers.length; i++) {
    const { idx, key, inline } = headers[i];
    const nextIdx = i + 1 < headers.length ? headers[i + 1].idx : lines.length;
    const bodyLines = lines.slice(idx + 1, nextIdx);
    let body = bodyLines.join("\n").trim();
    if (inline) {
      body = body ? `${inline}\n\n${body}` : inline;
    }
    // Later duplicate headers of the same key append rather than overwrite.
    if (result[key]) {
      result[key] = `${result[key]}\n\n${body}`.trim();
    } else {
      result[key] = body;
    }
  }
  return result;
}

/**
 * Fallback when no recognizable labels exist at all: treat the first
 * paragraph as the Prompt and everything else as the Polished Response,
 * rather than guessing more aggressively.
 */
function fallbackProseSplit(raw) {
  const cleaned = raw.replace(/\r\n/g, "\n").trim();
  const paras = cleaned.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (paras.length >= 2) {
    return { prompt: paras[0], polishedResponse: paras.slice(1).join("\n\n") };
  }
  return { prompt: "", polishedResponse: cleaned };
}

// ---------------------------------------------------------------------------
// Slug + numbering
// ---------------------------------------------------------------------------

function slugify(text, fallback) {
  if (!text) return fallback;

  // Strip a leading list marker ("1.", "2)", "- ") so it can't be mistaken
  // for a short abbreviated sentence below.
  let source = text.trim().replace(/^\d+[.)]\s*/, "").replace(/^[-*]\s+/, "");

  // Split into sentence-like chunks, then walk forward accumulating chunks
  // until we have enough real words — this avoids picking "Dr." or a bare
  // list number as the whole "first sentence".
  const chunks = source.split(/(?<=[.!?])\s+/).filter(Boolean);
  let combined = "";
  let wordCount = 0;
  for (const chunk of chunks) {
    combined += (combined ? " " : "") + chunk;
    wordCount = combined.split(/\s+/).filter(Boolean).length;
    if (wordCount >= 4) break;
  }
  if (!combined) combined = source;

  const words = combined
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .filter((w) => !STOPWORDS.has(w) && w.length > 1);

  const chosen = words.slice(0, 6);
  const slug = chosen.join("-").replace(/-+/g, "-").slice(0, 60);
  return slug || fallback;
}

function nextIndex(taskType) {
  const dir = path.join(ARCHIVE_ROOT, taskType);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const existing = fs
    .readdirSync(dir)
    .map((f) => f.match(/^(\d{3})-/))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));
  const max = existing.length ? Math.max(...existing) : 0;
  return max + 1;
}

function titleCase(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ---------------------------------------------------------------------------
// Rendering — fixed section order per task type
// ---------------------------------------------------------------------------

function renderProse({ title, promptLabel, sections }) {
  const s = sections;
  return `# ${title}

## ${promptLabel}
${s.prompt || "..."}

## My Polished Response
${s.polishedResponse || "..."}

## My Draft
${s.myDraft || "..."}

## My Key Obstacles Holding You Back from a 5/5
${s.keyObstacles || "..."}

## My What Changed & Why
${s.whatChanged || "..."}
`;
}

function renderInterview({ title, qa, keyObstacles, whatChanged }) {
  // Grouped by field type (all Prompts, then all Polished Responses, then
  // all Drafts) rather than grouped by question - this is a deliberate
  // layout choice so a reader can scan all four prompts together, then all
  // four polished answers together, then all four drafts together.
  const prompts = qa
    .map((q, i) => `## Q${i + 1} Prompt\n${q.prompt || "..."}`)
    .join("\n\n");
  const polished = qa
    .map((q, i) => `## Q${i + 1} My Polished Response\n${q.polishedResponse || "..."}`)
    .join("\n\n");
  const drafts = qa
    .map((q, i) => `## Q${i + 1} My Draft\n${q.myDraft || "..."}`)
    .join("\n\n");

  return `# ${title}

${prompts}

${polished}

${drafts}

## My Key Obstacles Holding You Back from a 5/5
${keyObstacles || "..."}

## My What Changed & Why
${whatChanged || "..."}
`;
}

function renderListenRepeat({ title, sections }) {
  return `# ${title}

## Prompt
${sections.prompt || "1. ..."}

## My Chunking & Memory Strategy
${sections.chunkingStrategy || "- Chunk 1 (...): ...\n- Chunk 2 (...): ..."}

## My Pronunciation Focus
${sections.pronunciationFocus || "- Compressed function words: ...\n- Word endings (-s/-ed, unreleased final consonants): ...\n- Rhythm & intonation: ..."}

## My Self-Assessment
${sections.selfAssessment || "- Which sentences are fluent now, which still need work"}
`;
}

// ---------------------------------------------------------------------------
// Main per-file processing
// ---------------------------------------------------------------------------

function processFile(taskType, filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const baseName = path
    .basename(filePath)
    .replace(/\.(txt|md)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  let sections;
  let slugSource;

  if (taskType === "listen-and-repeat") {
    sections = detectSections(raw, LISTEN_REPEAT_SECTIONS);
    if (!sections.prompt) {
      // No labeled sections found — treat the whole file as the sentence list.
      sections.prompt = raw.trim();
    }
    slugSource = sections.prompt.split("\n")[0];
  } else if (taskType === "interview") {
    // Interview archives a whole 4-question session in one file, not one
    // question — the real exam presents all four prompts back-to-back with
    // zero prep time, so splitting them into separate files loses the
    // session context. Only explicit Q1..Q4 labels are recognized here.
    // All Q1..Q4 + shared labels must be detected in a single pass so that
    // e.g. "Q2 Prompt" correctly terminates "Q1 My Draft" — detectSections()
    // uses the next known header as the boundary for the current one, so a
    // per-question-only label set would let Q1's last field run all the way
    // to end of file.
    const allInterviewSections = [
      ...[1, 2, 3, 4].flatMap((q) => interviewQuestionSections(q)),
      ...INTERVIEW_SHARED_SECTIONS,
    ];
    const detected = detectSections(raw, allInterviewSections);
    const shared = { keyObstacles: detected.keyObstacles, whatChanged: detected.whatChanged };
    const qa = [1, 2, 3, 4].map((q) => ({
      prompt: detected[`q${q}_prompt`] || "",
      polishedResponse: detected[`q${q}_polishedResponse`] || "",
      myDraft: detected[`q${q}_myDraft`] || "",
    }));
    // No automatic guessing when Q1..Q4 labels are missing — v1.0 does not
    // attempt to split or classify raw pasted text. The user is expected to
    // paste the copy-ready block from SKILL.md (which already carries the
    // Q1..Q4 labels), so an unlabeled upload archives as an empty skeleton
    // (all fields "...") rather than a guessed, possibly-wrong split.
    sections = { qa, keyObstacles: shared.keyObstacles, whatChanged: shared.whatChanged };
    slugSource = qa.find((q) => q.prompt)?.prompt || baseName;
  } else {
    sections = detectSections(raw, PROSE_SECTIONS);
    if (!sections.prompt && !sections.polishedResponse) {
      const fb = fallbackProseSplit(raw);
      sections.prompt = sections.prompt || fb.prompt;
      sections.polishedResponse = sections.polishedResponse || fb.polishedResponse;
    }
    slugSource = sections.prompt || sections.polishedResponse || baseName;
  }

  const slug = slugify(slugSource, baseName || "untitled");
  const title = titleCase(slug);
  const content =
    taskType === "listen-and-repeat"
      ? renderListenRepeat({ title, sections })
      : taskType === "interview"
      ? renderInterview({
          title,
          qa: sections.qa,
          keyObstacles: sections.keyObstacles,
          whatChanged: sections.whatChanged,
        })
      : renderProse({ title, promptLabel: "Prompt", sections });

  const idx = nextIndex(taskType);
  const num = String(idx).padStart(3, "0");
  const outPath = path.join(ARCHIVE_ROOT, taskType, `${num}-${slug}.md`);
  fs.writeFileSync(outPath, content, "utf8");
  fs.unlinkSync(filePath);
  return outPath;
}

function main() {
  const written = [];
  for (const taskType of TASK_TYPES) {
    const files = readIncomingFiles(taskType);
    for (const filePath of files) {
      log(`Processing ${path.relative(REPO_ROOT, filePath)} as ${taskType} ...`);
      const out = processFile(taskType, filePath);
      log(`  -> archived ${path.relative(REPO_ROOT, out)}`);
      written.push(out);
    }
  }

  if (written.length === 0) {
    log("No new incoming files found. Nothing to do.");
  } else {
    log(`\nArchived ${written.length} file(s).`);
  }
}

main();
