// GitHub Contents API client used to commit files directly to a
// toefl-2026-writing-speaking-shaped repository from the backend. The
// target owner/repo/branch are read from env vars (see below) so this
// works against any fork, not just the original repo.
//
// Auth: shells out to the `gh` CLI. Whatever `gh auth login` session (or
// GH_TOKEN / GH_ENTERPRISE_TOKEN env var) is active in the process
// environment is used automatically — no separate token handling needed
// in this file.

import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

// Target repo is configurable via env vars so anyone who forks this repo
// (and the toefl-2026-writing-speaking repo it archives into) can point
// the tool at their own copy without editing code. Defaults match this
// project's own repo.
const OWNER = process.env.GITHUB_REPO_OWNER || "ariel-lee-1023";
const REPO = process.env.GITHUB_REPO_NAME || "toefl-2026-writing-speaking";
const BRANCH = process.env.GITHUB_REPO_BRANCH || "main";

async function ghApi(args: string[]): Promise<{ stdout: string; code: number }> {
  try {
    const { stdout } = await execFileAsync("gh", args, { maxBuffer: 10 * 1024 * 1024 });
    return { stdout, code: 0 };
  } catch (err: any) {
    // gh CLI exits non-zero for 404s and other HTTP errors; surface stdout/stderr for inspection.
    const stdout = err?.stdout ?? "";
    const stderr = err?.stderr ?? String(err);
    return { stdout: stdout || stderr, code: err?.code ?? 1 };
  }
}

export interface CommitResult {
  commitUrl: string;
  htmlUrl: string;
  sha: string;
}

/**
 * Lists file names directly inside a directory of the repo (non-recursive).
 * Returns an empty array if the directory does not exist yet.
 */
export async function listDirectory(path: string): Promise<string[]> {
  const endpoint = `repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
  const { stdout, code } = await ghApi(["api", endpoint]);
  if (code !== 0) {
    if (stdout.includes('"status":"404"') || stdout.includes("Not Found")) return [];
    throw new Error(`Failed to list ${path}: ${stdout}`);
  }
  const data = JSON.parse(stdout) as Array<{ name: string; type: string }>;
  return data.filter((d) => d.type === "file").map((d) => d.name);
}

/**
 * Creates (or updates) a single file in the repo via the Contents API.
 * GitHub requires the current file `sha` when overwriting an existing file,
 * so we look it up first.
 */
export async function commitFile(
  path: string,
  content: string,
  message: string
): Promise<CommitResult> {
  const getEndpoint = `repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
  const getResult = await ghApi(["api", getEndpoint]);

  let sha: string | undefined;
  if (getResult.code === 0) {
    const existing = JSON.parse(getResult.stdout) as { sha: string };
    sha = existing.sha;
  } else if (!getResult.stdout.includes('"status":"404"') && !getResult.stdout.includes("Not Found")) {
    throw new Error(`Failed to check existing file ${path}: ${getResult.stdout}`);
  }

  const putEndpoint = `repos/${OWNER}/${REPO}/contents/${path}`;
  const body: Record<string, unknown> = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch: BRANCH,
  };
  if (sha) body.sha = sha;

  // gh api --input reads the JSON body from a file (stdin piping isn't
  // straightforward through execFile), so write the body to a temp file.
  const { writeFile, unlink } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const tmpPath = join(tmpdir(), `gh-commit-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(tmpPath, JSON.stringify(body), "utf-8");

  let putStdout: string;
  let putCode: number;
  try {
    const result = await ghApi(["api", putEndpoint, "--method", "PUT", "--input", tmpPath]);
    putStdout = result.stdout;
    putCode = result.code;
  } finally {
    await unlink(tmpPath).catch(() => {});
  }

  if (putCode !== 0) {
    throw new Error(`Failed to commit ${path}: ${putStdout}`);
  }

  const result = JSON.parse(putStdout) as {
    content: { sha: string; html_url: string };
    commit: { html_url: string };
  };

  return {
    commitUrl: result.commit.html_url,
    htmlUrl: result.content.html_url,
    sha: result.content.sha,
  };
}

/**
 * Deletes a file from the repo (used to clear a processed incoming/ scratch file).
 * No-ops silently if the file doesn't exist.
 */
export async function deleteFile(path: string, message: string): Promise<void> {
  const getEndpoint = `repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`;
  const getResult = await ghApi(["api", getEndpoint]);
  if (getResult.code !== 0) {
    if (getResult.stdout.includes('"status":"404"') || getResult.stdout.includes("Not Found")) return;
    throw new Error(`Failed to check ${path} before delete: ${getResult.stdout}`);
  }
  const existing = JSON.parse(getResult.stdout) as { sha: string };

  const delEndpoint = `repos/${OWNER}/${REPO}/contents/${path}`;
  const { writeFile, unlink } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const tmpPath = join(tmpdir(), `gh-delete-${Date.now()}-${Math.random().toString(36).slice(2)}.json`);
  await writeFile(tmpPath, JSON.stringify({ message, sha: existing.sha, branch: BRANCH }), "utf-8");

  let delStdout: string;
  let delCode: number;
  try {
    const result = await ghApi(["api", delEndpoint, "--method", "DELETE", "--input", tmpPath]);
    delStdout = result.stdout;
    delCode = result.code;
  } finally {
    await unlink(tmpPath).catch(() => {});
  }

  if (delCode !== 0) {
    throw new Error(`Failed to delete ${path}: ${delStdout}`);
  }
}
