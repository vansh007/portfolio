import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import ChatInterfaceWrapper from "@/components/chat-interface-wrapper";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StarsCanvas } from "@/components/star-background";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: {
    default: "Vansh Mundhra | Full Stack Developer & AI Engineer",
    template: "%s | Vansh Mundhra",
  },
  description:
    "Portfolio of Vansh Mundhra — Full Stack Developer & AI Engineer specializing in React, Next.js, Python, AI/ML, and scalable cloud systems.",
  applicationName: "Vansh Mundhra Portfolio",
  category: "Portfolio",
  metadataBase: new URL("https://vanshmundhra.dev"),

  keywords: [
    "Vansh Mundhra",
    "Full Stack Developer",
    "AI Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "Python Developer",
    "Software Engineer",
    "Web Developer",
    "Portfolio",
    "Frontend Developer",
    "Backend Developer",
    "MERN Developer",
    "FastAPI Developer",
    "AI Engineer Portfolio",
    "Machine Learning",
    "AI/ML Projects",
    "RAG Developer",
  ],

  authors: [{ name: "Vansh Mundhra", url: "https://vanshmundhra.dev" }],
  creator: "Vansh Mundhra",
  publisher: "Vansh Mundhra",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Vansh Mundhra | Full Stack Developer & AI Engineer",
    description:
      "Portfolio of Vansh Mundhra showcasing AI, ML, software engineering, and modern web development projects.",
    url: "https://vanshmundhra.dev",
    siteName: "Vansh Mundhra Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vansh Mundhra Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vansh Mundhra | Full Stack Developer & AI Engineer",
    description:
      "Portfolio of Vansh Mundhra showcasing modern web, AI, and software engineering projects.",
    images: ["/og-image.png"],
    creator: "@vanshmundhra",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },

  other: {
    "google-site-verification": "google4cb1d15e140c9dad.html",
  },
};


// Improved viewport configuration
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* DNS prefetch for faster loading */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* RSS Feed for blog content syndication */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Vansh Mundhra Blog RSS Feed"
          href="/feed.xml"
        />

        {/* JSON-LD Structured Data for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://vanshmundhra.dev/#website",
                  "url": "https://vanshmundhra.dev",
                  "name": "Vansh Mundhra Portfolio",
                  "description": "Portfolio of Vansh Mundhra — Full Stack Developer & AI Engineer",
                  "publisher": { "@id": "https://vanshmundhra.dev/#person" },
                  "inLanguage": "en-US"
                },
                {
                  "@type": "Person",
                  "@id": "https://vanshmundhra.dev/#person",
                  "name": "Vansh Mundhra",
                  "url": "https://vanshmundhra.dev",
                  "image": "https://vanshmundhra.dev/profile.png",
                  "jobTitle": "Full Stack Developer & AI Engineer",
                  "description": "Full Stack Developer & AI Engineer specializing in React, Next.js, Python, AI/ML, and scalable cloud systems.",
                  "sameAs": [
                    "https://github.com/vanshmundhra9120",
                    "https://linkedin.com/in/vanshmundhra9120",
                    "https://twitter.com/vanshmundhra"
                  ],
                  "knowsAbout": [
                    "Full Stack Development",
                    "React",
                    "Next.js",
                    "TypeScript",
                    "Python",
                    "AI/ML",
                    "Node.js",
                    "FastAPI",
                    "Cloud Architecture"
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
        suppressHydrationWarning
      >
        <GoogleAnalytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Skip to main content
          </a>

          <StarsCanvas />
          <Navbar />

          {/* Main content with semantic HTML and proper spacing */}
          <main id="main-content" className="relative z-10 min-h-screen">
            {children}
          </main>

          <ChatInterfaceWrapper />
          <ScrollToTop />
          <Footer />
        </ThemeProvider>


      </body>
    </html>
  );
}
