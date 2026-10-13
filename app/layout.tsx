import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SITE } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: SITE.title, template: `%s · ${SITE.title}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url + "/"),
  alternates: { types: { "application/rss+xml": "rss.xml" } },
  icons: { icon: `${SITE.basePath}/favicon.svg` },
};

// Runs before paint: saved theme, else the system's.
const themeScript = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=d?"dark":"light"}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE.lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <header className="site-header">
          <div className="wrap">
            <Link className="site-title" href="/">
              {SITE.title}
            </Link>
            <nav className="site-nav">
              <Link href="/">Inicio</Link>
              <Link href="/tags/">Tags</Link>
              <a href={`${SITE.basePath}/rss.xml`}>RSS</a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="wrap">
            © {new Date().getFullYear()} {SITE.author} · Hecho con Storia
          </div>
        </footer>
      </body>
    </html>
  );
}
