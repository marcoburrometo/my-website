import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { socials } from "@/data/profile";
import { siteUrl } from "@/data/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

const portrait = {
  url: "/media/marco_full.jpg",
  width: 836,
  height: 835,
  alt: "Marco Burrometo",
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Marco Burrometo",
  url: siteUrl,
  image: `${siteUrl}${portrait.url}`,
  jobTitle: "Senior Frontend Developer",
  homeLocation: {
    "@type": "Place",
    name: "Northern Italy",
  },
  knowsAbout: [
    "Frontend engineering",
    "React",
    "TypeScript",
    "React Native",
    "Next.js",
    "Google Cloud Platform",
    "Firebase",
  ],
  sameAs: socials.filter(({ href }) => href.startsWith("https://")).map(({ href }) => href),
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Marco Burrometo | Senior Frontend Developer",
    template: "%s | Marco Burrometo",
  },
  description: "Senior frontend developer in northern Italy building web and mobile products with React, TypeScript, and React Native, with a focus on user experience.",
  applicationName: "Marco Burrometo CV",
  alternates: { canonical: "/" },
  creator: "Marco Burrometo",
  publisher: "Marco Burrometo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Marco Burrometo",
    title: "Marco Burrometo | Senior Frontend Developer",
    description: "Building web and mobile products with React, TypeScript, and React Native, focused on user experience.",
    images: [portrait],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marco Burrometo | Senior Frontend Developer",
    description: "Building web and mobile products with React, TypeScript, and React Native, focused on user experience.",
    images: [portrait],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${manrope.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
