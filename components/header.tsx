"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
const links = [
  ["/", "Home"],
  ["/portfolio", "Our work"],
  ["/about", "Our story"],
  ["/contact", "Get in touch"],
];
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <Link href="/" aria-label="Curating Frames home" className="wordmark">
        curating
        <span>
          FRAMES<span className="brand-dot">®</span>
        </span>
      </Link>
      <nav aria-label="Main navigation" className="desktop-nav">
        {links.slice(0, 3).map(([url, label]) => (
          <Link
            key={url}
            href={url}
            aria-current={path === url ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <Link href="/contact" className="header-contact">
          Let’s make memories <ArrowUpRight size={15} />
        </Link>
        <ThemeToggle />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger className="menu-trigger" aria-label="Open navigation">
            <Menu />
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="menu-panel">
              <Dialog.Title className="eyebrow">CURATING FRAMES</Dialog.Title>
              <Dialog.Description className="sr-only">
                Explore our photography and enquire about your event.
              </Dialog.Description>
              <Dialog.Close
                className="menu-close"
                aria-label="Close navigation"
              >
                <X />
              </Dialog.Close>
              <nav aria-label="Mobile navigation">
                {links.map(([url, label]) => (
                  <Link key={url} href={url} onClick={() => setOpen(false)}>
                    {label}
                    <ArrowUpRight />
                  </Link>
                ))}
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
