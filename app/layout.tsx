import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { I18nProvider } from "@/components/i18n/i18n-provider"
import { Footer } from "@/components/layout/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "dev.3db - AI-Powered Development Platform",
  description:
    "Professional AI-powered web platform with multi-provider integration, real-time code editor, and live preview capabilities. Built by 3RBAI team.",
  keywords: [
    "AI development",
    "code editor",
    "Together AI",
    "Groq",
    "Codestral",
    "Mistral AI",
    "xAI Grok",
    "real-time collaboration",
    "3RBAI",
  ],
  authors: [{ name: "3RBAI Team", url: "https://github.com/3RBAI" }],
  creator: "3RBAI",
  openGraph: {
    title: "dev.3db - AI-Powered Development Platform",
    description: "Build with AI Magic - Multi-provider AI platform for modern development",
    url: "https://dev3db.vercel.app",
    siteName: "dev.3db",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "dev.3db - AI-Powered Development Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "dev.3db - AI-Powered Development Platform",
    description: "Build with AI Magic - Multi-provider AI platform for modern development",
    images: ["/og-image.png"],
    creator: "@3RBAI",
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <I18nProvider>
              <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white">
                {children}
                <Footer />
              </div>
            </I18nProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
