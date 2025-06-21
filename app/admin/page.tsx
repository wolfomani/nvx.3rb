import { ThemeProvider } from "@/components/theme/theme-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { I18nProvider } from "@/components/i18n/i18n-provider";
import { Header } from "@/components/layout/header";
import { ServiceStatus } from "@/components/admin/service-status";
import { Footer } from "@/components/layout/footer";

export default function AdminPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <I18nProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
              <section className="w-full max-w-3xl space-y-8">
                <header>
                  <h1 className="text-3xl font-extrabold text-white mb-2">لوحة تحكم الإدارة</h1>
                  <p className="text-white/70">
                    راقب خدمات منصة الذكاء الاصطناعي وحالة واجهات البرمجة (API)
                  </p>
                </header>
                <ServiceStatus />
                {/* يمكنك إضافة المزيد من عناصر لوحة التحكم هنا */}
              </section>
            </main>
            <Footer />
          </div>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
