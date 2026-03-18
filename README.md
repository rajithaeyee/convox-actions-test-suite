# Convox GitHub Actions — Full Test Suite

End-to-end test project for all 8 Convox GitHub Actions, designed to test each action against its feature branch before merging PRs.

## Actions Covered

| Action | What It Does | Key Tests |
|--------|-------------|-----------|
| `action-login` | Authenticate CLI | Verify `convox racks` works after login |
| `action-create` | Create app | App appears in rack |
| `action-build` | Build + create release | Release ID output, release exists |
| `action-run` | One-off commands | **TTY output, hang fix, exit codes, input validation, release flag** |
| `action-exec` | Exec into container | Command runs in existing pod |
| `action-deploy` | Build + promote | Full deploy succeeds, services healthy |
| `action-export` | Export app config | Config exported without errors |
| `action-destroy` | Delete app | App removed from rack |

## Quick Start

### 1. Deploy the primary test app

```bash
convox apps create actions-test-primary --rack <your-rack>
convox deploy --app actions-test-primary --rack <your-rack>
```

### 2. Push to GitHub

```bash
git init && git add . && git commit -m "init"
git remote add origin git@github.com:<you>/convox-actions-test-suite.git
git push -u origin main
```

### 3. Add Secrets

Settings → Secrets → Actions:

| Secret | Value |
|--------|-------|
| `CONVOX_HOST` | `console.convox.com` (or your console host) |
| `CONVOX_PASSWORD` | Your deploy key |
| `CONVOX_RACK` | Your rack name |

### 4. Run Tests

## Two Workflows Available

### A) Full Suite — Test all actions together

**Actions → "Test All Convox Actions" → Run workflow**

Enter the branch name for each action you're testing. Leave as `v2` for any action you're not changing:

```
branch_login:   v2
branch_build:   v2
branch_run:     feature/pseudo-tty-fix    ← your PR branch
branch_deploy:  v2
branch_create:  v2
branch_destroy: v2
branch_exec:    v2
branch_export:  v2
```

This runs a realistic pipeline: `login → create → build → run → exec → deploy → export → destroy`

### B) Quick Test — Single action in isolation

**Actions → "Quick Test: Single Action" → Run workflow**

Pick the action from the dropdown and enter the branch:

```
action: action-run
branch: feature/pseudo-tty-fix
```

This is faster for iterating on one action.

## Pipeline Flow (Full Suite)

```
test-login
    ├── test-create ──────────────────────────┐
    └── test-build                            │
            ├── test-run-tty                  │
            ├── test-run-no-hang              │
            ├── test-run-exit-success         │
            ├── test-run-exit-failure         │
            ├── test-run-exit-custom          │
            ├── test-run-validation-*  (×3)   │
            ├── test-run-with-release         │
            ├── test-run-migration            │
            │       └── test-deploy           │
            │               ├── test-export   │
            │               └── test-destroy ←┘
            └── test-exec
                        └── cleanup (always)
                        └── summary (always)
```

## action-run Tests (Detailed)

Since action-run has the most changes (PR #2), it gets the most coverage:

| Test | What It Checks | Pass Criteria |
|------|---------------|---------------|
| TTY Output | `script -qec` pseudo-TTY | Colored text renders, `stdout.isTTY` detected |
| No Hang | Long sustained output | 200 lines complete within 5min timeout |
| Exit Code 0 | Success propagation | Step succeeds |
| Exit Code 1 | Failure propagation | Step fails (verified via `continue-on-error`) |
| Exit Code 42 | Custom code propagation | Step fails (via `script -e` flag) |
| Missing App | Input validation | Fast fail with `::error::` annotation |
| Missing Service | Input validation | Fast fail with `::error::` annotation |
| Missing Command | Input validation | Fast fail with `::error::` annotation |
| With Release | `--release` flag | Runs against specific release ID |
| Migration | Real-world simulation | Colored multi-step output completes |

## Local Testing

Run the test scripts locally to verify they work before pushing:

```bash
npm install

node src/test-tty.js           # TTY detection
node src/test-exit-codes.js 0  # Exit code success
node src/test-exit-codes.js 1  # Exit code failure
node src/test-long-output.js   # Long output
node src/migrate.js            # Migration simulation
node src/test-env.js           # Environment info
```

## Tips

- The **"No Hang"** test is the most important for the action-run PR — if the old action times out but the feature branch completes, the fix works.
- The **cleanup** job runs even if tests fail, so you won't accumulate stale apps.
- Use the **Quick Test** workflow when iterating fast on a single action.
- The **summary** job generates a nice table in GitHub Actions UI under the Summary tab.
- To compare old vs new, run the full suite twice: once with `v2` for everything, once with your branches.
