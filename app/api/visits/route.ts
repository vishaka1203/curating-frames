export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const response = await fetch(
      "https://hits.sh/curating-frames.vercel.app.svg?label=Visits",
      { cache: "no-store", signal: AbortSignal.timeout(8000) },
    );
    if (!response.ok) throw new Error("Counter unavailable");
    const svg = await response.text();
    const count = svg.match(/<title>Visits: ([^<]+)<\/title>/)?.[1];
    if (!count) throw new Error("Invalid counter response");
    return Response.json(
      { count },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "Visit count unavailable" }, { status: 502 });
  }
}
