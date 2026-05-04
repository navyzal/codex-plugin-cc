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

export function defaultModelForGateMode(mode) {
  return mode === "spark" ? MODEL_PROFILES.spark.model : MODEL_PROFILES.fast.model;
}
