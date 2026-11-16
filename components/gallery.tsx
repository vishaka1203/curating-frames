"use client";
import { getMedia } from "@/lib/media";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { X, ArrowLeft, ArrowRight, Expand } from "lucide-react";
export function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  return (
    <Dialog.Root>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <Dialog.Trigger
            key={src}
            onClick={() => setIndex(i)}
            className="gallery-image"
            aria-label={`Enlarge ${title} photograph ${i + 1}`}
          >
            <Image
              src={`/images/${src}.webp`}
              alt={getMedia(src).alt}
              width={getMedia(src).width}
              height={getMedia(src).height}
              sizes="(max-width:700px) 100vw, 50vw"
            />
            <Expand size={20} />
          </Dialog.Trigger>
        ))}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="lightbox-overlay" />
        <Dialog.Content
          className="lightbox"
          data-lenis-prevent
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") setIndex((index + 1) % images.length);
            if (e.key === "ArrowLeft")
              setIndex((index + images.length - 1) % images.length);
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
