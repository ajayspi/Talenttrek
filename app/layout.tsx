import type { Metadata, Viewport } from "next";
import { inter, spaceGrotesk, jetBrainsMono } from "@/lib/fonts";
import { SITE } from "@/lib/site";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/layout/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Talent Trek — AI Voice, Chat & Agent Solutions | Melbourne",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "AI voice assistant",
    "voice commerce",
    "chatbot AI",
    "drive-thru AI",
    "AI agents",
    "Talent Trek",
    "Melbourne",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_AU",
    url: SITE.url,
    title: "Talent Trek — AI Voice, Chat & Agent Solutions",
    description: SITE.description,
  },
  icons: { icon: "/icon.png" },
};

export const viewport: Viewport = {
  themeColor: [
    // Light-first default; dark only after the user opts in via the toggle.
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#F8FAFC" },
  ],
};

/**
 * Applies a stored DARK choice before first paint (no flash). No stored
 * choice → stays on the light theme (light-first, never OS-followed).
 */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("tt-theme");if(t==="dark"){document.documentElement.dataset.theme="dark";}else{document.documentElement.dataset.theme="light";}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <link rel="alternate" hrefLang="en-AU" href={SITE.url} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetBrainsMono.variable}`}
      >
        <ThemeProvider>
          <a className="skip-link" href="#main">
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
