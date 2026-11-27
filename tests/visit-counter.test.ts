import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import counterModule from "../lib/visit-counter.cjs";
const { createVisitHandler, createFileStore } = counterModule;

async function counter(t: import("node:test").TestContext) {
  const directory = await mkdtemp(join(tmpdir(), "curating-visits-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const store = createFileStore(directory);
  return {
    store,
    handle: createVisitHandler(store, "test-only-secret", false),
  };
}
const request = (cookie?: string | null, extra: Record<string, string> = {}) =>
  new Request("http://localhost:3001/api/visits", {
    method: "POST",
    headers: {
      origin: "http://localhost:3001",
      ...(cookie ? { cookie } : {}),
      ...extra,
    },
  });

test("a new browser increments the shared total; a reload with its signed cookie does not", async (t) => {
  const { handle } = await counter(t);
  const first = await handle(request());
  assert.equal(first.status, 200);
  assert.deepEqual(await first.json(), { count: 1 });
  const cookie = first.headers.get("set-cookie")!.split(";")[0];
  const reload = await handle(request(cookie));
  assert.deepEqual(await reload.json(), { count: 1 });
  assert.equal(reload.headers.get("cache-control"), "no-store");
  const another = await handle(request());
  assert.deepEqual(await another.json(), { count: 2 });
});

test("cross-origin requests cannot increment the counter and crawlers are not counted", async (t) => {
  const { handle, store } = await counter(t);
  const foreign = await handle(
    request(null, { origin: "https://unrelated.example" }),
  );
  assert.equal(foreign.status, 403);
  const bot = await handle(request(null, { "user-agent": "Googlebot" }));
  assert.deepEqual(await bot.json(), { count: 0 });
  assert.equal(await store.read(), 0);
});

test("two store instances preserve totals across concurrent writes and restarts", async (t) => {
  const directory = await mkdtemp(join(tmpdir(), "curating-shared-visits-"));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const a = createFileStore(directory);
  const b = createFileStore(directory);
  await Promise.all(
    Array.from({ length: 12 }, (_, i) => (i % 2 ? a : b).increment()),
  );
  assert.equal(await createFileStore(directory).read(), 12);
});

test("storage failure returns an unavailable response, never a fabricated count", async () => {
  const store = {
    read: async () => {
      throw new Error("private database details");
    },
    increment: async () => {
      throw new Error("private database details");
    },
  };
  const response = await createVisitHandler(
    store,
    "test-only-secret",
    false,
  )(request());
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { error: "Visit count unavailable" });
});

test("reading the count does not record a visit; a tampered cookie cannot suppress a visit", async (t) => {
  const { handle } = await counter(t);
  const read = await handle(new Request("http://localhost:3001/api/visits"));
  assert.deepEqual(await read.json(), { count: 0 });
  const first = await handle(request());
  const cookie = first.headers.get("set-cookie")!.split(";")[0];
  const tampered = cookie.slice(0, -1) + (cookie.endsWith("a") ? "b" : "a");
  const second = await handle(request(tampered));
  assert.deepEqual(await second.json(), { count: 2 });
});

test("accepts the public Host when Next.js uses an internal request URL", async (t) => {
  const { handle } = await counter(t);
  const response = await handle(
    new Request("http://localhost:3001/api/visits", {
      method: "POST",
      headers: { origin: "http://127.0.0.1:3001", host: "127.0.0.1:3001" },
    }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { count: 1 });
});
