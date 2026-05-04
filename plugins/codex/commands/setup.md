---
description: Check whether the local Codex CLI is ready and optionally toggle the stop-time review gate
argument-hint: '[--enable-review-gate|--enable-review-gate-spark|--disable-review-gate]'
allowed-tools: Bash(node:*), Bash(npm:*), AskUserQuestion
---

Stop-time review gate modes (mutually exclusive — one enable flag at a time, `--disable-review-gate` is the single off switch for either mode):
- `--enable-review-gate` (standard): legacy ALLOW/BLOCK gate via companion `task`.
- `--enable-review-gate-spark`: round end runs `/codex:adversarial-review` and BLOCKs on `severity ∈ {critical, high}`.

Per-command model defaults (independent of the gate mode):
- `/codex:review` → `gpt-5.3-codex-spark` (spark profile) for deeper reasoning.
- `/codex:adversarial-review` → `gpt-5.5` + service_tier=fast (review-fast profile) so the round-end gate stays fast.
- `/codex:task` → `gpt-5.5` + service_tier=fast.
- `/codex:codex-rescue` → `gpt-5.5` + service_tier=fast (pinned via `--model review-fast`).
- Pass `--model <alias|name>` on any command to override.

Run:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/codex-companion.mjs" setup --json $ARGUMENTS
```

If the result says Codex is unavailable and npm is available:
- Use `AskUserQuestion` exactly once to ask whether Claude should install Codex now.
- Put the install option first and suffix it with `(Recommended)`.
- Use these two options:
  - `Install Codex (Recommended)`
  - `Skip for now`
- If the user chooses install, run:

```bash
npm install -g @openai/codex
```

- Then rerun:

```bash
node "${CLAUDE_PLUGIN_ROOT}/scripts/codex-companion.mjs" setup --json $ARGUMENTS
```

If Codex is already installed or npm is unavailable:
- Do not ask about installation.

Output rules:
- Present the final setup output to the user.
- If installation was skipped, present the original setup output.
- If Codex is installed but not authenticated, preserve the guidance to run `!codex login`.
