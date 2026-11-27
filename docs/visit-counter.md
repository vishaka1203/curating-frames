# Visit counter

Matches Wushu Goa: a same-origin POST counts a browser at most once every 24
hours using a signed, HttpOnly cookie (`cf_visit`). GET only reads the total.
Common crawler user agents are excluded. Client navigation and React effect
replay share one request. This is a browser-based daily count, not an exact
count of unique people; clearing cookies or using another browser can count again.

Production requires `MONGODB_URI` pointing to a dedicated Curating Frames database
and `VISITS_COOKIE_SECRET` containing at least 32 random characters. Configure
both as server-only Vercel variables, then redeploy. Do not reuse the Wushu Goa
database: each site must have a separate `site_visits` collection and total.
The MongoDB total uses an atomic increment and survives deployments.

Local development without MongoDB uses `.local/visits/count.json` (gitignored).
Production refuses to use the local file or an unsigned cookie. Missing settings
or a storage outage show “Count unavailable,” never a made-up total.

The old Hits badge total includes repeat badge requests and is not migrated as
unique visits. The corrected database starts at zero unless a verified baseline
is explicitly imported. No IP addresses or individual browsing histories are stored.
