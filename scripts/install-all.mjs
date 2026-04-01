import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function hasPackageJson(dir) {
  try {
    return fs.existsSync(path.join(dir, 'package.json'));
  } catch {
    return false;
  }
}

function runInstall(dir, { ignoreScripts = false } = {}) {
  const rel = path.relative(root, dir) || '.';
  console.log(`[install] ${rel}`);
  const cmd = ignoreScripts ? 'npm install --ignore-scripts' : 'npm install';
  execSync(cmd, { cwd: dir, stdio: 'inherit' });
}

const lifecycle = process.env.npm_lifecycle_event;
const isManualAllInstall = lifecycle === 'install:all' || lifecycle === 'fi';

// If user runs "npm run install:all" (or "fi"), also ensure root deps are installed.
// Use --ignore-scripts to prevent recursion via this repo's "postinstall".
if (isManualAllInstall && hasPackageJson(root)) {
  runInstall(root, { ignoreScripts: true });
}

const targets = [path.join(root, 'frontend'), path.join(root, 'backend')];

for (const dir of targets) {
  if (fs.existsSync(dir) && hasPackageJson(dir)) {
    runInstall(dir);
  } else {
    const rel = path.relative(root, dir);
    console.log(`[skip] ${rel} (missing folder or package.json)`);
  }
}

