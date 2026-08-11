# incoming/ — upload here, get archived automatically

Drop a `.txt` or `.md` file into the matching task-type subfolder below and push it to `main`. A GitHub Action picks it up automatically, reformats it into the standard archive template, saves it into `polished-5-5-responses/<task-type>/` with the next sequential number, and deletes the file from here — no manual steps, no AI calls, nothing to run locally.

```
incoming/
├── write-an-email/
├── academic-discussion/
├── interview/
└── listen-and-repeat/
```

**Pick the folder yourself** — the automation does not guess the task type. Upload into the one that matches what you're archiving.

## What to put in the file

Just paste your content in with clear labels. The automation looks for these labels (as a markdown heading, a line ending in `:`, or `Label: content` all on one line) and slots each one into the matching section of the final archive file, in this fixed order:

1. `Prompt`
2. `Polished Response` (becomes **My Polished Response**)
3. `My Draft`
4. `Key Obstacles Holding You Back from a 5/5` (becomes **My Key Obstacles Holding You Back from a 5/5**)
5. `What Changed & Why` (becomes **My What Changed & Why**)

Any label you don't include is simply left blank (`...`) in the archived file for you to fill in later. If you don't label anything at all, the automation treats the first paragraph as the Prompt and everything after it as the Polished Response.

`listen-and-repeat/` uses its own four labels instead, in this fixed order:

1. `Prompt` (the sentence list)
2. `Chunking & Memory Strategy` (becomes **My Chunking & Memory Strategy**)
3. `Pronunciation Focus` (becomes **My Pronunciation Focus**; `Difficulty Notes` is also recognized for backward compatibility)
4. `Self-Assessment` (becomes **My Self-Assessment**)

## v1.0 limitation — one question per file

**This automation does not split multiple questions out of a single upload.** If you did a full mock test with, say, three emails or four interview answers, upload each one as its own separate file (you can still batch-upload several files in the same commit — each is processed independently). A future version may add automatic splitting; for now, keep it one question per file so nothing gets misfiled.

## Manual alternative

You don't have to use this automation at all — Option B in [`../README.md`](../README.md) still works: stage in here by hand, ask the AI to polish against `references/`, then format and move the file into the right folder yourself.
