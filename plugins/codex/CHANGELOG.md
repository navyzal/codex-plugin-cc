# Changelog

## 1.0.4-navyzal.0 (fork)

- Added `--enable-review-gate-spark` setup flag. Standard `--enable-review-gate` keeps the legacy ALLOW/BLOCK behavior; spark mode runs `/codex:adversarial-review` at round end and BLOCKs on `severity ∈ {critical, high}`.
- Spark mode also flips the direct `/codex:task` default to the `spark` profile (gpt-5.3-codex-spark). `/codex:codex-rescue`, `/codex:review`, and `/codex:adversarial-review` stay pinned to gpt-5.5 + service_tier=fast (review-fast profile) regardless of mode.
- Disable is a single switch: `--disable-review-gate` turns off either mode. `/codex:cancel` continues to handle the round-end review job.
- Centralized all model identifiers in `scripts/lib/model-config.mjs` for one-file upgrades.
- State migration: `config.stopReviewGate` boolean → `config.stopReviewGateMode: "off" | "standard" | "spark"`.

## 1.0.0

- Initial version of the Codex plugin for Claude Code
