Short answer: **Yes, you can use Bun locally without changing anything in the codebase** — and you should *not* remove `yarn.lock` if you also deploy on Emergent (the platform itself runs on Yarn).

Here's the safe way to do it.

---

## ⚠️ Important constraint

The Emergent platform (and its supervisor) **requires Yarn** to manage dependencies on the hosted side. So:

- ✅ Use Bun **locally** for fast installs and dev runs.
- ❌ Don't delete `yarn.lock` or replace Yarn in the project — that would break Emergent's hosted workflow.
- ✅ Both lockfiles (`yarn.lock` and `bun.lockb`) can safely coexist in the repo.

This keeps your Emergent workflow undisturbed while giving you Bun's speed locally.

---

## Step 1 — Install Bun

**macOS / Linux / WSL:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows (native):**
```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Verify:
```bash
bun --version
```

---

## Step 2 — Replace `yarn install` with `bun install`

From your `frontend/` folder:
```bash
bun install
```

Bun reads your existing `package.json`, resolves the same dependency tree, and writes a `bun.lockb` file. Yarn's lockfile is untouched.

> Expect **5–10× faster install** than `yarn install`.

---

## Step 3 — Run the app with Bun

The CRA/craco scripts in `package.json` look like:
```json
"start": "craco start",
"build": "craco build"
```

You have two equivalent ways to run them:

```bash
bun run start        # runs the "start" script via Bun
# or
bun start            # shorthand (works for known scripts)
```

For build:
```bash
bun run build
```

> 💡 Even when invoking via Bun, the dev server itself is still **webpack + craco running on Node**. Bun is only acting as the package manager + script runner here. Why? Because CRA isn't yet fully compatible with Bun's bundler. This is fine — installs are blazing fast, and `start` / `build` behave identically to the Yarn equivalents.

---

## Step 4 — (Optional) Add a `.gitignore` entry if you don't want both lockfiles tracked

If you'd rather **not commit `bun.lockb`** (so your repo stays Yarn-canonical), add this to `frontend/.gitignore`:

```
bun.lockb
```

If you'd rather commit it, leave it as is — it just sits alongside `yarn.lock`.

---

## Command cheat-sheet

| Task | Yarn | Bun |
|---|---|---|
| Install all deps | `yarn install` | `bun install` |
| Add a package | `yarn add recharts` | `bun add recharts` |
| Add a dev package | `yarn add -D eslint` | `bun add -d eslint` |
| Remove a package | `yarn remove recharts` | `bun remove recharts` |
| Run a script | `yarn start` | `bun run start` |
| Update lockfile only | `yarn install --frozen-lockfile` | `bun install --frozen-lockfile` |

---

## ❗ When you also deploy on Emergent

If you add or remove a dependency using Bun locally, **also run `yarn install` once** before pushing back to Emergent, so `yarn.lock` stays in sync. Otherwise Emergent's hosted build may install a slightly different tree.

A handy two-step sync:
```bash
bun add some-package        # fast local install
yarn install                # update yarn.lock so Emergent matches
```

---

## What about replacing Yarn completely?

I'd **strongly recommend against it** because:

1. The Emergent platform has hard rules that use Yarn (the system prompt of this very agent says "Never use npm, use yarn"). Replacing it breaks hosted builds, supervisor restarts, and any future Emergent automation.
2. CRA + Bun's bundler isn't 100% compatible yet — dev server starts may be flaky.
3. You lose nothing by keeping Yarn as the deployment-side manager.

So: **Bun locally for speed, Yarn for the platform.** Best of both worlds, zero code changes.

---

Want me to add a small `README-local.md` to the project that captures these Bun instructions for future you (or teammates)?