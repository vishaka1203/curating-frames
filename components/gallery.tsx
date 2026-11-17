"use client";
import { getMedia } from "@/lib/media";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
export function Gallery({
  images,
  title,
  layout = "editorial",
}: {
  images: string[];
  title: string;
  layout?: "editorial" | "grid";
}) {
  const [index, setIndex] = useState(0);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  return (
    <Dialog.Root>
      {layout === "grid" && (
        <div className="gallery-heading">
          <p className="eyebrow">
            THE COLLECTION · {images.length} PHOTOGRAPHS
          </p>
          <p>Select a photograph to view full size.</p>
        </div>
      )}
      <div
        className={
          layout === "grid"
            ? "gallery-grid gallery-contact-sheet"
            : "gallery-grid"
        }
      >
        {images.map((src, i) => (
          <Dialog.Trigger
            key={src}
            ref={(element) => {
              triggers.current[i] = element;
            }}
            onClick={() => setIndex(i)}
            className="gallery-image"
            aria-label={`Enlarge ${title} photograph ${i + 1}`}
          >
            <Image
              src={`/images/${src}.webp`}
              alt={getMedia(src).alt}
              width={getMedia(src).width}
              height={getMedia(src).height}
              sizes={
                layout === "grid"
                  ? "(max-width:599px) 50vw, 33vw"
                  : "(max-width:700px) 100vw, 50vw"
              }
            />
            <Expand size={20} />
          </Dialog.Trigger>
        ))}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content
          className="lightbox"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggers.current[index]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault();
              setIndex((current) => (current + 1) % images.length);
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setIndex(
                (current) => (current + images.length - 1) % images.length,
              );
            }
          }}
        >
          <Dialog.Title className="sr-only">{title} photo viewer</Dialog.Title>
          <Dialog.Description className="sr-only">
            Use left and right arrows to browse. Escape closes the viewer.
          </Dialog.Description>
          <Dialog.Close
            className="lightbox-close"
            aria-label="Close photo viewer"
          >
            <X />
          </Dialog.Close>
          <Image
            src={`/images/${images[index]}.webp`}
            alt={getMedia(images[index]).alt}
            fill
            sizes="95vw"
          />
          <div className="lightbox-controls">
            <button
              aria-label="Previous photograph"
              onClick={() =>
                setIndex((index + images.length - 1) % images.length)
              }
            >
              <ArrowLeft />
            </button>
            <span aria-live="polite">
              {index + 1} / {images.length}
            </span>
            <button
              aria-label="Next photograph"
              onClick={() => setIndex((index + 1) % images.length)}
            >
              <ArrowRight />
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
