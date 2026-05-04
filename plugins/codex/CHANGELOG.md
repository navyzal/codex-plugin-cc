# Changelog

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
