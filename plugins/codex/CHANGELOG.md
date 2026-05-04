# Changelog

## 1.0.4-navyzal.4 (fork)

- Setup output text catches up to navyzal.3: drop the stale "spark task default" wording now that `/codex:task` always uses gpt-5.5 fast. The actionsTaken message after `--enable-review-gate-spark` and the nextSteps suggestion both now describe the spark gate as "adversarial-review at round end, BLOCK on severity critical/high".

## 1.0.4-navyzal.3 (fork)

- Reassign per-command model defaults: `/codex:review` now defaults to the spark profile (`gpt-5.3-codex-spark`) for deeper commit-time review reasoning, while `/codex:adversarial-review`, `/codex:task`, and `/codex:codex-rescue` all default to gpt-5.5 + service_tier=fast (review-fast profile). Stop-time gate mode no longer affects which model `task` uses — it only controls which command runs at round end.
- Replace `defaultModelForGateMode(mode)` with `defaultModelForCommand(command)` keyed by `review|adversarialReview|task|rescue` in `scripts/lib/model-config.mjs`. Each model assignment lives in `COMMAND_MODEL_DEFAULTS` so future swaps are still a one-file change.
- `handleReview` / `handleReviewCommand("Adversarial Review")` / `handleTask` updated to read the new per-command default. Setup docs note the new assignment.

## 1.0.4-navyzal.2 (fork)

- `/codex:status` no longer says "Ending the session will trigger a fresh Codex adversarial review" when the gate is in standard mode. The status renderer now reads `report.reviewGateMode` and tailors the hint per mode: standard mentions the stop-gate ALLOW/BLOCK review, spark mentions `/codex:adversarial-review` with critical/high BLOCK semantics, and the gate label gains a `(standard)` / `(spark)` suffix.

## 1.0.4-navyzal.1 (fork)

- `/codex:status` and `/codex:setup` now name the active gate mode explicitly (`enabled (standard ALLOW/BLOCK)` / `enabled (spark adversarial-review)` / `disabled`) via a shared `describeReviewGate` helper. `buildStatusSnapshot` exposes `reviewGateMode` so renderers can stop relying on the removed `stopReviewGate` boolean.
- Test suite catches up to the spark gate change: setup argument-hint regex now expects `--enable-review-gate-spark`, and the rescue agent + skill assertions now validate the `--model review-fast` pin instead of the old "leave model unset" wording.

## 1.0.4-navyzal.0 (fork)

- Added `--enable-review-gate-spark` setup flag. Standard `--enable-review-gate` keeps the legacy ALLOW/BLOCK behavior; spark mode runs `/codex:adversarial-review` at round end and BLOCKs on `severity ∈ {critical, high}`.
- Spark mode also flips the direct `/codex:task` default to the `spark` profile (gpt-5.3-codex-spark). `/codex:codex-rescue`, `/codex:review`, and `/codex:adversarial-review` stay pinned to gpt-5.5 + service_tier=fast (review-fast profile) regardless of mode.
- Disable is a single switch: `--disable-review-gate` turns off either mode. `/codex:cancel` continues to handle the round-end review job.
- Centralized all model identifiers in `scripts/lib/model-config.mjs` for one-file upgrades.
- State migration: `config.stopReviewGate` boolean → `config.stopReviewGateMode: "off" | "standard" | "spark"`.

## 1.0.0

- Initial version of the Codex plugin for Claude Code
