"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme/theme-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { I18nProvider } from "@/components/i18n/i18n-provider"
import { envConfig } from "@/lib/env-config"

interface ClientProvidersProps {
  children: React.ReactNode
}

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <AuthProvider>
        <I18nProvider>
          <div className="min-h-screen bg-gradient-to-br from-[#1e084a] to-[#461c5a] text-white">{children}</div>
        </I18nProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

// Safe way to access app config in client components
export function useAppConfig() {
  return envConfig.app
}
