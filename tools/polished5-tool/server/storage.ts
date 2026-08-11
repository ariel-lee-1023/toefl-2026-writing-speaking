import { submissions } from '@shared/schema';
import type { Submission, InsertSubmission } from '@shared/schema';
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { desc } from "drizzle-orm";

const sqlite = new Database("data.db");
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

export interface IStorage {
  listSubmissions(): Promise<Submission[]>;
  createSubmission(submission: InsertSubmission): Promise<Submission>;
}

export class DatabaseStorage implements IStorage {
  async listSubmissions(): Promise<Submission[]> {
    return db.select().from(submissions).orderBy(desc(submissions.createdAt)).all();
  }

  async createSubmission(insertSubmission: InsertSubmission): Promise<Submission> {
    return db.insert(submissions).values(insertSubmission).returning().get();
  }
}

export const storage = new DatabaseStorage();
