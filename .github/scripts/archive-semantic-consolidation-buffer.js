#!/usr/bin/env node
/**
 * archive-semantic-consolidation-buffer.js  (v1.0)
 *
 * Watches semantic-consolidation-buffer/incoming/ for uploaded .txt/.md
 * files. Each file is expected to contain ONE re-encoded episode (one
 * lecture segment, one recording, one reading — see
 * semantic-consolidation-buffer/incoming/README.md). Unlike
 * archive-incoming.js's four task types, there is a single incoming folder
 * here: every episode uses the same Active Cognitive Buffer schema
 * regardless of toefl_domain or the source material's original language,
 * so no task-type classification or subfolder choice is needed. The script:
 *   1. Strips leftover chat-UI citation markers ("[cite: 1]",
 *      "[cite: 1, 4]", "[cite_start]", "[cite_end]") from the raw text --
 *      artifacts of copy-pasting from Gemini-style hosts, never content.
 *   2. Detects which of the known sections are present in the raw text
 *      (Title / TOEFL Domain / Tier / Core Thesis /
 *      Pillar A-C / Lexical Bindings), tolerating messy input: "##Label",
 *      "Label:", "Label -", or a label alone on its own line.
 *   3. Reformats the content into the fixed Active Cognitive Buffer
 *      template (frontmatter + 3 numbered sections), leaving any section
 *      not found blank.
 *   4. Writes the result into semantic-consolidation-buffer/content/ with
 *      the next sequential NNN- index, and deletes the original incoming
 *      file.
 *
 * No AI/external API calls and no domain/language classification: the host
 * AI already produced the structured note upstream. This script only
 * detects sections, reformats, and archives what's already there.
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..", "..");
const SEMANTIC_CONSOLIDATION_BUFFER_ROOT = path.join(REPO_ROOT, "semantic-consolidation-buffer");
const ARCHIVE_ROOT = path.join(SEMANTIC_CONSOLIDATION_BUFFER_ROOT, "content");
const INCOMING_DIR = path.join(SEMANTIC_CONSOLIDATION_BUFFER_ROOT, "incoming");
const SKIP_FILES = new Set([".gitkeep", "_template.md", "README.md"]);
const STOPWORDS = new Set([
  "the","a","an","and","or","but","of","to","in","on","for","with","is","are",
  "was","were","be","been","being","this","that","these","those","your","you",
  "i","my","me","we","our","us","it","its","as","at","by","from","into","about",
  "will","would","should","could","can","may","might","must","not","no","do",
  "does","did","have","has","had","if","so","than","then","there","their",
  "although","while","because","since","although","note","notes","episode",
  "cognitive","buffer","thesis","core",
]);

/**
 * Strip leftover citation markers that Gemini-style hosts sometimes inject
 * into copy-pasted output, e.g. "[cite: 1]", "[cite: 1, 4]", "[cite_start]",
 * "[cite_end]". These are artifacts of the source chat UI, not content --
 * they must never survive into an archived note. Matching is
 * case-insensitive and tolerates extra internal whitespace.
 */
function stripCitationMarkers(text) {
  return text
    .replace(/\[\s*cite_start\s*\]/gi, "")
    .replace(/\[\s*cite_end\s*\]/gi, "")
    .replace(/\[\s*cite\s*:\s*[\d,\s]+\]/gi, "")
    .replace(/[ \t]+([.,;:!?])/g, "$1") // collapse space left behind before punctuation
    .replace(/[ \t]{2,}/g, " ");
}

function log(...args) {
  console.log(...args);
}

function readIncomingFiles() {
  if (!fs.existsSync(INCOMING_DIR)) return [];
  return fs
    .readdirSync(INCOMING_DIR)
    .filter((f) => !SKIP_FILES.has(f))
    .filter((f) => /\.(txt|md)$/i.test(f))
    .map((f) => path.join(INCOMING_DIR, f));
}

// ---------------------------------------------------------------------------
// Section detection
// ---------------------------------------------------------------------------

const SEMANTIC_CONSOLIDATION_BUFFER_SECTIONS = [
  { key: "title", labels: ["title", "episode title"] },
  { key: "toeflDomain", labels: ["toefl domain", "toefl_domain", "domain"] },
  { key: "tier", labels: ["tier", "expansion tier", "density tier"] },
  {
    key: "coreThesis",
    labels: [
      "core thesis",
      "prefrontal abstraction",
      "1. prefrontal abstraction (the core thesis)",
      "the core thesis",
    ],
  },
  {
    key: "pillarA",
    labels: ["pillar a", "pillar a (context/problem)", "pillar a (context)", "context/problem"],
  },
  {
    key: "pillarB",
    labels: ["pillar b", "pillar b (mechanism/intervention)", "pillar b (mechanism)", "mechanism/intervention"],
  },
  {
    key: "pillarC",
    labels: ["pillar c", "pillar c (implication/result)", "pillar c (implication)", "implication/result"],
  },
  {
    key: "lexicalBindings",
    labels: [
      "lexical bindings",
      "lexical binding",
      "3. lexical binding (cross-linguistic & academic vocabulary)",
      "cross-linguistic & academic vocabulary",
      "3. lexical binding (academic vocabulary)",
      "vocabulary",
    ],
  },
];

