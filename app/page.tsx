import { ThemeProvider } from "@/components/theme/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { I18nProvider } from "@/components/i18n/i18n-provider"
import { Header } from "@/components/layout/header"
import { Hero } from "@/components/sections/hero"
import { Features } from "@/components/sections/features"
import { CodeEditor } from "@/components/editor/code-editor"
import { LivePreview } from "@/components/preview/live-preview"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <I18nProvider>
          <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white">
            <Header />
            <main>
              <Hero />
              <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Code Editor</h2>
                    <CodeEditor />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                    <LivePreview />
                  </div>
                </div>
              </div>
              <Features />
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
