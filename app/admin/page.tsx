import { ThemeProvider } from "@/components/theme/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { I18nProvider } from "@/components/i18n/i18n-provider"
import { Header } from "@/components/layout/header"
import { ServiceStatus } from "@/components/admin/service-status"
import { Footer } from "@/components/layout/footer"

export default function AdminPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <I18nProvider>
          <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
                  <p className="text-white/70">Monitor your AI platform services and API status</p>
                </div>
                <ServiceStatus />
              </div>
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
