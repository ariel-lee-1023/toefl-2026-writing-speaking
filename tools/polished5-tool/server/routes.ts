import type { Express } from "express";
import { createServer } from 'node:http';
import type { Server } from 'node:http';
import { storage } from "./storage";
import { classifyAndFormat, type TaskType } from "./classify";
import { listDirectory, commitFile } from "./github";

const FOLDER_LABELS: Record<TaskType, string> = {
  "write-an-email": "Write an Email",
  "academic-discussion": "Academic Discussion",
  "interview": "Interview",
  "listen-and-repeat": "Listen and Repeat",
};

const ROOT = "polished-5-5-responses";

async function nextIndex(taskType: TaskType): Promise<string> {
  const files = await listDirectory(`${ROOT}/${taskType}`);
  const numbers = files
    .map((f) => f.match(/^(\d{3})-/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => parseInt(m[1], 10));
  const next = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
  return String(next).padStart(3, "0");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Classify + format pasted text, commit it to the correct archive folder,
  // and log the submission. Single endpoint drives the whole "paste -> archived" flow.
  app.post("/api/submit", async (req, res) => {
    try {
      const rawInput = (req.body?.rawInput ?? "").toString().trim();
      if (!rawInput) {
        return res.status(400).json({ error: "Paste some text first." });
      }
      if (rawInput.length > 20000) {
        return res.status(400).json({ error: "That's too long — paste one task at a time." });
      }

      const classified = await classifyAndFormat(rawInput);
      const index = await nextIndex(classified.taskType);
      const fileName = `${index}-${classified.title}.md`;
      const filePath = `${ROOT}/${classified.taskType}/${fileName}`;

      const commit = await commitFile(
        filePath,
        classified.markdown,
        `Archive ${FOLDER_LABELS[classified.taskType]}: ${classified.titleReadable}`
      );

      await storage.createSubmission({
        taskType: classified.taskType,
        title: classified.titleReadable,
        filePath,
        commitUrl: commit.commitUrl,
        rawInput,
        formattedContent: classified.markdown,
        createdAt: Date.now(),
      });

      res.json({
        taskType: classified.taskType,
        taskTypeLabel: FOLDER_LABELS[classified.taskType],
        title: classified.titleReadable,
        filePath,
        commitUrl: commit.commitUrl,
        markdown: classified.markdown,
      });
    } catch (err) {
      console.error("submit failed", err);
      res.status(500).json({ error: (err as Error).message || "Something went wrong." });
    }
  });

  app.get("/api/submissions", async (_req, res) => {
    try {
      const submissions = await storage.listSubmissions();
      res.json(submissions);
    } catch (err) {
      console.error("list submissions failed", err);
      res.status(500).json({ error: (err as Error).message || "Something went wrong." });
    }
  });

  return httpServer;
}
