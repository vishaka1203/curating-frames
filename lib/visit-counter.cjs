const { createHmac, randomBytes, timingSafeEqual } = require("node:crypto");
const {
  mkdir,
  open,
  readFile,
  rename,
  unlink,
  writeFile,
} = require("node:fs/promises");
const { join } = require("node:path");
const { setTimeout: pause } = require("node:timers/promises");

const DAY = 86400;
const COOKIE = "cf_visit";
const BOT =
  /bot\b|crawler|spider|headless|lighthouse|facebookexternalhit|preview/i;

/** @param {string} value @param {string} secret */
function signature(value, secret) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

/** @param {string | null} cookies @param {string} secret */
function alreadyCounted(cookies, secret) {
  const value = cookies
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (!value || value.length > 160) return false;
  const [nonce, expiry, signed, extra] = value.split(".");
  if (extra || !nonce || !expiry || !signed || !/^\d+$/.test(expiry))
    return false;
  const expires = Number(expiry);
  const now = Date.now() / 1000;
  if (expires <= now || expires > now + DAY + 60) return false;
  const expected = Buffer.from(signature(`${nonce}.${expiry}`, secret));
  const actual = Buffer.from(signed);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

/** @param {{read:()=>Promise<number>,increment:()=>Promise<number>}} store @param {string} secret @param {boolean} secure */
function createVisitHandler(store, secret, secure) {
  /** @param {Request} request */
  return async function handle(request) {
    const headers = { "cache-control": "no-store" };
    if (!["GET", "POST"].includes(request.method))
      return Response.json(
        { error: "Method not allowed" },
        { status: 405, headers: { ...headers, allow: "GET, POST" } },
      );
    let sameOrigin = false;
    try {
      const origin = new URL(request.headers.get("origin") || "");
      const host = request.headers.get("host") || new URL(request.url).host;
      sameOrigin =
        ["http:", "https:"].includes(origin.protocol) && origin.host === host;
    } catch {
      // Missing or malformed origins must never record a visit.
    }
    if (request.method === "POST" && !sameOrigin) {
      return Response.json(
        { error: "Origin not allowed" },
        { status: 403, headers },
      );
    }
    try {
      const countNew =
        request.method === "POST" &&
        !BOT.test(request.headers.get("user-agent") || "") &&
        !alreadyCounted(request.headers.get("cookie"), secret);
      const count = countNew ? await store.increment() : await store.read();
      if (!Number.isSafeInteger(count) || count < 0)
        throw new Error("Invalid stored count");
      const response = Response.json({ count }, { headers });
      if (countNew) {
        const value = `${randomBytes(12).toString("hex")}.${Math.floor(Date.now() / 1000) + DAY}`;
        response.headers.set(
          "set-cookie",
          `${COOKIE}=${value}.${signature(value, secret)}; Path=/; Max-Age=${DAY}; HttpOnly; SameSite=Lax${secure ? "; Secure" : ""}`,
        );
      }
      return response;
    } catch {
      return Response.json(
        { error: "Visit count unavailable" },
        { status: 503, headers },
      );
    }
  };
}

/** Development only. Locking coordinates concurrent local server processes.
 * @param {string} directory
 */
function createFileStore(directory) {
  const file = join(directory, "count.json");
  const lock = join(directory, "count.lock");
  async function read() {
    try {
      const count = JSON.parse(await readFile(file, "utf8")).count;
      if (!Number.isSafeInteger(count) || count < 0)
        throw new Error("Invalid local counter");
      return count;
    } catch (error) {
      if (error.code === "ENOENT") return 0;
      throw error;
    }
  }
  async function increment() {
    await mkdir(directory, { recursive: true });
    let handle;
    for (let i = 0; i < 100; i++) {
      try {
        handle = await open(lock, "wx", 0o600);
        break;
      } catch (error) {
        if (error.code !== "EEXIST") throw error;
        await pause(20);
      }
    }
    if (!handle) throw new Error("Local counter is busy");
    try {
      const count = (await read()) + 1;
      const temporary = join(
        directory,
        `count-${randomBytes(8).toString("hex")}.tmp`,
      );
      await writeFile(temporary, JSON.stringify({ count }), { mode: 0o600 });
      await rename(temporary, file);
      return count;
    } finally {
      await handle.close();
      await unlink(lock);
    }
  }
  return { read, increment };
}

module.exports = { createVisitHandler, createFileStore };
