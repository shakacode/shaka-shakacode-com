import { execFileSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "..");

const upstreamRoot = path.join(workspaceRoot, "content", "upstream");
const docsTarget = path.join(upstreamRoot, "docs");
const changelogTarget = path.join(upstreamRoot, "CHANGELOG.md");

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

// Clones exactly the requested ref. A missing ref fails the sync rather than
// publishing docs from a different branch.
function cloneRepo(repoUrl, ref) {
  const tmpDir = mkdtempSync(path.join(os.tmpdir(), "shaka-docs-"));
  execFileSync("git", ["clone", "--depth", "1", "--branch", ref, repoUrl, tmpDir], {
    stdio: "inherit"
  });
  return tmpDir;
}

async function walkFiles(dir, callback, relativePrefix = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const rel = relativePrefix ? path.join(relativePrefix, entry.name) : entry.name;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(abs, callback, rel);
      continue;
    }
    if (entry.isFile()) {
      await callback(abs, rel);
    }
  }
}

async function countFiles(rootDir) {
  let count = 0;
  await walkFiles(rootDir, async () => {
    count += 1;
  });
  return count;
}

async function main() {
  const configuredRepo = process.env.SHAKA_REPO;
  const localRepo = configuredRepo
    ? path.resolve(configuredRepo)
    : path.resolve(workspaceRoot, "../shaka");
  const localDocs = path.join(localRepo, "docs");

  let sourceRepo = localRepo;
  let ephemeralClone = null;

  if (!(await exists(localDocs))) {
    const repoUrl = process.env.SHAKA_REPO_URL ?? "https://github.com/shakacode/shaka.git";
    const ref = process.env.SHAKA_REF ?? "main";
    console.log(`Local source repo missing. Cloning ${repoUrl} (${ref})...`);
    ephemeralClone = cloneRepo(repoUrl, ref);
    sourceRepo = ephemeralClone;
  }

  const sourceDocsRoot = path.join(sourceRepo, "docs");
  if (!(await exists(sourceDocsRoot))) {
    throw new Error(`Expected docs directory at ${sourceDocsRoot}.`);
  }

  await fs.rm(docsTarget, { recursive: true, force: true });
  await fs.mkdir(path.dirname(docsTarget), { recursive: true });
  await fs.cp(sourceDocsRoot, docsTarget, { recursive: true });

  const docsCount = await countFiles(docsTarget);
  console.log(`Synced docs to ${docsTarget}`);
  console.log(`File count: ${docsCount}`);

  const sourceChangelog = path.join(sourceRepo, "CHANGELOG.md");
  await fs.rm(changelogTarget, { force: true });
  if (await exists(sourceChangelog)) {
    await fs.copyFile(sourceChangelog, changelogTarget);
    console.log(`Synced changelog to ${changelogTarget}`);
  } else {
    console.warn(`No CHANGELOG.md found at ${sourceChangelog}; skipping.`);
  }

  if (ephemeralClone) {
    await fs.rm(ephemeralClone, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
