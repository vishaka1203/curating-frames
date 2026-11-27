import { join } from "node:path";
import mongoose, { type Connection } from "mongoose";
import counter from "@/lib/visit-counter.cjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let connection: Promise<Connection> | undefined;

async function collection() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Visit storage is not configured");
  connection ??= mongoose
    .createConnection(uri, { serverSelectionTimeoutMS: 5000 })
    .asPromise()
    .catch((error) => {
      connection = undefined;
      throw error;
    });
  const database = (await connection).db;
  if (!database) throw new Error("Visit storage is unavailable");
  return database.collection<{ _id: string; total: number }>("site_visits");
}

const mongoStore = {
  async read() {
    return (await (await collection()).findOne({ _id: "total" }))?.total ?? 0;
  },
  async increment() {
    const records = await collection();
    try {
      const updated = await records.findOneAndUpdate(
        { _id: "total" },
        { $inc: { total: 1 } },
        { upsert: true, returnDocument: "after" },
      );
      if (!updated) throw new Error("Visit storage did not return a total");
      return updated.total;
    } catch (error) {
      // Two first visits can race to create the uniquely indexed total document.
      if ((error as { code?: number }).code !== 11000) throw error;
      const updated = await records.findOneAndUpdate(
        { _id: "total" },
        { $inc: { total: 1 } },
        { returnDocument: "after" },
      );
      if (!updated) throw new Error("Visit storage did not return a total");
      return updated.total;
    }
  },
};

async function handle(request: Request) {
  const production = process.env.NODE_ENV === "production";
  const secret = process.env.VISITS_COOKIE_SECRET;
  if (
    production &&
    (!process.env.MONGODB_URI || !secret || secret.length < 32)
  ) {
    return Response.json(
      { error: "Visit count unavailable" },
      { status: 503, headers: { "cache-control": "no-store" } },
    );
  }
  const store = process.env.MONGODB_URI
    ? mongoStore
    : counter.createFileStore(join(process.cwd(), ".local", "visits"));
  return counter.createVisitHandler(
    store,
    secret || "local-preview-only-not-for-production",
    production,
  )(request);
}

export const GET = handle;
export const POST = handle;
