# ============================================================================
#  ACTION BRANCH CONFIG
# ============================================================================
#  Map each Convox action to the feature branch you want to test.
#  This file is referenced in the workflow via env vars.
#
#  HOW TO USE:
#  1. For each action you're testing, replace the branch name with your
#     actual feature branch (e.g., "fix/ubuntu-upgrade", "feature/tty-fix")
#  2. If you're NOT testing a specific action, leave it as the current
#     stable tag (e.g., "v2") — it will use the production version
#  3. Push and trigger the workflow
#
#  FINDING BRANCH NAMES:
#  Go to each PR and look at the branch name, e.g.:
#    https://github.com/convox/action-run/pull/2 → branch: "feature/pseudo-tty"
#    https://github.com/convox/action-login/pull/X → branch: "fix/something"
# ============================================================================

# This is a reference file only. The actual branch refs are set as env vars
# in the workflow file: .github/workflows/test-all-actions.yml
#
# action-login:   BRANCH_LOGIN
# action-build:   BRANCH_BUILD
# action-run:     BRANCH_RUN
# action-deploy:  BRANCH_DEPLOY
# action-create:  BRANCH_CREATE
# action-destroy: BRANCH_DESTROY
# action-exec:    BRANCH_EXEC
# action-export:  BRANCH_EXPORT
