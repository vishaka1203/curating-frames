import media from "@/data/media.json";
export function getMedia(src: string) {
  const key = src.replace("/images/", "").replace(".webp", "");
  return media[key as keyof typeof media];
}
