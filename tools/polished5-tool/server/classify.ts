import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export type TaskType =
  | "write-an-email"
  | "academic-discussion"
  | "interview"
  | "listen-and-repeat";

export interface ClassifiedResult {
  taskType: TaskType;
  title: string; // short kebab-case slug, e.g. "library-hours-request"
  titleReadable: string; // short human-readable title for the H1, e.g. "Library Hours Request"
  markdown: string; // the fully formatted archive file content
}

const SYSTEM_PROMPT = `You are a formatting assistant for a TOEFL iBT Writing & Speaking practice archive.

The user pastes raw, messy material copied from a chat with an AI tutor. It always
contains, in some order and mixed with extra commentary: an original TOEFL prompt,
the user's own raw draft/attempt, and an AI-polished final version. It may also
contain diagnostic notes about what was wrong and why.

Your job:
1. Classify the content into exactly one of these four TOEFL task types:
   - "write-an-email" — Writing section, an email-writing prompt (a request, complaint,
     inquiry, or similar addressed to a person/organization, with a greeting/sign-off).
   - "academic-discussion" — Writing section, a discussion-board prompt with a professor's
     question plus (usually) two classmates' posts to respond to.
   - "interview" — Speaking section, a "Take an Interview" style personal-opinion question
     (e.g. about habits, preferences, experiences) answered in a short spoken response.
   - "listen-and-repeat" — Speaking section, sentence-level shadowing/repeat practice
     (a list of sentences to listen to and repeat, not a question-answer task).
2. Extract and reformat the content into clean archive markdown, in ENGLISH only,
   following exactly one of the two templates below depending on the task type.
   Do not invent content that isn't present or reasonably inferable from the input;
   if a section has no corresponding content, write "Not provided in the source material."
   instead of fabricating one.
3. Produce a short kebab-case topic slug (3-5 words, e.g. "library-hours-extension")
   and a short human-readable title (Title Case, same topic) for use in the archive filename/H1.

TEMPLATE A — for write-an-email, academic-discussion, interview:

# <Short topic title>

## Prompt
<the original task prompt, verbatim or lightly cleaned up from source>

## My Draft
<the user's original raw draft, verbatim or lightly cleaned up from source>

## Polished Response (final — for review & teaching)
<the AI-polished final version, verbatim or lightly cleaned up from source>

## What Changed & Why
- <bullet list of concrete diagnostic points: word choice/collocation issues, grammar/structure issues,
  each explained briefly. Pull these from the source material's diagnostic commentary if present;
  otherwise infer 2-4 genuine differences between the draft and the polished version.>

## Reusable Patterns
- <bullet list of 2-5 phrases or sentence structures from the polished response that are
  genuinely reusable across other prompts of the same task type — for teaching material>

(For academic-discussion, the Prompt section should include the professor's question AND
both classmates' posts if present in the source.)

TEMPLATE B — for listen-and-repeat only:

# <Short batch title>

## Sentences
1. <sentence>
2. <sentence>
...

## Difficulty Notes
- <bullet list of linking/stress/intonation difficulty points, pulled from source if present,
  otherwise write "Not provided in the source material.">

## Self-Assessment
- <bullet list from source if present, otherwise write "Not provided in the source material.">

Use the record_archive_entry tool to submit your result. Do not respond with plain text.`;

const TOOL_NAME = "record_archive_entry";

const TOOLS: Anthropic.Tool[] = [
  {
    name: TOOL_NAME,
    description:
      "Submit the classified task type and formatted archive markdown for this TOEFL practice submission.",
    input_schema: {
      type: "object",
      properties: {
        taskType: {
          type: "string",
          enum: [
            "write-an-email",
            "academic-discussion",
            "interview",
            "listen-and-repeat",
          ],
          description: "The classified TOEFL task type.",
        },
        title: {
          type: "string",
          description:
            'Short kebab-case topic slug, 3-5 words, e.g. "library-hours-extension".',
        },
        titleReadable: {
          type: "string",
          description:
            "Short human-readable Title Case title for the same topic, used as the H1 heading.",
        },
        markdown: {
          type: "string",
          description:
            "The fully formatted archive file content following Template A or Template B exactly, in English only.",
        },
      },
      required: ["taskType", "title", "titleReadable", "markdown"],
    },
  },
];

export async function classifyAndFormat(rawInput: string): Promise<ClassifiedResult> {
  const message = await client.messages.create({
    model: "claude_sonnet_4_6",
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    tools: TOOLS,
    tool_choice: { type: "tool", name: TOOL_NAME },
    messages: [{ role: "user", content: rawInput }],
  });

  const toolBlock = message.content.find(
    (b): b is Anthropic.ToolUseBlock => b.type === "tool_use" && b.name === TOOL_NAME,
  );
  if (!toolBlock) {
    throw new Error("Model did not return a tool_use block with the archive entry.");
  }

  const result = toolBlock.input as Partial<ClassifiedResult>;

  const validTypes: TaskType[] = [
    "write-an-email",
    "academic-discussion",
    "interview",
    "listen-and-repeat",
  ];
  if (!result.taskType || !validTypes.includes(result.taskType as TaskType)) {
    throw new Error(`Model returned invalid taskType: ${result.taskType}`);
  }
  if (!result.title || !result.titleReadable || !result.markdown) {
    throw new Error("Model response is missing required fields.");
  }

  const slug = result.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return {
    taskType: result.taskType as TaskType,
    title: slug,
    titleReadable: result.titleReadable,
    markdown: result.markdown,
  };
}
