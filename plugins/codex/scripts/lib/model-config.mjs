// Single source of truth for model identifiers used by this plugin fork.
// Upgrade models here. Keep in sync with `~/.codex/config.toml [profiles.*]`.

export const MODEL_PROFILES = {
  fast: {
    model: "gpt-5.5",
    profile: "review-fast",
    reasoningEffort: "xhigh",
    serviceTier: "fast"
  },
  spark: {
    model: "gpt-5.3-codex-spark",
    profile: "spark",
    reasoningEffort: "xhigh"
  }
};

export const MODEL_ALIAS_ENTRIES = Object.entries(MODEL_PROFILES).flatMap(([key, profile]) => {
  const aliases = [[key, profile.model]];
  if (profile.profile && profile.profile !== key) {
    aliases.push([profile.profile, profile.model]);
  }
  return aliases;
});

export function resolveModelProfile(name) {
  const profile = MODEL_PROFILES[name];
  if (!profile) {
    throw new Error(`Unknown model profile: ${name}. Update scripts/lib/model-config.mjs.`);
  }
  return profile;
}

// Per-command default model selection. The stop-time review gate mode no
// longer affects which model is used — it only controls which command runs
// at round end (task with ALLOW/BLOCK vs adversarial-review with severity
// gate). Model selection is a pure function of the command type.
export const COMMAND_MODEL_DEFAULTS = {
  // /codex:review — codex's native reviewer. Uses spark for deeper reasoning
  // on commit-time review.
  review: MODEL_PROFILES.spark.model,
  // /codex:adversarial-review — adversarial review must stay fast so the
  // round-end stop-gate finishes quickly.
  adversarialReview: MODEL_PROFILES.fast.model,
  // /codex:task — direct task delegation. Always fast unless the user
  // explicitly passes --model.
  task: MODEL_PROFILES.fast.model,
  // /codex:codex-rescue — pinned to fast via rescue.md/agent injecting
  // --model review-fast. The constant is here for reference / future moves
  // of the pin into companion code.
  rescue: MODEL_PROFILES.fast.model
};

export function defaultModelForCommand(command) {
  const value = COMMAND_MODEL_DEFAULTS[command];
  if (!value) {
    throw new Error(`Unknown command default: ${command}. Update scripts/lib/model-config.mjs.`);
  }
  return value;
}
