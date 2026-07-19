import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WMRN Radio History Archive",
    template: "%s | WMRN Radio History Archive"
  },
  description: "Preserving WMRN's Broadcast Legacy.",
  manifest: "/manifest.webmanifest",
  applicationName: "WMRN Radio History Archive",
  appleWebApp: {
    capable: true,
    title: "WMRN Archive",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#1c2d4a",
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <header className="site-header" role="banner">
          <Link className="brand" href="/" aria-label="WMRN Radio History Archive home">
            <span className="brand-mark" aria-hidden="true">W</span>
            <span>
              <strong>WMRN Radio History Archive</strong>
              <small>Preserving WMRN's Broadcast Legacy.</small>
            </span>
          </Link>
          <nav className="site-nav" aria-label="Primary">
            <Link href="/archive">Archive</Link>
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/accessions">Accessions</Link>
            <Link href="/offline">Offline</Link>
          </nav>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <p>
            Independent historical preservation project. Not affiliated with or endorsed by current or former station owners.
          </p>
          <p>Rights, donor restrictions, and takedown requests are release-blocking metadata.</p>
        </footer>
        <script src="/register-sw.js" defer />
      </body>
    </html>
  );
}
