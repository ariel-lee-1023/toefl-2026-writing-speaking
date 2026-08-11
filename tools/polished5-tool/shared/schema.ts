import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import type * as z from "zod/mini";

// One row per successfully archived submission — a running log so the
// user can see what has been classified, formatted, and pushed to GitHub.
export const submissions = sqliteTable("submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  taskType: text("task_type").notNull(), // write-an-email | academic-discussion | interview | listen-and-repeat
  title: text("title").notNull(), // short topic slug used in the filename
  filePath: text("file_path").notNull(), // path committed in the repo
  commitUrl: text("commit_url").notNull(), // GitHub commit URL
  rawInput: text("raw_input").notNull(), // original pasted text, kept for audit
  formattedContent: text("formatted_content").notNull(), // final markdown that was committed
  createdAt: integer("created_at").notNull(), // unix ms
});

export const insertSubmissionSchema = createInsertSchema(submissions).omit({
  id: true,
});

export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
export type Submission = typeof submissions.$inferSelect;
