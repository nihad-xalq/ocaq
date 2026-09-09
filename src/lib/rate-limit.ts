type RateLimitConfig = {
  windowMs: number;
  max: number;
};

type RateLimitResult = { ok: true } | { ok: false; retryAfterMs: number };

type RateLimitStore = {
  hits: Map<string, number[]>;
};

const globalStore = globalThis as typeof globalThis & {
  __ocaqRateLimit?: RateLimitStore;
};

const store: RateLimitStore = globalStore.__ocaqRateLimit ?? {
  hits: new Map(),
};

globalStore.__ocaqRateLimit = store;

export function consumeRateLimit(
  key: string,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now();
  const cutoff = now - config.windowMs;
  const previous = (store.hits.get(key) ?? []).filter((time) => time > cutoff);

  if (previous.length >= config.max) {
    const oldest = previous[0] ?? now;
    store.hits.set(key, previous);
    return {
      ok: false,
      retryAfterMs: Math.max(oldest + config.windowMs - now, 1000),
    };
  }

  previous.push(now);
  store.hits.set(key, previous);
  return { ok: true };
}
