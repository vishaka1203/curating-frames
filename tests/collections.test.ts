import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { getCollections, getProjects } from "../lib/content";
const media = JSON.parse(
  readFileSync(new URL("../data/media.json", import.meta.url), "utf8"),
);
test("each collection cover belongs to its published photo story", () => {
  const collections = getCollections();
  assert.ok(collections.length > 0);
  for (const project of collections) {
    assert.equal(project.status, "published");
    assert.ok(project.cover);
    const cover = project.cover!.replace("/images/", "").replace(".webp", "");
    assert.ok(
      project.images.includes(cover),
      `${project.title} cover must belong to its own gallery`,
    );
  }
  assert.equal(
    new Set(collections.map((p) => p.slug)).size,
    collections.length,
  );
});
test("all published gallery images have metadata and a local optimized asset", () => {
  for (const project of getProjects())
    for (const id of project.images) {
      assert.ok(media[id]?.alt, `${id} needs alt text`);
      assert.ok(media[id].width > 0 && media[id].height > 0);
      assert.ok(
        existsSync(new URL(`../public/images/${id}.webp`, import.meta.url)),
        `${id} asset missing`,
      );
    }
});