/** Normalize a line for label matching: strip markdown heading marks, bold, list markers, trailing punctuation. */
function normalizeLabelLine(line) {
  return line
    .trim()
    .replace(/^#{1,6}\s*/, "")
    .replace(/^\*{1,2}|\*{1,2}$/g, "")
    .replace(/^\d+\.\s*/, "")
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

  const labelToKey = new Map();
  for (const def of sectionDefs) {
    for (const label of def.labels) {
      labelToKey.set(label, def.key);
    }
  }

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
    if (result[key]) {
      result[key] = `${result[key]}\n\n${body}`.trim();
    } else {
      result[key] = body;
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Slug + numbering
// ---------------------------------------------------------------------------

function slugify(text, fallback) {
  if (!text) return fallback;

  let source = text.trim().replace(/^\d+[.)]\s*/, "").replace(/^[-*]\s+/, "");

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

function nextIndex() {
  if (!fs.existsSync(ARCHIVE_ROOT)) fs.mkdirSync(ARCHIVE_ROOT, { recursive: true });
  const existing = fs
    .readdirSync(ARCHIVE_ROOT)
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

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// ---------------------------------------------------------------------------
// Rendering — fixed section order
// ---------------------------------------------------------------------------

function render({ title, sections }) {
  const s = sections;
  const toeflDomain = s.toeflDomain ? s.toeflDomain.trim() : "...";
  const tier = s.tier ? s.tier.trim() : "...";

  return `---
date: ${todayISO()}
toefl_domain: ${toeflDomain}
tier: ${tier}
---

# 🧠 Active Cognitive Buffer: ${title}

## 1. Prefrontal Abstraction (The Core Thesis)
* **Core Thesis:** ${s.coreThesis || "..."}

## 2. Associative Evidence Mapping (Logical Architecture)
* **Pillar A (Context/Problem):** ${s.pillarA || "..."}
* **Pillar B (Mechanism/Intervention):** ${s.pillarB || "..."}
* **Pillar C (Implication/Result):** ${s.pillarC || "..."}

## 3. Lexical Binding (Academic Vocabulary)
${s.lexicalBindings || "* Concept 1: `[Plain/Original English Term]` \u2192 `[TOEFL Academic Equivalent]`"}
`;
}

// ---------------------------------------------------------------------------
// Main per-file processing
// ---------------------------------------------------------------------------

function processFile(filePath) {
  const raw = stripCitationMarkers(fs.readFileSync(filePath, "utf8"));
  const baseName = path
    .basename(filePath)
    .replace(/\.(txt|md)$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const sections = detectSections(raw, SEMANTIC_CONSOLIDATION_BUFFER_SECTIONS);

  // No prose fallback split: unlike the polished-response archive's two-field
  // prompt/response shape, this schema has three structurally distinct fields
  // (thesis, three pillars, vocabulary) that cannot be guessed apart from
  // unlabeled prose. An unlabeled upload archives with the whole file as the
  // Core Thesis and every other field left blank.
  if (
    !sections.coreThesis &&
    !sections.pillarA &&
    !sections.lexicalBindings
  ) {
    sections.coreThesis = raw.trim();
  }

  const slugSource = sections.title || sections.coreThesis || baseName;
  const slug = slugify(slugSource, baseName || "untitled");
  const title = sections.title ? sections.title.trim() : titleCase(slug);
  const content = render({ title, sections });

  const idx = nextIndex();
  const num = String(idx).padStart(3, "0");
  const outPath = path.join(ARCHIVE_ROOT, `${num}-${slug}.md`);
  fs.writeFileSync(outPath, content, "utf8");
  fs.unlinkSync(filePath);
  return outPath;
}

function main() {
  const written = [];
  const files = readIncomingFiles();
  for (const filePath of files) {
    log(`Processing ${path.relative(REPO_ROOT, filePath)} ...`);
    const out = processFile(filePath);
    log(`  -> archived ${path.relative(REPO_ROOT, out)}`);
    written.push(out);
  }

  if (written.length === 0) {
    log("No new incoming files found. Nothing to do.");
  } else {
    log(`\nArchived ${written.length} file(s).`);
  }
}

main();
